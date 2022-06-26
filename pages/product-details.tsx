/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import { storage } from "@/firebase/firebase";
import { Filter } from "@/services/categories";
import { UpdateProductDto } from "@/services/products/dto/update-product-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputLabel, MenuItem } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useCategories from "hooks/categories/use-categories";
import useColors from "hooks/products/use-colors";
import useGetProductById from "hooks/products/use-get-products-by-id";
import useGetSizesColorsById from "hooks/products/use-get-sizes-colors-by-id";
import useSizes from "hooks/products/use-sizes";
import useUpdateProductById from "hooks/products/use-update-products-by-id";
import { useRouter } from "next/router";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as yup from "yup";
export interface IProductDetailsProps {}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, " Name cần ít nhất 1 kí tự")
    .max(26, " Name tối đa 50 kí tự")
    .required(" Name không được để trống"),
});

export default function ProductDetails(props: IProductDetailsProps) {
  const router = useRouter();
  const id = router.asPath.split("id=")[1];
  const { data: responseProduct, isLoading: isLoadingProduct } =
    useGetProductById(Number(id));
  const { data: responseSizesColors, isLoading: isLoadingSizesColors } =
    useGetSizesColorsById(Number(id));
  const [checked, setChecked] = React.useState(true);
  const [checkValue, setCheckValue] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const maxNumber = 69;

  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };

  const defaultValues: UpdateProductDto = {
    id: 0,
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
    if (images !== null) {
      const imageList = [] as string[];
      images?.map((image) => {
        const file = image.file;
        const imageRef = ref(storage, `images/${file?.name}`);
        uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            imageList.push(url);
            if (imageList.length === images.length) {
              const submitData = {
                ...data,
                id: responseProduct?.data.id,
                images: imageList,
              } as UpdateProductDto;
              updateProduct(submitData);
            }
          });
        });
      });
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
    setImages(
      responseProduct?.data.productImages.map((image) => ({
        data_url: image.image,
      }))
    );
  }, [responseProduct]);

  const onSubmit: SubmitHandler<UpdateProductDto> = (data) => {
    const tmpData = {
      id: data.id,
      name: data.name,
      description: data.description,
      categoryName: data.categoryName,
      images: data.images,
    };
    console.log(tmpData, "dataaa");
    onUploadImage(tmpData);
  };

  const [images, setImages] = React.useState<ImageListType>();
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const { data: response, isLoading: isLoadingCategory } =
    useCategories(filter);

  return (
    <>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Product Details /</span>{" "}
            Product
          </h4>
          <div className="row">
            <div className="col-md-12">
              {!isLoadingProduct && responseProduct && (
                <div className="card mb-4">
                  <h5 className="card-header">Product Details</h5>
                  {/* Account */}

                  <div className="card-body">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      id="formAccountSettings"
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-start align-items-sm-center gap-4">
                          {images && (
                            <ImageUploading
                              value={images}
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
                                  {imageList?.map((image, index) => (
                                    <img
                                      alt="user-avatar"
                                      key={index}
                                      src={image["data_url"]}
                                      height={100}
                                      width={100}
                                      className="me-2 border border-secondary rounded-3 "
                                    />
                                  ))}
                                  <button
                                    className="btn btn-primary me-2 mb-4 ms-2"
                                    style={
                                      isDragging ? { color: "red" } : undefined
                                    }
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    type="button"
                                  >
                                    Thêm ảnh
                                  </button>
                                  &nbsp;
                                  <button
                                    className="btn btn-outline-secondary account-image-reset mb-4"
                                    type="button"
                                    onClick={onImageRemoveAll}
                                  >
                                    Xóa ảnh
                                  </button>
                                </div>
                              )}
                            </ImageUploading>
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
                          <label className="form-label">Name</label>
                          {errors.name && (
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
                              {errors.name.message}
                            </span>
                          )}
                          <input
                            disabled={isDisabled}
                            className="form-control"
                            type="text"
                            id="Name"
                            defaultValue={responseProduct.data.name}
                            {...register("name")}
                          />
                        </div>

                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Description
                          </label>
                          <textarea
                            disabled={isDisabled}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={responseProduct.data.description}
                            {...register("description")}
                          />
                        </div>

                        <div className="mb-3 col-md-6">
                          <label className="form-label">Category Name</label>
                          <div className="mb-3 col-md-6">
                            {categoryName && (
                              <FormControl
                                sx={{ m: 1, minWidth: 120 }}
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

                        <div className="mb-3 col-md-6 ">
                          <label className="form-label me-3">Product tag</label>
                          {responseProduct.data.productTags.map((tag) => (
                            <Chip
                              className=" me-2"
                              key={tag.tag.name}
                              label={tag.tag.name}
                            />
                          ))}
                        </div>
                        {/* Small table */}
                        <div className="card">
                          <h5 className="card-header">Price By Factories</h5>
                          <div className="table-responsive text-nowrap">
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th>
                                    <strong>Name</strong>
                                  </th>
                                  <th>
                                    <strong>Location</strong>
                                  </th>
                                  <th>
                                    <strong>Price</strong>
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
                                        <strong>{x.factory.name}</strong>
                                      </td>
                                      <td>
                                        <strong>{x.factory.location}</strong>
                                      </td>
                                      <td>
                                        <strong>{x.price}</strong>
                                      </td>
                                    </tr>
                                  </tbody>
                                )
                              )}
                            </table>
                          </div>
                        </div>
                        <hr className="my-5" />
                      </div>
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={handleIsDisabled}
                          className="btn btn-primary me-2"
                        >
                          Edit
                        </button>
                        <button type="submit" className="btn btn-primary me-2">
                          Save changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          Cancel
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
      {/* Content wrapper */}
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                {/* Account */}
                <h5 className="card-header">Sizes & Colors</h5>
                <hr className="my-0" />
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive text-nowrap">
                      <div className="mt-2">
                        <button type="button" className="btn btn-primary me-2">
                          Save changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          Cancel
                        </button>
                      </div>
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
      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
ProductDetails.Layout = MainLayout;