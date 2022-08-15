/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import { storage } from "@/firebase/firebase";
import { Filter } from "@/services/categories";
import { UpdateProductDto } from "@/services/products/dto/update-product-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, InputLabel, MenuItem } from "@mui/material";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { nanoid } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useCategories from "hooks/categories/use-categories";
import useGetProductById from "hooks/products/use-get-products-by-id";
import useGetSizesColorsById from "hooks/products/use-get-sizes-colors-by-id";
import useUpdateProductById from "hooks/products/use-update-products-by-id";
import { useRouter } from "next/router";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as yup from "yup";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { useAppDispatch } from "@/components/hooks/reduxHook";
import CreateNewSizeColorForProductForm from "@/components/manage-product/create-new-size-color-for-product-form";
import CreateProductSizeForm from "@/components/manage-product/create-new-size-data-form";
import UpdateProductSizeForm from "@/components/manage-product/update-size-data-for-product";
import { numberWithCommas } from "@/helpers/number-util";
import {
  loadBlueprint,
  setMaxWidth,
  setMaxHeight,
  setProductName,
  setRealHeight,
  setRealWidth,
} from "@/redux/slices/blueprints";
import { ProductBlueprintDto } from "@/services/products/dto/get-product-blueprint-dto";
import { ProductSizeDto } from "@/services/products/dto/product-size-dto";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useGetProductBlueprint from "hooks/products/use-get-product-blueprint";
import useGetSizeProductByProductId from "hooks/products/use-get-product-size-by-productId";
import { Blueprint } from "../models";
import useColorSize from "hooks/sizes/use-get-color-size";
import { SizesAndColorsMapDto } from "@/services/products/dto/get-all-color-size-map";

const quickSort = (
  arr: { size: string; dignity: number }[]
): { size: string }[] => {
  if (arr.length < 2) return arr;

  // *** lấy phần tử cuối của 'arr' làm 'pivot'
  const pivotIndex = arr.length - 1;
  const pivot = arr[pivotIndex];

  const left = [];
  const right = [];

  let currentItem;
  // *** 'i < pivotIndex' => chúng ta sẽ không loop qua 'pivot' nữa
  for (let i = 0; i < pivotIndex; i++) {
    currentItem = arr[i];

    if (currentItem.dignity < pivot.dignity) {
      left.push(currentItem);
    } else {
      right.push(currentItem);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

const extractToStringArr = (sizeList: { size: string }[]): string[] => {
  return sizeList.map((data) => data.size);
};

const sizeSort = (sizeList: string[]): { size: string; dignity: number }[] => {
  const newList: { size: string; dignity: number }[] = [];
  sizeList.forEach((size) => {
    let dignity = 1;
    for (let index = size.length - 1; index >= 0; index--) {
      let isNum = false;
      let num = 1;
      try {
        num = Number(size[index]);
        isNum = true;
      } catch (e) {
        isNum = false;
      }
      if (size[index] === "x" || size[index] === "X") {
        dignity = dignity * 2;
      } else if (size[index] === "M" || size[index] === "m") {
        dignity = dignity * 1;
      } else if (size[index] === "L" || size[index] === "l") {
        dignity = dignity * 2;
      } else if (size[index] === "s" || size[index] === "S") {
        dignity = dignity * -2;
      } else if (isNum) {
        dignity = dignity * num;
      }
    }
    newList.push({ size: size, dignity: dignity });
  });

  return newList;
};

export interface IProductDetailsProps {}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(1, " Tên sản phẩm cần ít nhất 1 kí tự")
    .max(50, " Tên sản phẩm tối đa 50 kí tự")
    .required(" Tên sản phẩm không được để trống"),
  description: yup
    .string()
    .trim()
    .min(1, " Mô tả sản phẩm cần ít nhất 1 kí tự")
    .max(400, " Mô tả sản phẩm tối đa 400 kí tự")
    .required(" Mô tả sản phẩm không được để trống"),
});

export default function ProductDetails(props: IProductDetailsProps) {
  const router = useRouter();
  const id = router.asPath.split("id=")[1];

  const { data: responseProduct, isLoading: isLoadingProduct } =
    useGetProductById(id);
  const { data: responseProductBlueprint, isLoading: isloadingPrBlueprint } =
    useGetProductBlueprint(id);
  const { data: responseColorSize, isLoading: isloadingColorSize } =
    useColorSize(id);

  const [renderColorSizeMap, setRenderColorSizeMap] =
    React.useState<SizesAndColorsMapDto[]>();

  React.useEffect(() => {
    if (responseColorSize) {
      responseColorSize.forEach((colorSize) => {
        colorSize.sizes = extractToStringArr(
          quickSort(sizeSort(colorSize.sizes))
        );
      });
      setRenderColorSizeMap(responseColorSize);
    }
  }, [responseColorSize]);

  const { data: responseSizesColorById } = useGetSizesColorsById(id);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openCreateProductSize, setOpenCreateProductSize] =
    React.useState(false);
  const [isCreateProductSize, setIsCreateProductSize] = React.useState(true);
  const [sizeCreateData, setSizeCreateData] = React.useState("");
  const [productSizeUpdateData, setProductSizeUpdateData] =
    React.useState<ProductSizeDto>({
      size: "",
      width: 0,
      height: 0,
      id: "",
    });
  const [checked, setChecked] = React.useState(true);
  const [checkValue, setCheckValue] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [renderImages, setRenderImages] = React.useState<ImageListType>();
  const [uploadImages, setUploadImages] = React.useState<ImageListType>();
  const [submitImages, setSubmitImages] = React.useState<string[]>([]);
  const [isEditProduct, setIsEditProduct] = React.useState(false);
  const [isImageError, setIsImageError] = React.useState(false);
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const { data: response, isLoading: isLoadingCategory } =
    useCategories(filter);
  const { data: sizeProductResponse, isLoading: isLoadingSizeProductResponse } =
    useGetSizeProductByProductId(id);

  const [renderedSizeList, setRenderSizeList] =
    React.useState<ProductSizeDto[]>();

  React.useEffect(() => {
    const newRenderedSizeList: {
      size: string;
      width: number;
      height: number;
      id: string;
    }[] = [];
    if (sizeProductResponse) {
      responseSizesColorById?.data.sizes.forEach((size) => {
        let hasSize = false;
        sizeProductResponse.forEach((sizeWithMeasurement) => {
          if (sizeWithMeasurement.size === size) {
            newRenderedSizeList.push({
              id: sizeWithMeasurement.id,
              size: sizeWithMeasurement.size,
              width: sizeWithMeasurement.width,
              height: sizeWithMeasurement.height,
            });
            hasSize = true;
          }
        });
        if (!hasSize)
          newRenderedSizeList.push({
            size: size,
            width: 0,
            height: 0,
            id: "none",
          });
      });
      setRenderSizeList([...newRenderedSizeList]);
    }
  }, [sizeProductResponse, responseSizesColorById]);

  const handleEditProduct = () => {
    setIsEditProduct(true);
    setIsDisabled(false);
  };

  const handleCreateProductSize = (size: string) => {
    setSizeCreateData(size);
    setIsCreateProductSize(true);
    setOpenCreateProductSize(true);
  };
  const handleUpdateProductSize = (productSizeData: ProductSizeDto) => {
    setProductSizeUpdateData(productSizeData);
    setIsCreateProductSize(false);
    setOpenCreateProductSize(true);
  };

  const dispatch = useAppDispatch();

  const maxNumber = 69;
  const [isImageChange, setIsImageChange] = React.useState(false);

  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    console.log(imageList, "imageList");
    setUploadImages(imageList);
    setRenderImages((state) => [...(state as any), ...imageList]);
    setIsImageChange(true);
    // data for submit
  };

  const handleCreateProductBlueprint = () => {
    if (sizeProductResponse) {
      let realSizeData: ProductSizeDto = {
        id: "none",
        size: "L",
        width: 19,
        height: 24,
      };
      sizeProductResponse.forEach((element) => {
        if (element.size === "L") realSizeData = element;
      });
      dispatch(setProductName(responseProduct?.data.name || ""));
      dispatch(setRealWidth(realSizeData.width / 2));
      dispatch(setRealHeight(realSizeData.width / 2));
      dispatch(setMaxWidth(realSizeData.width));
      dispatch(setMaxHeight(realSizeData.height));
    }

    router.push(`/create-blueprint?productId=${id}`);
  };

  const handleUpdateProductBlueprint = (
    productBlueprint: ProductBlueprintDto
  ) => {
    let realSizeData: ProductSizeDto = {
      id: "none",
      size: "L",
      width: 19,
      height: 24,
    };
    if (sizeProductResponse) {
      sizeProductResponse.forEach((element) => {
        if (element.size === "L") realSizeData = element;
      });
    }

    const tmpData: Blueprint = {
      blueprintId: productBlueprint.id,
      productName: responseProduct?.data.name || "",
      isEdit: true,
      key: "",
      width: productBlueprint.placeholder.width,
      height: productBlueprint.placeholder.height,
      maxWidth: realSizeData.width || 19,
      maxHeight: realSizeData.height || 24,
      position: productBlueprint.position,
      widthRate: productBlueprint.placeholder.widthRate,
      heightRate: productBlueprint.placeholder.heightRate,
      topRate: productBlueprint.placeholder.top,
      src: productBlueprint.frameImage,
      tmpSrc: productBlueprint.frameImage,
    };
    dispatch(loadBlueprint(tmpData));
    dispatch(setMaxWidth(realSizeData.width));
    dispatch(setMaxHeight(realSizeData.height));

    router.push(`/update-blueprint?productId=${id}`);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleOpenCreateSizeColorDialog = () => {
    setOpenCreateDialog(true);
  };

  const defaultValues: UpdateProductDto = {
    id: "",
    name: "",
    categoryName: "",
    description: "",
    images: [],
  };

  const form = useForm<UpdateProductDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  React.useEffect(() => {
    reset(responseProduct?.data);
  }, [responseProduct]);

  const onUploadImage = (data: {
    name: string;
    images: string[];
    description: string;
    categoryName: string;
  }) => {
    if (uploadImages && uploadImages.length > 0) {
      const imageList = [] as string[];
      uploadImages.map((image) => {
        const file = image.file;
        const imageRef = ref(storage, `images/${file?.name}`);
        uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            imageList.push(url);
            if (imageList.length === uploadImages.length) {
              const finalImages = [...imageList, ...submitImages];
              const submitData = {
                ...data,
                id: responseProduct?.data.id,
                images: finalImages,
              } as UpdateProductDto;
              updateProduct(submitData);
              setIsImageChange(false);
            }
          });
        });
      });
    } else {
      setIsImageError(true);
      setIsEditProduct(true);
      setIsDisabled(false);
    }
  };

  const { mutate: updateProduct, error } = useUpdateProductById();

  const handleIsDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategoryName(event.target.value);
  };

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked === true) {
      setCheckValue(event.target.value);
      console.log(checkValue, "check");
    }
    console.log(checked, "check");
  };

  const [categoryName, setCategoryName] = React.useState(
    responseProduct?.data.categoryName
  );

  React.useEffect(() => {
    setCategoryName(responseProduct?.data.categoryName);
    if (responseProduct) {
      setSubmitImages(
        responseProduct?.data.productImages.map((image) => image.image)
      );
      setRenderImages(
        responseProduct?.data.productImages.map((image) => ({
          data_url: image.image,
        }))
      );
    }
  }, [responseProduct]);

  const onSubmit: SubmitHandler<UpdateProductDto> = (data) => {
    const tmpData = {
      id: data.id,
      name: data.name,
      description: data.description,
      categoryName: categoryName as string,
      images: data.images,
    };

    if (isImageChange) {
      onUploadImage(tmpData);
    } else {
      if (responseProduct?.data.productImages) {
        const tmpImages = responseProduct.data.productImages.map(
          (image) => image.image
        );
        const submitData = {
          ...data,
          id: responseProduct?.data.id,
          images: tmpImages,
          categoryName: categoryName as string,
        } as UpdateProductDto;
        updateProduct(submitData);
      }
    }
    if (isImageError === false) {
      setIsEditProduct(false);
      setIsDisabled(true);
    }
  };

  return (
    <>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4"></h4>
          <div className="row">
            <div className="col-md-12">
              {!isLoadingProduct && responseProduct && (
                <div className="card mb-4">
                  <h4 className="card-header">Thông tin chi tiết</h4>
                  {/* Account */}

                  <div className="card-body">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      id="formAccountSettings"
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-start align-items-sm-center gap-4">
                          {
                            <ImageUploading
                              value={[]}
                              onChange={onChange}
                              maxNumber={maxNumber}
                              dataURLKey="data_url"
                              multiple
                            >
                              {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                              }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                  {renderImages?.map((image, index) => (
                                    <img
                                      alt="user-avatar"
                                      key={index}
                                      src={image["data_url"]}
                                      height={100}
                                      width={100}
                                      className="me-2 border border-secondary rounded-3 "
                                    />
                                  ))}
                                  {isEditProduct && (
                                    <div className="mt-2">
                                      <button
                                        className="btn btn-primary "
                                        style={
                                          isDragging
                                            ? { color: "red" }
                                            : undefined
                                        }
                                        onClick={() => {
                                          onImageUpload();
                                          setIsImageError(false);
                                        }}
                                        {...dragProps}
                                        type="button"
                                      >
                                        Tải lên
                                      </button>
                                      &nbsp;
                                      <button
                                        className="btn btn-outline-secondary account-image-reset "
                                        type="button"
                                        onClick={() => {
                                          onImageRemoveAll();
                                          setRenderImages([]);
                                          setUploadImages([]);
                                          setSubmitImages([]);
                                          setIsImageError(true);
                                        }}
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </ImageUploading>
                          }
                          {isImageError && (
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
                              {"Hình không được để trống"}
                            </span>
                          )}
                        </div>
                      </div>
                      <hr className="my-0" />
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">ID</label>
                          <input
                            disabled
                            className="form-control"
                            type="text"
                            id="ID"
                            name="ID"
                            defaultValue={responseProduct.data.id}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Tên sản phẩm</label>

                          <input
                            disabled={isDisabled}
                            className="form-control"
                            type="text"
                            id="Name"
                            defaultValue={responseProduct.data.name}
                            {...register("name")}
                          />
                          {errors.name && (
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
                              {errors.name.message}
                            </span>
                          )}
                        </div>

                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Mô tả
                          </label>
                          <textarea
                            disabled={isDisabled}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={responseProduct.data.description}
                            {...register("description")}
                          />
                          {errors.description && (
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
                              {errors.description.message}
                            </span>
                          )}
                        </div>

                        <div className="mb-3 col-md-6">
                          <label className="form-label">Thể loại</label>
                          <div className="mb-3 col-md-6">
                            {categoryName && (
                              <FormControl
                                sx={{ m: 1, minWidth: 200 }}
                                size="small"
                                className="mb-3 col-md-6"
                                disabled={isDisabled}
                              >
                                <InputLabel id="demo-select-medium">
                                  Category
                                </InputLabel>
                                <Select
                                  labelId="demo-select-medium"
                                  id="demo-select-medium"
                                  value={categoryName}
                                  label="categoryName"
                                  onChange={handleChangeCategory}
                                >
                                  {!isLoadingCategory &&
                                    response &&
                                    response.content.map((categoryN) => (
                                      <MenuItem
                                        className="d-flex flex-column"
                                        key={categoryN.name}
                                        value={categoryN.name}
                                      >
                                        {categoryN.name}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            )}
                          </div>
                        </div>

                        {/* <div className="mb-3 col-md-6 ">
                          <label className="form-label me-3">tag</label>
                          {responseProduct.data.productTags.map((tag) => (
                            <Chip
                              className=" me-2"
                              key={tag.tag.name}
                              label={tag.tag.name}
                            />
                          ))}
                        </div> */}
                        {/* Small table */}
                        <div className="container-xxl flex-grow-1 container-p-y ">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="card mb-4">
                                {/* Account */}
                                <div className="card">
                                  <h5 className="card-header">Nhà In</h5>
                                  <div className="table-responsive text-nowrap">
                                    {responseProduct &&
                                    responseProduct.data.priceByFactories
                                      .length > 0 ? (
                                      <table className="table table-sm ">
                                        <thead>
                                          <tr>
                                            <th>
                                              <strong>Tên Nhà In</strong>
                                            </th>
                                            <th>
                                              <strong>Chất liệu vải</strong>
                                            </th>
                                            <th>
                                              <strong>Địa chỉ</strong>
                                            </th>
                                            <th>
                                              <strong>giá sản phẩm</strong>
                                            </th>
                                          </tr>
                                        </thead>
                                        {responseProduct.data.priceByFactories.map(
                                          (x) => (
                                            <tbody
                                              key={x.factory.name}
                                              className="table-border-bottom-0"
                                            >
                                              <tr>
                                                <td>
                                                  <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                                                  <strong>
                                                    {x.factory.name}
                                                  </strong>
                                                </td>
                                                <td>
                                                  <strong>{x.material}</strong>
                                                </td>
                                                <td
                                                  style={{
                                                    whiteSpace: "pre-wrap",
                                                    wordWrap: "break-word",
                                                  }}
                                                >
                                                  <strong>
                                                    {x.factory.location}{" "}
                                                  </strong>
                                                </td>
                                                <td>
                                                  <strong>
                                                    {numberWithCommas(
                                                      Number(x.price)
                                                    )}{" "}
                                                    VNĐ
                                                  </strong>
                                                </td>
                                              </tr>
                                            </tbody>
                                          )
                                        )}
                                      </table>
                                    ) : (
                                      <div className="h3 text-center p-3">
                                        Sản phẩm này hiện chưa có nhà in nào sản
                                        xuất
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {/* /Account */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        {isEditProduct === false && (
                          <button
                            type="button"
                            onClick={() => {
                              handleEditProduct();
                            }}
                            className="btn btn-primary me-2"
                          >
                            Edit
                          </button>
                        )}
                        {isEditProduct && (
                          <button
                            type="submit"
                            className="btn btn-primary me-2"
                          >
                            Lưu thay đổi
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            router.push("manage-product");
                          }}
                        >
                          Trở về
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* /Account */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* / Content */}

        <div className="content-backdrop fade" />
      </div>
      {/* create size & color */}
      <div>
        <Dialog
          open={openCreateDialog}
          onClose={handleCloseCreateDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
        >
          <DialogContent>
            <CreateNewSizeColorForProductForm
              handleCloseDialog={handleCloseCreateDialog}
              id={id}
            />
          </DialogContent>
        </Dialog>
        <div className="container-xxl flex-grow-1 container-p-y ">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                {/* Account */}

                <h5 className="card-header">Màu & kích thước</h5>
                <div>
                  <button
                    className="btn btn-success ms-4 text-dark"
                    onClick={handleOpenCreateSizeColorDialog}
                  >
                    <AddIcon sx={{ mr: 1 }} />
                    Tạo mới màu & kích thước
                  </button>
                </div>
                <br className="my-4" />
                <hr className="my-0" />
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive text-nowrap">
                      {responseSizesColorById &&
                      renderedSizeList &&
                      !isLoadingSizeProductResponse ? (
                        <div key={nanoid()}>
                          <div className="d-flex">
                            <table className="table table-borderless w-50 d-inline">
                              <thead className="border-bottom">
                                <tr>
                                  <th>
                                    <strong>Kích thước</strong>
                                  </th>
                                  <th>
                                    <strong>Chiều rộng</strong>
                                  </th>
                                  <th>
                                    <strong>Chiều dài</strong>
                                  </th>
                                  <th>
                                    <strong>Hành động</strong>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="table-border-bottom-0">
                                {renderedSizeList.map((data) => (
                                  <tr key={nanoid()}>
                                    <td>
                                      <strong>{data.size}</strong>
                                    </td>
                                    <td>
                                      <strong>{data.width} cm</strong>
                                    </td>
                                    <td>
                                      <strong>{data.height} cm</strong>
                                    </td>
                                    <td>
                                      {data.id === "none" ? (
                                        <button
                                          className="btn btn-primary"
                                          onClick={() =>
                                            handleCreateProductSize(data.size)
                                          }
                                        >
                                          Thêm số đo
                                        </button>
                                      ) : (
                                        <button
                                          className="btn btn-secondary"
                                          onClick={() =>
                                            handleUpdateProductSize(data)
                                          }
                                        >
                                          Chỉnh sửa
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <Dialog
                              open={openCreateProductSize}
                              onClose={handleCloseCreateDialog}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                              fullWidth={true}
                            >
                              <DialogContent>
                                {isCreateProductSize ? (
                                  <CreateProductSizeForm
                                    setOpenCreateProductSize={
                                      setOpenCreateProductSize
                                    }
                                    productId={id}
                                    size={sizeCreateData}
                                  />
                                ) : (
                                  <UpdateProductSizeForm
                                    setOpenCreateProductSize={
                                      setOpenCreateProductSize
                                    }
                                    productSizeUpdateData={
                                      productSizeUpdateData
                                    }
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                            {responseColorSize && responseColorSize.length > 0 && (
                              <table className="table table-borderless w-50 d-inline">
                                <thead className="border-bottom">
                                  <tr>
                                    <th>
                                      <strong>Màu</strong>
                                    </th>
                                    <th>
                                      <strong>Kích thước</strong>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                  {responseColorSize.map((data) => (
                                    <tr key={nanoid()}>
                                      <td className="align-top">
                                        <img
                                          key={data.color.split("-")[0]}
                                          width={25}
                                          height={25}
                                          className="rounded-circle border me-1"
                                          src={
                                            "https://images.printify.com/5853fec7ce46f30f8328200a"
                                          }
                                          style={{
                                            backgroundColor:
                                              data.color.split("-")[1],
                                          }}
                                          alt={data.color.split("-")[0]}
                                        />
                                        <strong>
                                          {data.color.split("-")[0]}
                                        </strong>
                                      </td>
                                      <td className="align-top">
                                        {data.sizes.map((size) => (
                                          <Chip
                                            key={size}
                                            label={size}
                                            sx={{ marginRight: 2 }}
                                          />
                                        ))}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="h3 text-center p-3">
                          Sản phẩm này chưa có màu và kích thước
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>

        {/* / Content */}

        <div className="content-backdrop fade" />
      </div>
      {/* end create size & color*/}
      <div>
        <div className="container-xxl flex-grow-1 container-p-y ">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                {/* Account */}
                <div className="card">
                  <h5 className="card-header">Bản thiết kế của Sản phẩm</h5>
                  {responseProductBlueprint &&
<<<<<<< HEAD
=======
                    sizeProductResponse &&
                    sizeProductResponse.filter(
                      (size) => size.size === "L"
                    )[0] &&
>>>>>>> 2cd40f3 (fix create-blueprint err)
                    responseProductBlueprint.data.length < 2 && (
                      <div>
                        <button
                          className="btn btn-success ms-4 text-dark"
                          onClick={handleCreateProductBlueprint}
                        >
                          <AddIcon sx={{ mr: 1 }} />
                          Tạo mới bản thiết kế
                        </button>
                      </div>
                    )}
                  <br className="my-4" />
                  <hr className="my-0" />
                  <div className="table-responsive text-nowrap">
                    {!isloadingPrBlueprint &&
                    responseProductBlueprint &&
                    responseProductBlueprint.data.length > 0 ? (
                      <table className="table table-sm ">
                        <thead>
                          <tr>
                            <th>
                              <strong>Hình nền khung</strong>
                            </th>
                            <th>
                              <strong>Khu vực in</strong>
                            </th>

                            <th>
                              <strong>Vị trí</strong>
                            </th>
                            <th>
                              <strong>Hành động</strong>
                            </th>
                          </tr>
                        </thead>
                        {responseProductBlueprint.data.map(
                          (productBlueprint) => (
                            <tbody
                              key={productBlueprint.id}
                              className="table-border-bottom-0"
                            >
                              <tr>
                                <td>
                                  <img
                                    src={productBlueprint.frameImage}
                                    alt="user-avatar"
                                    className="d-block rounded"
                                    height={100}
                                    width={100}
                                    id="uploadedAvatar"
                                  />
                                </td>
                                <td>
                                  <strong>Cách trên: </strong>
                                  {productBlueprint.placeholder.top.toFixed(2)}%
                                  <br />
                                  <strong>Chiều dài: </strong>
                                  {productBlueprint.placeholder.height} cm
                                  <br />
                                  <strong>Chiều rộng: </strong>
                                  {productBlueprint.placeholder.width} cm
                                </td>
                                <td>
                                  {productBlueprint.position === "front"
                                    ? "Mặt trước"
                                    : "Mặt sau"}
                                </td>
                                <td>
                                  <IconButton
                                    onClick={() => {
                                      handleUpdateProductBlueprint(
                                        productBlueprint
                                      );
                                    }}
                                  >
                                    <EditIcon
                                      fontSize="medium"
                                      color="primary"
                                    />
                                  </IconButton>
                                </td>
                              </tr>
                            </tbody>
                          )
                        )}
                      </table>
                    ) : (
                      <div className="h3 text-center p-3">
                        {sizeProductResponse &&
                        sizeProductResponse.filter(
                          (size) => size.size === "L"
                        )[0]
                          ? " Sản phẩm này hiện chưa có bản thiết kế"
                          : "Hãy thêm số đo cho size L cho sản phẩm để tạo bản thiết kế"}
                      </div>
                    )}
                  </div>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content wrapper */}

      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
ProductDetails.Layout = MainLayout;
