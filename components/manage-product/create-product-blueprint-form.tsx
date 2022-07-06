/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import KeyIcon from "@mui/icons-material/Key";
import * as React from "react";
import * as yup from "yup";
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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";
import useCreateProductBlueprint from "hooks/products/use-create-product-blueprint";

export interface ICreateProductBlueprintFormProps {
  handleCloseDialog: () => void;
  id: string;
}

type FormCreateProductBlueprint = {
  position: string;
  frameImage: string;
  placeHolderTop: number;
  placeHolderHeight: number;
  placeHolderWidth: number;
};

const schema = yup.object().shape({});

export default function CreateProductBlueprintForm(
  props: ICreateProductBlueprintFormProps
) {
  const { handleCloseDialog, id } = props;
  const [position, setPosition] = React.useState("Back");
  const [images, setImages] = React.useState<ImageListType>([]);
  const { mutate: addProductBlueprint, error } = useCreateProductBlueprint(
    handleCloseDialog,
    id
  );

  const handleChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value);
  };
  const defaultValues: FormCreateProductBlueprint = {
    position: "",
    frameImage: "",
    placeHolderTop: 0,
    placeHolderHeight: 0,
    placeHolderWidth: 0,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCreateProductBlueprint>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const maxNumber = 69;
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };
  const onUploadImage = (data: FormCreateProductBlueprint) => {
    if (images !== null) {
      const file = images[0].file;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const submitData = { ...data, frameImage: url };
          addProductBlueprint(submitData);
        });
      });
    }
  };

  const onSubmit: SubmitHandler<FormCreateProductBlueprint> = (data) => {
    onUploadImage({ ...data, position: position });
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
                  Vị trí
                </label>

                <div className="col-sm-10">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Vị trí</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={position}
                      label="Vị trí"
                      onChange={handleChange}
                    >
                      <MenuItem className="d-flex flex-column" value="Back">
                        Back
                      </MenuItem>
                      <MenuItem className="d-flex flex-column" value="Front">
                        Front
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {errors.position && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.position.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  PLACEHOLDER
                </label>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label ms-4"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Top
                  </label>

                  <div className="col-sm-9">
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control"
                        id="basic-icon-default-fullname"
                        aria-describedby="basic-icon-default-fullname2"
                        {...register("placeHolderTop")}
                      />
                    </div>
                    {errors.placeHolderTop && (
                      <span id="error-pwd-message" className="text-danger">
                        {errors.placeHolderTop.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label ms-4"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Height
                  </label>

                  <div className="col-sm-9">
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control"
                        id="basic-icon-default-fullname"
                        aria-describedby="basic-icon-default-fullname2"
                        {...register("placeHolderHeight")}
                      />
                    </div>
                    {errors.placeHolderHeight && (
                      <span id="error-pwd-message" className="text-danger">
                        {errors.placeHolderHeight.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label ms-4"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Width
                  </label>

                  <div className="col-sm-9">
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control"
                        id="basic-icon-default-fullname"
                        aria-describedby="basic-icon-default-fullname2"
                        {...register("placeHolderWidth")}
                      />
                    </div>
                    {errors.placeHolderWidth && (
                      <span id="error-pwd-message" className="text-danger">
                        {errors.placeHolderWidth.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Hình ảnh
                </label>
                <div className="col-sm-10">
                  <ImageUploading
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
                          className="btn btn-primary"
                        >
                          Tải lên
                        </button>
                      </div>
                    )}
                  </ImageUploading>
                  {errors.frameImage && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.frameImage.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
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
