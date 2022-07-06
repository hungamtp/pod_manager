import { UpdateAccountDto } from "@/services/accounts/dto/update-accounts-dto";
import { UpdateCategoryDto } from "@/services/categories/dto/update-categories-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useUpdateAccount from "hooks/accounts/use-update-account";
import useUpdateCategory from "hooks/categories/use-update-categories";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import useCreateCategory from "hooks/categories/use-create-categories";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { storage } from "@/firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import useUpdateProduct from "hooks/products/use-update-products";
import { UpdateProductDto } from "@/services/products/dto/update-product-dto";
import useCategories from "hooks/categories/use-categories";
import { Filter } from "@/services/categories";

export interface IUpdateProductFormProps {
  handleCloseDialog: () => void;
  product: UpdateProductDto;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
});

export default function UpdateProductForm(props: IUpdateProductFormProps) {
  const { handleCloseDialog, product } = props;
  const [categoryName, setCategoryName] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setCategoryName(event.target.value);
  };
  const [images, setImages] = React.useState<ImageListType>(
    product.images.map((image) => ({ data_url: image }))
  );
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const { data: response, isLoading: isLoadingCategory } =
    useCategories(filter);
  const [isLoading, setIsLoading] = React.useState(false);

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
    reset(product);
    setCategoryName(product.categoryName);
  }, [product]);

  const { mutate: updateProduct, isLoading: isLoadingUpdateProduct } =
    useUpdateProduct(handleCloseDialog);
  React.useEffect(() => {
    if (isLoadingUpdateProduct === false) {
      setIsLoading(false);
    }
  }, [isLoadingUpdateProduct]);
  const maxNumber = 69;
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };
  const onUploadImage = (data: {
    name: string;
    images: string[];
    description: string;
    categoryName: string;
  }) => {
    setIsLoading(true);
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
                id: product.id,
                images: imageList,
              } as UpdateProductDto;
              updateProduct(submitData);
            }
          });
        });
      });
    }
  };

  const onSubmit: SubmitHandler<UpdateProductDto> = (data) => {
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
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Tên sản phẩm
                </label>

                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    ></span>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      placeholder="Hoodies"
                      aria-label="Hoodies"
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
                  Thể loại
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
                            {...register("categoryName")}
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
                  htmlFor="basic-icon-default-fullname"
                >
                  Mô tả
                </label>

                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    ></span>
                    <textarea
                      rows={3}
                      className="form-control"
                      id="basic-icon-default-fullname"
                      placeholder="Hoodies"
                      aria-label="Hoodies"
                      aria-describedby="basic-icon-default-fullname2"
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
                  Hình ảnh
                </label>
                <div className="col-sm-9">
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
                          <div key={index} className="image-item">
                            <img src={image["data_url"]} alt="" width="100" />
                          </div>
                        ))}
                        <button
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                          type="button"
                          className="btn btn-primary"
                        >
                          Tải lên
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={onImageRemoveAll}
                        >
                          Xóa
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
                    {isLoading === true && (
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Thay đổi
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
