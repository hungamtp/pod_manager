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
import useColors from "hooks/colors/use-colors";
import useFactories from "hooks/factories/use-factories";
import useSizes from "hooks/sizes/use-sizes";
import * as React from "react";
import { useState } from "react";
export interface IManageColor {}

const ITEM_HEIGHT = 48;

export default function ManageColor(props: IManageColor) {
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
  const { data: response, isLoading: isLoadingAccount } = useColors(filter);
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
    setOpenDeleteDialog(false);
  };

  const hanldeIsDelete = (x: number) => {
    setIsDelete(x);
    setOpenDeleteDialog(true);
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
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  /* {open Dialog} */
  const [isEdit, setIsEdit] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [account, setAccount] = useState<UpdateAccountDto>(defaultValues);
  const [isDelete, setIsDelete] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

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
            Create New Factory
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
                {"Create New Factory"}
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
              {"Bạn có muốn delete category này không?"}
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
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDeleteDialog}
                    autoFocus
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>

          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Factory management</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingAccount &&
                    response &&
                    response.content.map((x) => (
                      <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
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
ManageColor.Layout = MainLayout;
