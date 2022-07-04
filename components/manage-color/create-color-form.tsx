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
import useCreateColor from "hooks/colors/use-create-colors";

export interface ICreateColorFormProps {
  handleCloseDialog: () => void;
}

type FormCreateAccount = {
  name: string;
  imageColor: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
});

export default function CreateColorForm(props: ICreateColorFormProps) {
  const { handleCloseDialog } = props;

  const defaultValues: FormCreateAccount = {
    name: "",
    imageColor: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCreateAccount>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutate: addColor, error } = useCreateColor(handleCloseDialog);

  const onSubmit: SubmitHandler<FormCreateAccount> = (data) => {
    addColor(data);
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
                  Color Name
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
                      className="form-control"
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
                  Color Image
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <input
                      type="color"
                      className="form-control"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("imageColor")}
                    />
                  </div>
                  {errors.imageColor && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.imageColor.message}
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
