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
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useAccounts from "hooks/accounts/use-accounts";
import useDeleteAccount from "hooks/accounts/use-delete-accounts";
import * as React from "react";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { string } from "yup/lib/locale";

export interface IManageAccountProps {}

const ITEM_HEIGHT = 48;

export default function ManageAccount(props: IManageAccountProps) {
  const [filter, setFilter] = useState<Filter>({
    searchCriteria: "All",
    searchValues: "",
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
    id: "",
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

  const onDelete = (id: string) => {
    deleteAccount(id);
    setOpenDeleteDialog(false);
  };

  const hanldeIsDelete = (x: string) => {
    setIsDelete(x);
    setOpenDeleteDialog(true);
  };

  /*{form add account }*/

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /*{form add account }*/
  const handleIsEditTrue = (user: AccountDto) => {
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
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleSearchChange = (event: SelectChangeEvent) => {
    setSearchCriteria(event.target.value);
    console.log(event.target.value);
    setFilter((state) => ({ ...state, searchCriteria: event.target.value }));
  };

  /* {open Dialog} */
  const [searchCriteria, setSearchCriteria] = React.useState("All");
  const [isEdit, setIsEdit] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [account, setAccount] = useState<UpdateAccountDto>(defaultValues);
  const [isDelete, setIsDelete] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4"></h4>
          <button
            className="btn btn-success ms-4 text-dark"
            onClick={handleIsEditFalse}
          >
            <AddIcon sx={{ mr: 1 }} />
            Tạo mới tài khoản
          </button>

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
                {"Tạo mới tài khoản"}
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
          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title">
              {"Bạn có muốn xóa tài khoản này không?"}
            </DialogTitle>
            <DialogContent>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-danger"
                    color="danger"
                    onClick={() => {
                      onDelete(isDelete);
                    }}
                  >
                    Xóa
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDeleteDialog}
                    autoFocus
                  >
                    Hủy
                  </button>
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
              <a className="nav-item nav-link px-0 me-xl-4">
                <i className="bx bx-menu bx-sm" />
              </a>
            </div>
            <div
              className="navbar-nav-right d-flex align-items-center"
              id="navbar-collapse"
            >
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={searchCriteria}
                  label="Role"
                  onChange={handleSearchChange}
                  inputProps={{
                    disableUnderline: true,
                  }}
                  variant="standard"
                >
                  <MenuItem className="d-flex flex-column" value="All">
                    Tất cả
                  </MenuItem>
                  {/* <MenuItem className="d-flex flex-column" value="ID">
                    ID
                  </MenuItem> */}
                  <MenuItem className="d-flex flex-column" value="EMAIL">
                    Email
                  </MenuItem>
                  <MenuItem className="d-flex flex-column" value="RoleName">
                    Vị trí
                  </MenuItem>
                </Select>
              </FormControl>
              {/* Search */}
              <div className="nav-item d-flex align-items-center w-full">
                <i className="bx bx-search fs-4 lh-0" />
                <form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    setFilter((state) => ({
                      ...state,
                      searchValues: e.target[0].value,
                    }));
                  }}
                >
                  <input
                    type="text"
                    className="form-control border-0  shadow-none w-full"
                    placeholder="Search..."
                    aria-label="Search..."
                  />
                </form>
              </div>
              {/* /Search */}
            </div>
          </nav>
          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Quản lý tài khoản</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Họ</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Vị trí</th>
                    <th>Trạng thái</th>
                    <th>hành động</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingAccount &&
                    response &&
                    response.content.map((x) => (
                      <tr key={x.id}>
                        <td>
                          <strong>{x.userLastName}</strong>
                        </td>
                        <td>
                          <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                          <strong>{x.userFirstName}</strong>
                        </td>

                        <td>{x.email}</td>
                        <td>{x.phone}</td>
                        <td
                          style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                          }}
                        >
                          {x.address}
                        </td>
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
                          {x.userStatus == "ACTIVE" && (
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
                                  hanldeIsDelete(x.id);
                                }}
                              >
                                <DeleteIcon fontSize="medium" color="error" />
                              </IconButton>
                            </div>
                          )}
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
