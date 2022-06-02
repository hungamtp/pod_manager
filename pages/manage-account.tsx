import { MainLayout } from "@/components/layouts";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAccounts from "hooks/accounts/use-accounts";
import { Filter } from "@/services/accounts";
import { Fragment, useState } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";
import { Pagination, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateAccount from "hooks/accounts/use-create-account";

export interface IManageAccountProps {}
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
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  lastName: yup
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
    .min(3, "Địa chỉ cần ít nhất 8 kí tự")
    .max(50, "Địa chỉ tối đa 50 kí tự")
    .required("Địa chỉ không được để trống"),
  roleName: yup
    .string()
    .min(3, "Role cần ít nhất 8 kí tự")
    .max(10, "Role tối đa 50 kí tự")
    .required("Role không được để trống"),
});

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

export default function ManageAccount(props: IManageAccountProps) {
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilter({ ...filter, pageNumber: value - 1 });
  };
  const { data: response, isLoading: isLoadingAccount } = useAccounts(filter);

  //  menu button

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /*{form add account }*/
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
    watch,
    formState: { errors },
  } = useForm<FormCreateAccount>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const { mutate: addAcount, error } = useCreateAccount(handleCloseDialog);

  const onSubmit: SubmitHandler<FormCreateAccount> = (data) => {
    addAcount(data);
    console.log(data, "formCreate");
  };
  /*{form add account }*/

  /* {open Dialog} */

  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Tables /</span> Basic Tables
          </h4>
          <Fab
            className="badge bg-success"
            variant="extended"
            size="small"
            aria-label="add"
            onClick={handleClickOpenDialog}
          >
            <AddIcon sx={{ mr: 1 }} />
            Create New Account
          </Fab>

          <hr className="my-4" />
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title">
              {"Create New Account"}
            </DialogTitle>
            <DialogContent>
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
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
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
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
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
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
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
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
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
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
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
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
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
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
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
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>

          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a
                className="nav-item nav-link px-0 me-xl-4"
                href="javascript:void(0)"
              >
                <i className="bx bx-menu bx-sm" />
              </a>
            </div>
            <div
              className="navbar-nav-right d-flex align-items-center"
              id="navbar-collapse"
            >
              {/* Search */}
              <div className="navbar-nav align-items-center">
                <div className="nav-item d-flex align-items-center">
                  <i className="bx bx-search fs-4 lh-0" />
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                  />
                </div>
              </div>
              {/* /Search */}
            </div>
          </nav>
          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Account management</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingAccount &&
                    response &&
                    response.content.map((x) => (
                      <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>
                          <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                          <strong>{x.userFirstName}</strong>
                        </td>
                        <td>
                          <strong>{x.userLastName}</strong>
                        </td>
                        <td>{x.email}</td>
                        <td>{x.phone}</td>
                        <td>{x.address}</td>
                        <td>
                          {x.roleName == "ADMIN" && (
                            <span className="w-full badge bg-primary me-1">
                              {x.roleName}
                            </span>
                          )}
                          {x.roleName == "USER" && (
                            <span className="w-full badge bg-info me-1">
                              {x.roleName}
                            </span>
                          )}
                          {x.roleName == "FACTORY" && (
                            <span className="w-full badge bg-warning me-1">
                              {x.roleName}
                            </span>
                          )}
                        </td>
                        <td>
                          {x.userStatus == "ACTIVE" && (
                            <span className="badge bg-label-primary me-1">
                              {x.userStatus}
                            </span>
                          )}
                        </td>
                        <td>
                          <div>
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? "long-menu" : undefined}
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 5,
                                  width: "10ch",
                                  padding: "0px",
                                  boxShadow: "none",
                                },
                              }}
                            >
                              <MenuItem onClick={handleClose}>
                                <button className="btn btn-light w-full">
                                  Edit
                                </button>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <button className="btn btn-light w-full">
                                  Delete
                                </button>
                              </MenuItem>
                            </Menu>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          {/*/ Table within card */}
          <Stack spacing={2}>
            <Pagination
              shape="circular"
              size="large"
              count={response?.totalPages}
              onChange={handlePageChange}
              color="secondary"
            />
          </Stack>
          <hr className="my-5" />
          {/* Responsive Table */}

          {/*/ Responsive Table */}
        </div>
        {/* / Content */}
        {/* Footer */}
        <footer className="content-footer footer bg-footer-theme">
          <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
            <div className="mb-2 mb-md-0">
              © , made with ❤️ by
              <a
                href="https://themeselection.com"
                className="footer-link fw-bolder"
              >
                ThemeSelection
              </a>
            </div>
            <div>
              <a
                href="https://themeselection.com/license/"
                className="footer-link me-4"
              >
                License
              </a>
              <a
                href="https://themeselection.com/"
                className="footer-link me-4"
              >
                More Themes
              </a>
              <a
                href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                className="footer-link me-4"
              >
                Documentation
              </a>
              <a
                href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                className="footer-link me-4"
              >
                Support
              </a>
            </div>
          </div>
        </footer>
        {/* / Footer */}
        <div className="content-backdrop fade" />
      </div>
      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
      {/* / Layout wrapper */}
    </>
  );
}
ManageAccount.Layout = MainLayout;
