import KeyIcon from "@mui/icons-material/Key";
import * as React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import useCreateAccount from "hooks/accounts/use-create-account";

export interface ICreateFormProps {
  handleCloseDialog: () => void;
}

type FormCreateAccount = {
  userFirstName: string;
  userLastName: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  roleName: string;
};
const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  userLastName: yup
    .string()
    .min(1, "Last Name cần ít nhất 1 kí tự")
    .max(26, "Last Name tối đa 50 kí tự")
    .required("Last Name không được để trống"),
  password: yup
    .string()
    .min(8, "Mật khẩu cần ít nhất 8 kí tự")
    .max(26, "Mật khẩu tối đa 50 kí tự")
    .required("Mật khẩu không được để trống"),
  email: yup
    .string()
    .email()
    .min(8, "Tài khoản cần ít nhất 8 kí tự")
    .max(50, "Tài khoản tối đa 50 kí tự")
    .required("Tài khoản không được để trống"),
  phone: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Số điện thoại gồm 10 số và bắt đầu từ 0"
    )
    .required("Số điện thoại không được để trống"),
  address: yup
    .string()
    .min(10, "Địa chỉ cần ít nhất 10 kí tự")
    .max(50, "Địa chỉ tối đa 50 kí tự")
    .required("Địa chỉ không được để trống"),
  roleName: yup
    .string()
    .min(3, "Role cần ít nhất 8 kí tự")
    .max(10, "Role tối đa 50 kí tự")
    .required("Role không được để trống"),
});

export default function CreateForm(props: ICreateFormProps) {
  const { handleCloseDialog } = props;
  const defaultValues: FormCreateAccount = {
    userFirstName: "",
    userLastName: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    roleName: "",
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
  const { mutate: addAcount, error } = useCreateAccount(handleCloseDialog);

  const onSubmit: SubmitHandler<FormCreateAccount> = (data) => {
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
                      {...register("userFirstName")}
                    />
                  </div>
                  {errors.userFirstName && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.userFirstName.message}
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
                      {...register("userLastName")}
                    />
                  </div>
                  {errors.userLastName && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.userLastName.message}
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
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-company2"
                      className="input-group-text"
                    >
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
                      id="basic-icon-default-company"
                      className="form-control"
                      placeholder="ACME Inc."
                      aria-label="ACME Inc."
                      aria-describedby="basic-icon-default-company2"
                      {...register("roleName")}
                    />
                  </div>
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
