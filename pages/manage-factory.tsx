/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { MainLayout } from "@/components/layouts";
import CreateFactoryForm from "@/components/manage-factory/create-factory-form";
import { Filter } from "@/services/accounts";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fab, IconButton, Pagination, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useDeleteFactory from "hooks/factories/use-delete-factory-account";
import useFactories from "hooks/factories/use-factories";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
export interface IManageFactory {}

export default function ManageFactory(props: IManageFactory) {
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
  const { data: response, isLoading: isLoadingAccount } = useFactories(filter);
  const { mutate: deleteFactory, error } = useDeleteFactory();

  // const { mutate: deleteAccount, error } = useDeleteAccount();

  // const onDelete = (id: string) => {
  //   deleteAccount(id);
  //   setOpenDeleteDialog(false);
  // };
  const onDelete = (id: string) => {
    deleteFactory(id);
    setOpenDeleteDialog(false);
  };
  const hanldeIsDelete = (x: string) => {
    setIsDelete(x);
    setOpenDeleteDialog(true);
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  /* {open Dialog} */
  const router = useRouter();
  const [isDelete, setIsDelete] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

  return (
    <>
      <div>
        {/* Layout wrapper */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn có muốn ngừng hợp tác với nhà máy này không?"}
          </DialogTitle>
          <DialogContent>
            <div className="d-flex justify-content-center">
              <div className="col-sm-10 d-flex justify-content-around">
                <button
                  className="btn btn-danger"
                  color="danger"
                  onClick={() => {
                    // onDelete(isDelete);
                  }}
                >
                  Ngừng
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
        <Dialog
          open={openCreateDialog}
          onClose={handleCloseCreateDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">{"Tạo mới nhà máy"}</DialogTitle>
          <DialogContent>
            <CreateFactoryForm handleCloseDialog={handleCloseCreateDialog} />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn có muốn ngừng hợp tác với nhà máy này không?"}
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
                  Có
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseDeleteDialog}
                  autoFocus
                >
                  Không
                </button>
              </div>
            </div>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4"></h4>
          <button
            className="btn btn-success ms-4 text-dark"
            onClick={handleOpenCreateDialog}
          >
            <AddIcon sx={{ mr: 1 }} />
            Tạo Mới Nhà Máy
          </button>
          <hr className="my-4" />
          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Quản lý Nhà Máy</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th>Hành Động</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingAccount &&
                    response &&
                    response.content.map((x) => (
                      <tr key={x.id}>
                        <td>
                          <strong>{x.name}</strong>
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
                          {x.collaborating == true && (
                            <span className="badge bg-label-info me-1">
                              TRUE
                            </span>
                          )}
                          {x.collaborating == false && (
                            <span className="badge bg-label-danger me-1">
                              FALSE
                            </span>
                          )}
                        </td>

                        <td>
                          {x.collaborating == true && (
                            <div>
                              <IconButton
                                onClick={() => {
                                  {
                                    hanldeIsDelete(x.id);
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="medium" color="error" />
                              </IconButton>
                            </div>
                          )}
                        </td>
                        <td>
                          {x.collaborating == true && (
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  router.push(
                                    `/factory-details?id=${x.credentialId}&factoryid=${x.id}`
                                  );
                                }}
                              >
                                Chi tiết
                              </button>
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
ManageFactory.Layout = MainLayout;
