/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import KeyIcon from "@mui/icons-material/Key";
import * as React from "react";
import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import useCreateAccount from "hooks/accounts/use-create-account";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useCreateCategory from "hooks/categories/use-create-categories";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { storage } from "@/firebase/firebase";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import useCreateProduct from "hooks/products/use-create-products";
import useCategories from "hooks/categories/use-categories";
import { Filter } from "@/services/categories";
import { MenuList } from "@mui/material";

export interface ICreateProductFormProps {
  handleCloseDialog: () => void;
}

type FormCreateProduct = {
  name: string;
  categoryName: string;
  description: string;
  images: [];
};
const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  description: yup
    .string()
    .min(10, "Description cần ít nhất 10 kí tự")
    .max(500, "Description tối đa 500 kí tự")
    .required("Description không được để trống"),
});

export default function CreateProductForm(props: ICreateProductFormProps) {
  const { handleCloseDialog } = props;
  const [categoryName, setCategoryName] = React.useState("");
  const [images, setImages] = React.useState<ImageListType>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setCategoryName(event.target.value);
  };

  const defaultValues: FormCreateProduct = {
    name: "",
    categoryName: "",
    description: "",
    images: [],
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCreateProduct>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const maxNumber = 69;
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };
  const onUploadImage = (data: {
    name: string;
    categoryName: string;
    description: string;
    images: [];
  }) => {
    if (images !== null) {
      const imageList = [] as string[];
      images.map((image) => {
        const file = image.file;
        const imageRef = ref(storage, `images/${file?.name}`);
        uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            imageList.push(url);
            if (imageList.length === images.length) {
              const submitData = { ...data, images: imageList };
              addProduct(submitData);
            }
          });
        });
      });
    }
  };
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const { data: response, isLoading: isLoadingCategory } =
    useCategories(filter);
  const { mutate: addProduct, error } = useCreateProduct(handleCloseDialog);

  const onSubmit: SubmitHandler<FormCreateProduct> = (data) => {
    data.categoryName = categoryName;
    onUploadImage(data);
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Name
                </label>

                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    >
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      placeholder="Product Name"
                      aria-label="Product Name"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Category Name
                </label>
                <div className="col-sm-10">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Category</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={categoryName}
                      label="categoryName"
                      onChange={handleChange}
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
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-company"
                >
                  Description
                </label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-company2"
                      className="input-group-text"
                    >
                      <DescriptionIcon fontSize="small" />
                    </span>
                    <input
                      type="text"
                      id="basic-icon-default-company"
                      className="form-control"
                      placeholder="Description."
                      aria-label="Description."
                      aria-describedby="basic-icon-default-company2"
                      {...register("description")}
                    />
                  </div>
                  {errors.description && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Image
                </label>
                <div className="col-sm-10">
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
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
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image["data_url"]} alt="" width="100" />
                          </div>
                        ))}
                        <button
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                          type="button"
                        >
                          Thêm ảnh
                        </button>
                        &nbsp;
                        <button type="button" onClick={onImageRemoveAll}>
                          Xóa ảnh
                        </button>
                      </div>
                    )}
                  </ImageUploading>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    CREATE
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
                    type="button"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
