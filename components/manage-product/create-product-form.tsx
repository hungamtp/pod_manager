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

export interface ICreateProductFormProps {
  handleCloseDialog: () => void;
}

type FormCreateProduct = {
  name: string;
  categoryName: string;
  tags: [];
  numberOfSize: number;
  numberOfColor: number;
  numberOfFactory: number;
  productImages: { image: string }[];
};
const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  categoryName: yup
    .string()
    .min(1, "Category Name cần ít nhất 1 kí tự")
    .max(26, "Category Name tối đa 50 kí tự")
    .required("Category Name không được để trống"),
  numberOfSize: yup
    .number()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  numberOfColor: yup
    .number()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  numberOfFactory: yup
    .number()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
});

export default function CreateProductForm(props: ICreateProductFormProps) {
  const { handleCloseDialog } = props;
  const [role, setRole] = React.useState("USER");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  const defaultValues: FormCreateProduct = {
    name: "",
    categoryName: "",
    tags: [],
  numberOfSize: 0,
  numberOfColor: 0,
  numberOfFactory: 0,
  productImages: ,
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
  const { mutate: addAcount, error } = useCreateAccount(handleCloseDialog);

  const onSubmit: SubmitHandler<FormCreateProduct> = (data) => {
    data.roleName = role;
    addAcount(data);
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
                  First Name
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
                      placeholder="John"
                      aria-label="John"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("firstName")}
                    />
                  </div>
                  {errors.firstName && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Last Name
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
                      placeholder="Doe"
                      aria-label="Doe"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("lastName")}
                    />
                  </div>
                  {errors.lastName && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-company"
                >
                  Pass Word
                </label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-company2"
                      className="input-group-text"
                    >
                      <KeyIcon fontSize="small" />
                    </span>
                    <input
                      type="text"
                      id="basic-icon-default-company"
                      className="form-control"
                      placeholder="ACME Inc."
                      aria-label="ACME Inc."
                      aria-describedby="basic-icon-default-company2"
                      {...register("password")}
                    />
                  </div>
                  {errors.password && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-email"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span className="input-group-text">
                      <i className="bx bx-envelope" />
                    </span>
                    <input
                      type="text"
                      id="basic-icon-default-email"
                      className="form-control"
                      placeholder="john.doe"
                      aria-label="john.doe"
                      aria-describedby="basic-icon-default-email2"
                      {...register("email")}
                    />

                    <span
                      id="basic-icon-default-email2"
                      className="input-group-text"
                    >
                      @example.com
                    </span>
                  </div>
                  {errors.email && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.email.message}
                    </span>
                  )}
                  <div className="form-text">
                    You can use letters, numbers &amp; periods
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 form-label"
                  htmlFor="basic-icon-default-phone"
                >
                  Phone No
                </label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-phone2"
                      className="input-group-text"
                    >
                      <i className="bx bx-phone" />
                    </span>
                    <input
                      type="text"
                      id="basic-icon-default-phone"
                      className="form-control phone-mask"
                      placeholder="658 799 8941"
                      aria-label="658 799 8941"
                      aria-describedby="basic-icon-default-phone2"
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 form-label"
                  htmlFor="basic-icon-default-message"
                >
                  Address
                </label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-message2"
                      className="input-group-text"
                    >
                      <i className="bx bx-comment" />
                    </span>
                    <textarea
                      id="basic-icon-default-message"
                      className="form-control"
                      placeholder="Hi, Do you have a moment to talk Joe?"
                      aria-label="Hi, Do you have a moment to talk Joe?"
                      aria-describedby="basic-icon-default-message2"
                      {...register("address")}
                    />
                  </div>
                  {errors.address && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.address.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-company"
                >
                  Role Name
                </label>
                <div className="col-sm-10">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Role</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value="USER">USER</MenuItem>
                      <br />
                      <MenuItem value="FACTORY">FACTORY</MenuItem>
                      <br />
                      <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.roleName && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.roleName.message}
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
