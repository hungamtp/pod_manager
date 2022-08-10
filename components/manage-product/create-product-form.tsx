/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { storage } from "@/firebase/firebase";
import { Filter } from "@/services/categories";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useCategories from "hooks/categories/use-categories";
import useCreateProduct from "hooks/products/use-create-products";
import * as React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import * as yup from "yup";

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
    .trim()
    .min(1, "Tên sản phẩm cần ít nhất 1 kí tự")
    .max(26, "Tên sản phẩm tối đa 50 kí tự")
    .required("Tên sản phẩm không được để trống"),
  description: yup
    .string()
    .trim()
    .min(10, "Mô tả sản phẩm cần ít nhất 10 kí tự")
    .max(500, "Mô tả sản phẩm tối đa 500 kí tự")
    .required("Mô tả sản phẩm không được để trống"),
});

export default function CreateProductForm(props: ICreateProductFormProps) {
  const { handleCloseDialog } = props;
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const { data: response, isLoading: isLoadingCategory } =
    useCategories(filter);

  const [categoryName, setCategoryName] = React.useState("");
  const [images, setImages] = React.useState<ImageListType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event: SelectChangeEvent) => {
    setCategoryName(event.target.value);
  };

  React.useEffect(() => {
    const tmpCate = response?.content[0].name || "";
    setCategoryName(tmpCate);
  }, [response]);

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
  const [isImageError, setIsImageError] = useState(false);
  const onUploadImage = (data: {
    name: string;
    categoryName: string;
    description: string;
    images: [];
  }) => {
    if (images !== null && images.length > 0) {
      const imageList = [] as string[];
      setIsLoading(true);
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
    } else {
      setIsImageError(true);
    }
  };

  const { mutate: addProduct, isLoading: isLoadingCreateProduct } =
    useCreateProduct(handleCloseDialog);

  React.useEffect(() => {
    if (isLoadingCreateProduct === false) {
      setIsLoading(false);
    }
  }, [isLoadingCreateProduct]);

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
              <div className="card-body">
                <div className="row mb-3">
                  <label
                    className="col-sm-3 col-form-label"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Tên sản phẩm
                  </label>

                  <div className="col-sm-9">
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control"
                        id="basic-icon-default-fullname"
                        placeholder="Tên sản phẩm"
                        aria-label="Tên sản phẩm"
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
                    className="col-sm-3 col-form-label"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Category
                  </label>
                  <div className="col-sm-9">
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
                    className="col-sm-3 col-form-label"
                    htmlFor="basic-icon-default-company"
                  >
                    Mô tả
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group input-group-merge">
                      <textarea
                        rows={3}
                        id="basic-icon-default-company"
                        className="form-control"
                        placeholder="Mô tả...."
                        aria-label="Mô tả...."
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
                    className="col-sm-3 col-form-label"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Hình xem trước
                  </label>
                  <div className="col-sm-9">
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
                            onClick={() => {
                              onImageUpload();
                              setIsImageError(false);
                            }}
                            {...dragProps}
                            className="btn btn-info"
                            type="button"
                          >
                            <FileUploadIcon /> Tải ảnh lên
                          </button>
                          &nbsp;
                          {images.length > 0 && (
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={onImageRemoveAll}
                            >
                              xóa
                            </button>
                          )}
                        </div>
                      )}
                    </ImageUploading>
                    {isImageError && (
                      <span id="error-pwd-message" className="text-danger">
                        {"Hình không được để trống"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    {isLoading === true && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Tạo mới
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
                    type="button"
                  >
                    Hủy
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
