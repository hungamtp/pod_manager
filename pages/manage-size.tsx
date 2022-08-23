/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { MainLayout } from "@/components/layouts";
import CreateSizeForm from "@/components/manage-size/create-size-form";
import UpdateSizeForm from "@/components/manage-size/update-size-form";
import { Filter } from "@/services/accounts";
import { UpdateSizeDto } from "@/services/sizes/dto/update-sizes-dto";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Pagination, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useSizes from "hooks/sizes/use-sizes";
import * as React from "react";
import { useState } from "react";
export interface IManageSize {}

const ITEM_HEIGHT = 48;

export default function ManageSize(props: IManageSize) {
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const [isEdit, setIsEdit] = useState(false);
  const defaultValue: UpdateSizeDto = {
    id: "",
    name: "",
  };

  const [size, setSize] = useState<UpdateSizeDto>(defaultValue);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilter({ ...filter, pageNumber: value - 1 });
  };
  const { data: response, isLoading: isLoadingSize } = useSizes(filter);
  //  menu button

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /*{form add account }*/
  const handleOpenCreate = () => {
    setOpenDialog(true);
  };

  const handleEdit = (size: UpdateSizeDto) => {
    setSize(size);
  };

  /* {open Dialog} */
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h3 className="fw-bold py-3 mb-4">Kích thước</h3>
          <button
            className="btn btn-success ms-4 mb-4 text-dark"
            onClick={() => {
              handleOpenCreate();
              setIsEdit(false);
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Tạo mới kích thước
          </button>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title">
              {isEdit === true ? "Chỉnh sửa kích thước" : "Tạo mới kích thước"}
            </DialogTitle>
            <DialogContent>
              {isEdit === true ? (
                <UpdateSizeForm
                  handleCloseDialog={handleCloseDialog}
                  size={size}
                />
              ) : (
                <CreateSizeForm handleCloseDialog={handleCloseDialog} />
              )}
            </DialogContent>
          </Dialog>

          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Quản lý Kích thước</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Kích thước</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingSize &&
                    response &&
                    response.content.map((x) => (
                      <tr key={x.id}>
                        <td>{x.name}</td>
                        <td>
                          <IconButton
                            onClick={() => {
                              handleOpenCreate();
                              handleEdit(x);
                              setIsEdit(true);
                            }}
                          >
                            <EditIcon fontSize="medium" color="primary" />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          {/*/ Table within card */}
          {response && response.totalPages > 1 && (
            <Stack spacing={2}>
              <Pagination
                shape="circular"
                size="large"
                page={filter.pageNumber + 1}
                count={response?.totalPages}
                onChange={handlePageChange}
                color="secondary"
              />
            </Stack>
          )}
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
ManageSize.Layout = MainLayout;
