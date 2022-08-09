/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { MainLayout } from "@/components/layouts";
import CreateCategoryForm from "@/components/manage-category/create-category-form";
import UpdateCategoryForm from "@/components/manage-category/update-category-form";
import { Filter } from "@/services/accounts";
import { UpdateCategoryDto } from "@/services/categories/dto/update-categories-dto";
import { Fab } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Pagination, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useCategories from "hooks/categories/use-categories";
import useDeleteCategory from "hooks/categories/use-delete-categories";
import * as React from "react";
import { useState } from "react";
export interface IManageCategoryProps {}

const ITEM_HEIGHT = 48;

export default function ManageCategory(props: IManageCategoryProps) {
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
  const { data: response, isLoading: isLoadingCategory } =
    useCategories(filter);
  const defaultValues: UpdateCategoryDto = {
    id: "",
    name: "",
    image: "",
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

  const { mutate: deleteCategory, error } = useDeleteCategory();

  const onDelete = (id: string) => {
    deleteCategory(id);
    setOpenDeleteDialog(false);
  };

  /*{form add account }*/

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  /*{form add account }*/
  const handleIsEditTrue = (category: UpdateCategoryDto) => {
    setCategory(category);
    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleIsEditFalse = () => {
    setIsEdit(false);
    setOpenDialog(true);
  };

  const hanldeIsDelete = (x: string) => {
    setIsDelete(x);
    setOpenDeleteDialog(true);
  };

  /* {open Dialog} */
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [category, setCategory] = useState<UpdateCategoryDto>(defaultValues);

  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h3 className="fw-bold py-3 mb-4">Category</h3>
          <button
            className="btn btn-success ms-4 mb-4 text-dark"
            onClick={handleIsEditFalse}
          >
            <AddIcon sx={{ mr: 1 }} />
            Tạo mới Category
          </button>

          {isEdit == false && (
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title">
                {"Tạo mới Category"}
              </DialogTitle>
              <DialogContent>
                <CreateCategoryForm handleCloseDialog={handleCloseDialog} />
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
                {"Chỉnh sửa Category"}
              </DialogTitle>
              <DialogContent>
                <UpdateCategoryForm
                  category={category}
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
              {"Bạn có muốn xóa Category này không?"}
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
                    xóa
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

          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Quản lý Categories</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Hình ảnh</th>
                    <th>isDelete</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingCategory &&
                    response &&
                    response.content.map((x) => (
                      <tr key={x.id}>
                        <td>
                          <strong>{x.name}</strong>
                        </td>
                        <td>
                          <img
                            src={x.image}
                            className="d-block rounded"
                            height={100}
                            width={100}
                          />
                        </td>
                        <td>
                          {x.deleted == true && (
                            <span className="badge bg-label-danger me-1">
                              TRUE
                            </span>
                          )}
                          {x.deleted == false && (
                            <span className="badge bg-label-primary me-1">
                              FALSE
                            </span>
                          )}
                        </td>
                        <td>
                          <div>
                            <IconButton>
                              <EditIcon
                                fontSize="medium"
                                color="primary"
                                onClick={() => {
                                  handleIsEditTrue(x);
                                  handleClose();
                                }}
                              />
                            </IconButton>
                            <IconButton>
                              <DeleteIcon
                                onClick={() => {
                                  hanldeIsDelete(x.id);
                                }}
                                fontSize="medium"
                                color="error"
                              />
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
          {response && response.totalPages > 1 && (
            <Stack spacing={2}>
              <Pagination
                shape="circular"
                size="large"
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
ManageCategory.Layout = MainLayout;
