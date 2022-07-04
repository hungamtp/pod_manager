/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import { storage } from "@/firebase/firebase";
import { Filter } from "@/services/categories";
import { UpdateProductDto } from "@/services/products/dto/update-product-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import { Fab, IconButton, InputLabel, MenuItem } from "@mui/material";
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
import CreateSizeColorProductForm from "@/components/manage-factory/create-size-color-product-form";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CreateNewSizeColorForProductForm from "@/components/manage-product/create-new-size-color-for-product-form";
import useGetProductBlueprint from "hooks/products/use-get-product-blueprint";
import CreateProductBlueprintForm from "@/components/manage-product/create-product-blueprint-form";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateProductBlueprintDto } from "@/services/products/dto/update-product-blueprint-dto";
import { ProductBlueprintDto } from "@/services/products/dto/get-product-blueprint-dto";
import UpdateProductBlueprintForm from "@/components/manage-product/update-product-blueprint-form";

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
  const ProductBlueprintValues: UpdateProductBlueprintDto = {
    id: "",
    frameImage: "",
    position: "",
    placeHolderTop: 0,
    placeHolderHeight: 0,
    placeHolderWidth: 0,
  };
  const { data: responseProduct, isLoading: isLoadingProduct } =
    useGetProductById(id);
  const { data: responseProductBlueprint, isLoading: isloadingPrBlueprint } =
    useGetProductBlueprint(id);
  const { data: responseSizesColorById } = useGetSizesColorsById(id);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openCreateProductBlueprint, setOpenCreateProductBlueprint] =
    React.useState(false);
  const [openUpdateProductBlueprint, setOpenUpdateProductBlueprint] =
    React.useState(false);
  const [productBlueprint, setProductBlueprint] =
    React.useState<UpdateProductBlueprintDto>(ProductBlueprintValues);
  const [checked, setChecked] = React.useState(true);
  const [checkValue, setCheckValue] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  const maxNumber = 69;

  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };

  const handleCreateProductBlueprint = () => {
    setOpenCreateProductBlueprint(true);
  };

  const handleCloseCreateProductBlueprint = () => {
    setOpenCreateProductBlueprint(false);
  };

  const handleUpdateProductBlueprint = (
    productBlueprint: ProductBlueprintDto
  ) => {
    const tmpData: UpdateProductBlueprintDto = {
      id: productBlueprint.id,
      frameImage: productBlueprint.frameImage,
      position: productBlueprint.position,
      placeHolderTop: productBlueprint.placeholder.top,
      placeHolderHeight: productBlueprint.placeholder.height,
      placeHolderWidth: productBlueprint.placeholder.width,
    };
    setProductBlueprint(tmpData);
    setOpenUpdateProductBlueprint(true);
  };
  const handleCloseUpdateProductBlueprint = () => {
    setOpenUpdateProductBlueprint(false);
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
                                    Update Image
                                  </button>
                                  &nbsp;
                                  <button
                                    className="btn btn-outline-secondary account-image-reset mb-4"
                                    type="button"
                                    onClick={onImageRemoveAll}
                                  >
                                    Clear
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
                        <div className="container-xxl flex-grow-1 container-p-y ">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="card mb-4">
                                {/* Account */}
                                <div className="card">
                                  <h5 className="card-header">Factories</h5>
                                  <div className="table-responsive text-nowrap">
                                    {responseProduct &&
                                    responseProduct.data.priceByFactories
                                      .length > 0 ? (
                                      <table className="table table-sm ">
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
                                                  <strong>
                                                    {x.factory.name}
                                                  </strong>
                                                </td>
                                                <td>
                                                  <strong>
                                                    {x.factory.location}
                                                  </strong>
                                                </td>
                                                <td>
                                                  <strong>{x.price}</strong>
                                                </td>
                                              </tr>
                                            </tbody>
                                          )
                                        )}
                                      </table>
                                    ) : (
                                      <div className="h3 text-center p-3">
                                        There is no factories support this
                                        product yet
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
                          onClick={() => {
                            router.push("manage-product");
                          }}
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
      <div>
        <Dialog
          open={openCreateProductBlueprint}
          onClose={handleCloseCreateProductBlueprint}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
        >
          <DialogContent>
            <CreateProductBlueprintForm
              handleCloseDialog={handleCloseCreateProductBlueprint}
              id={id}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={openUpdateProductBlueprint}
          onClose={handleCloseUpdateProductBlueprint}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
        >
          <DialogContent>
            <UpdateProductBlueprintForm
              handleCloseDialog={handleCloseUpdateProductBlueprint}
              productBlueprint={productBlueprint}
            />
          </DialogContent>
        </Dialog>
        <div className="container-xxl flex-grow-1 container-p-y ">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                {/* Account */}
                <div className="card">
                  <h5 className="card-header">Product Blueprints</h5>
                  <div>
                    <button
                      className="btn btn-success ms-4 text-dark"
                      onClick={handleCreateProductBlueprint}
                    >
                      <AddIcon sx={{ mr: 1 }} />
                      Create Product Blueprints
                    </button>
                  </div>
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
                              <strong>frame Image</strong>
                            </th>
                            <th>
                              <strong>placeholder</strong>
                            </th>

                            <th>
                              <strong>position</strong>
                            </th>
                            <th>
                              <strong>Actions</strong>
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
                                  <strong> Top: </strong>
                                  {productBlueprint.placeholder.top}%
                                  <br />
                                  <strong>Height: </strong>
                                  {productBlueprint.placeholder.height} inch
                                  <br />
                                  <strong>Width: </strong>
                                  {productBlueprint.placeholder.width} inch
                                </td>
                                <td>{productBlueprint.position}</td>
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
                        This product does not have any blueprint yet
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

                <h5 className="card-header">Sizes & Colors</h5>
                <div>
                  <button
                    className="btn btn-success ms-4 text-dark"
                    onClick={handleOpenCreateSizeColorDialog}
                  >
                    <AddIcon sx={{ mr: 1 }} />
                    Create New Sizes & Colors
                  </button>
                </div>
                <br className="my-4" />
                <hr className="my-0" />
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive text-nowrap">
                      {responseSizesColorById &&
                      responseSizesColorById.data.sizes.length > 0 ? (
                        <div key={nanoid()}>
                          <table className="table table-sm mb-3 col-md-6">
                            <thead>
                              <tr>
                                <th>
                                  <strong>Size</strong>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                              {responseSizesColorById.data.sizes.map(
                                (sizes) => (
                                  <tr key={nanoid()}>
                                    <td>
                                      <strong>{sizes}</strong>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                          <table className="table table-sm mb-3 col-md-6">
                            <thead>
                              <tr>
                                <th>
                                  <strong>Color</strong>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                              {responseSizesColorById.data.colors.map(
                                (colors) => (
                                  <tr key={nanoid()}>
                                    <td>
                                      <img
                                        key={colors.image}
                                        width={25}
                                        height={25}
                                        className="rounded-circle border me-1"
                                        src={
                                          "https://images.printify.com/5853fec7ce46f30f8328200a"
                                        }
                                        style={{
                                          backgroundColor: colors.image,
                                        }}
                                        alt={colors.image}
                                      />
                                      <strong>{colors.name}</strong>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="h3 text-center p-3">
                          This product does not have any Sizes and Colors yet
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

      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
ProductDetails.Layout = MainLayout;
