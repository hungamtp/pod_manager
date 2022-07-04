import { UpdateAccountDto } from "@/services/accounts/dto/update-accounts-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useUpdateAccount from "hooks/accounts/use-update-account";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IUpdateFormProps {
  handleCloseDialog: () => void;
  account: UpdateAccountDto;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  lastName: yup
    .string()
    .min(1, "Last Name cần ít nhất 1 kí tự")
    .max(26, "Last Name tối đa 50 kí tự")
    .required("Last Name không được để trống"),
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
});

export default function UpdateForm(props: IUpdateFormProps) {
  const { handleCloseDialog, account } = props;
  const [role, setRole] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  const defaultValues: UpdateAccountDto = {
    id: "",
    firstName: "",
    lastName: "",
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
  } = useForm<UpdateAccountDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    setRole(account.roleName);
    reset(account);
  }, [account]);

  const { mutate: updateAccount, error } = useUpdateAccount(handleCloseDialog);

  const onSubmit: SubmitHandler<UpdateAccountDto> = (data) => {
    const submitData = {
      ...data,
      id: account.id,
      roleName: role,
    } as UpdateAccountDto;
    updateAccount(submitData);
    console.log(submitData, "data");
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
                  Id
                </label>

                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      disabled
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("id")}
                    />
                  </div>
                  {errors.id && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.id.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  First Name
                </label>

                <div className="col-sm-9">
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
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Last Name
                </label>
                <div className="col-sm-9">
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
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-email"
                >
                  Email
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
                      id="basic-icon-default-email"
                      className="form-control"
                      placeholder="john.doe"
                      aria-label="john.doe"
                      readOnly
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
                  className="col-sm-3 form-label"
                  htmlFor="basic-icon-default-phone"
                >
                  Phone No
                </label>
                <div className="col-sm-9">
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
                      placeholder="093 8257 485"
                      aria-label="093 8257 485"
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
                  className="col-sm-3 form-label"
                  htmlFor="basic-icon-default-message"
                >
                  Address
                </label>
                <div className="col-sm-9">
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
                      placeholder="Quan 9, TP. Ho Chi Minh"
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
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-company"
                >
                  Role Name
                </label>
                <div className="col-sm-9">
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
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    UPDATE
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
