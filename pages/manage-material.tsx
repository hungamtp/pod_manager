/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { MainLayout } from "@/components/layouts";
import CreateMaterialForm from "@/components/manage-material/create-material-form";
import UpdateMaterialForm from "@/components/manage-material/update-material-form";
import { Filter } from "@/services/accounts";
import { UpdateMaterialDto } from "@/services/material/dto/update-material-dto";
import { UpdateSizeDto } from "@/services/sizes/dto/update-sizes-dto";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Pagination, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useDeleteMaterial from "hooks/material/use-delete-material";
import useMaterial from "hooks/material/use-material";
import * as React from "react";
import { useState } from "react";
export interface IManageMaterial {}

const ITEM_HEIGHT = 48;

export default function ManageMaterial(props: IManageMaterial) {
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const [isEdit, setIsEdit] = useState(false);
  const defaultValue: UpdateSizeDto = {
    id: "",
    name: "",
  };

  const [material, setMaterial] = useState<UpdateSizeDto>(defaultValue);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilter({ ...filter, pageNumber: value - 1 });
  };
  const { data: response, isLoading: isLoadingSize } = useMaterial(filter);
  const { mutate: deleteMaterial } = useDeleteMaterial();
  //  menu button

  const handleDelete = (id: string) => {
    deleteMaterial(id);
    setOpenDeleteDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenDeleteDialog(false);
  };

  /*{form add account }*/
  const handleOpenCreate = () => {
    setOpenDialog(true);
  };
  const handleOpenDelete = (id: string) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleEdit = (material: UpdateMaterialDto) => {
    setMaterial(material);
  };

  /* {open Dialog} */
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h3 className="fw-bold py-3 mb-4">Ch???t li???u ??o</h3>
          <button
            className="btn btn-success ms-4 mb-4 text-dark fw-bold"
            onClick={() => {
              handleOpenCreate();
              setIsEdit(false);
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            T???o m???i ch???t li???u ??o
          </button>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogTitle className="fs-2 text-center" id="alert-dialog-title">
              {isEdit === true
                ? "Ch???nh s???a ch???t li???u ??o"
                : "T???o m???i ch???t li???u ??o"}
            </DialogTitle>
            <DialogContent>
              {isEdit === true ? (
                <UpdateMaterialForm
                  handleCloseDialog={handleCloseDialog}
                  material={material}
                />
              ) : (
                <CreateMaterialForm handleCloseDialog={handleCloseDialog} />
              )}
            </DialogContent>
          </Dialog>

          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogTitle className="fs-3 text-center" id="alert-dialog-title">
              B???n c?? mu???n x??a ch???t li???u n??y kh??ng
            </DialogTitle>
            <DialogContent>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
                    color="primary"
                    type="button"
                    onClick={() => {
                      handleDelete(deleteId);
                    }}
                  >
                    C??
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
                    type="button"
                  >
                    H???y
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Qu???n l?? Ch???t li???u ??o</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Ch???t li???u</th>
                    <th>H??nh ?????ng</th>
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
                          <IconButton>
                            <DeleteIcon
                              onClick={() => {
                                handleOpenDelete(x.id);
                              }}
                              fontSize="medium"
                              color="error"
                            />
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
ManageMaterial.Layout = MainLayout;
