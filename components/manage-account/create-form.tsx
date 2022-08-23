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
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import VisibilityIcon from "@mui/icons-material/Visibility";
export interface ICreateFormProps {
  handleCloseDialog: () => void;
}

type FormCreateAccount = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  roleName: string;
};
const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(1, "Tên cần ít nhất 1 kí tự")
    .max(26, "Tên tối đa 50 kí tự")
    .required("Tên không được để trống"),
  lastName: yup
    .string()
    .trim()
    .min(1, "Họ cần ít nhất 1 kí tự")
    .max(26, "Họ tối đa 50 kí tự")
    .required("Họ không được để trống"),
  password: yup
    .string()
    .trim()
    .min(8, "Mật khẩu cần ít nhất 8 kí tự")
    .max(26, "Mật khẩu tối đa 50 kí tự")
    .required("Mật khẩu không được để trống"),
  email: yup
    .string()
    .trim()
    .email()
    .min(8, "email cần ít nhất 8 kí tự")
    .max(50, "email tối đa 50 kí tự")
    .required("email không được để trống"),
  phone: yup
    .string()
    .trim()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Số điện thoại gồm 10 số và bắt đầu từ 0"
    )
    .required("Số điện thoại không được để trống"),
  address: yup
    .string()
    .trim()
    .min(10, "Địa chỉ cần ít nhất 10 kí tự")
    .max(100, "Địa chỉ tối đa 100 kí tự")
    .required("Địa chỉ không được để trống"),
});

export default function CreateForm(props: ICreateFormProps) {
  const { handleCloseDialog } = props;
  const [role, setRole] = React.useState("USER");
  const [seePassword, setSeePassword] = React.useState("password");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  const defaultValues: FormCreateAccount = {
    firstName: "",
    lastName: "",
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

  const handleSeePassword = () => {
    if (seePassword === "password") {
      setSeePassword("text");
    } else {
      setSeePassword("password");
    }
  };

  const onSubmit: SubmitHandler<FormCreateAccount> = (data) => {
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
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-fullname"
                >
                  Tên
                </label>

                <div className="col-sm-8">
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
                      placeholder="A"
                      aria-label="A"
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
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-fullname"
                >
                  Họ
                </label>
                <div className="col-sm-8">
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
                      placeholder="Nguyen Van"
                      aria-label="Nguyen Van"
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
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-company"
                >
                  Mật khẩu
                </label>
                <div className="col-sm-8">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-company2"
                      className="input-group-text"
                    >
                      <KeyIcon fontSize="small" />
                    </span>
                    <input
                      type={seePassword}
                      id="basic-icon-default-company"
                      className="form-control"
                      placeholder="**********"
                      aria-label="**********"
                      aria-describedby="basic-icon-default-company2"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      id="basic-icon-default-company2"
                      className="input-group-text"
                    >
                      {seePassword === "text" ? (
                        <VisibilityOffIcon
                          onClick={() => {
                            handleSeePassword();
                          }}
                          fontSize="small"
                        />
                      ) : (
                        <VisibilityIcon
                          onClick={() => {
                            handleSeePassword();
                          }}
                          fontSize="small"
                        />
                      )}
                    </button>
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
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-email"
                >
                  Email
                </label>
                <div className="col-sm-8">
                  <div className="input-group input-group-merge">
                    <span className="input-group-text">
                      <i className="bx bx-envelope" />
                    </span>
                    <input
                      type="text"
                      id="basic-icon-default-email"
                      className="form-control"
                      placeholder="nvana@gmail.com"
                      aria-describedby="basic-icon-default-email2"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 form-label  text-capitalize fs-6"
                  htmlFor="basic-icon-default-phone"
                >
                  Số điện thoại
                </label>
                <div className="col-sm-8">
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
                      placeholder="0912348473"
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
                  className="col-sm-3 form-label  text-capitalize fs-6"
                  htmlFor="basic-icon-default-message"
                >
                  Địa chỉ
                </label>
                <div className="col-sm-8">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-message2"
                      className="input-group-text"
                    >
                      <i className="bx bx-home" />
                    </span>
                    <textarea
                      id="basic-icon-default-message"
                      className="form-control"
                      placeholder="Quận 9, TP. Hồ Chí Minh"
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
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-company"
                >
                  Vị trí
                </label>
                <div className="col-sm-8">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Role</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem className="d-flex flex-column" value="USER">
                        USER
                      </MenuItem>

                      <MenuItem className="d-flex flex-column" value="ADMIN">
                        ADMIN
                      </MenuItem>
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
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    Tạo tài khoản
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
