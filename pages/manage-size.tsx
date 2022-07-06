/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { MainLayout } from "@/components/layouts";
import CreateSizeForm from "@/components/manage-size/create-size-form";
import { Filter } from "@/services/accounts";
import { Fab } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { Pagination, Stack } from "@mui/material";
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

  /* {open Dialog} */
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4"></h4>
          <button
            className="btn btn-success ms-4 mb-4 text-dark"
            onClick={handleOpenCreate}
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
              {"Tạo mới kích thước"}
            </DialogTitle>
            <DialogContent>
              <CreateSizeForm handleCloseDialog={handleCloseDialog} />
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>

          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h4 className="card-header">Quản lý Kích thước</h4>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Kích thước</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingSize &&
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
