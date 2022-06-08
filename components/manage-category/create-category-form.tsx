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

export interface ICreateCategoryFormProps {
  handleCloseDialog: () => void;
}

type FormCreateAccount = {
  name: string;
  image: string;
};
const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  image: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
});

export default function CreateCategoryForm(props: ICreateCategoryFormProps) {
  const { handleCloseDialog } = props;
  const [role, setRole] = React.useState("USER");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  const defaultValues: FormCreateAccount = {
    name: "",
    image: "",
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
  const { mutate: addCategory, error } = useCreateCategory(handleCloseDialog);

  const onSubmit: SubmitHandler<FormCreateAccount> = (data) => {
    addCategory(data);
    console.log(data, "formCreate");
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
                  Category Name
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
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Image
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
                      placeholder="Image link"
                      aria-label="Image link"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("image")}
                    />
                  </div>
                  {errors.image && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.image.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-primary"
                    color="primary"
                  >
                    CREATE
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
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