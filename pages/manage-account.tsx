/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { MainLayout } from "@/components/layouts";
import CreateForm from "@/components/manage-account/create-form";
import UpdateForm from "@/components/manage-account/update-form";
import { Filter } from "@/services/accounts";
import { AccountDto } from "@/services/accounts/dto/get-all-accounts-dto";
import { UpdateAccountDto } from "@/services/accounts/dto/update-accounts-dto";
import { Fab } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Pagination, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useAccounts from "hooks/accounts/use-accounts";
import useDeleteAccount from "hooks/accounts/use-delete-accounts";
import * as React from "react";
import { useState } from "react";
export interface IManageAccountProps {}

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
  const defaultValues: UpdateAccountDto = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    roleName: "",
  };
  //  menu button

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: deleteAccount, error } = useDeleteAccount();

  const onDelete = (id: number) => {
    deleteAccount(id);
  };

  /*{form add account }*/

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /*{form add account }*/
  const handleIsEditTrue = (user: AccountDto) => {
    console.log(user, "userrrrrr");
    const tmpAcc = {
      id: user.id,
      firstName: user.userFirstName,
      lastName: user.userLastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      roleName: user.roleName,
    };
    setAccount(tmpAcc);
    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleIsEditFalse = () => {
    setIsEdit(false);
    setOpenDialog(true);
  };

  /* {open Dialog} */
  const [isEdit, setIsEdit] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [account, setAccount] = useState<UpdateAccountDto>(defaultValues);

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
            onClick={handleIsEditFalse}
          >
            <AddIcon sx={{ mr: 1 }} />
            Create New Account
          </Fab>

          <hr className="my-4" />
          {isEdit == false && (
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
                <CreateForm handleCloseDialog={handleCloseDialog} />
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          )}
          {isEdit == true && (
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title">
                {"Update Account"}
              </DialogTitle>
              <DialogContent>
                <UpdateForm
                  account={account}
                  handleCloseDialog={handleCloseDialog}
                />
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          )}
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
                    <th>Last Name</th>
                    <th>First Name</th>
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
                          <strong>{x.userLastName}</strong>
                        </td>
                        <td>
                          <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                          <strong>{x.userFirstName}</strong>
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
                          {x.userStatus == "INACTIVE" && (
                            <span className="badge bg-label-danger me-1">
                              {x.userStatus}
                            </span>
                          )}
                        </td>
                        <td>
                          <div>
                            <IconButton
                              onClick={() => {
                                handleIsEditTrue(x);
                                handleClose();
                              }}
                            >
                              <EditIcon fontSize="medium" color="primary" />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                onDelete(x.id);
                              }}
                            >
                              <DeleteIcon fontSize="medium" color="error" />
                            </IconButton>
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
