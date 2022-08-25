/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { MainLayout } from "@/components/layouts";
import CreateColorForm from "@/components/manage-color/create-color-form";
import UpdateColorForm from "@/components/manage-color/update-color-form";
import { Filter } from "@/services/accounts";
import { UpdateColorDto } from "@/services/colors/dto/update-colors-dto";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Pagination, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useColors from "hooks/colors/use-colors";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import { useState } from "react";
export interface IManageColor {}

const ITEM_HEIGHT = 48;

export default function ManageColor(props: IManageColor) {
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const defaultValue: UpdateColorDto = {
    id: "",
    name: "",
    imageColor: "",
  };
  const [color, setColor] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilter({ ...filter, pageNumber: value - 1 });
  };
  const { data: response, isLoading: isLoadingColors } = useColors(filter);
  //  menu button

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /*{form add account }*/
  const handleOpenCreate = () => {
    setOpenDialog(true);
  };
  const handleEdit = (id: string) => {
    setColor(id);
  };

  /* {open Dialog} */
  const [openDialog, setOpenDialog] = React.useState(false);
  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h3 className="fw-bold py-3 mb-4">Màu</h3>
          <button
            className="btn btn-success ms-4 mb-4 text-dark fw-bold"
            onClick={() => {
              handleOpenCreate();
              setIsEdit(false);
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Tạo màu mới
          </button>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            {isEdit === true && (
              <DialogTitle className="fs-3 text-center" id="alert-dialog-title">
                Bạn có muốn xóa màu này không
              </DialogTitle>
            )}
            {isEdit !== true && (
              <DialogTitle className="fs-3 text-center" id="alert-dialog-title">
                Tạo màu mới
              </DialogTitle>
            )}

            <DialogContent>
              {isEdit === true ? (
                <>
                  <UpdateColorForm
                    handleCloseDialog={handleCloseDialog}
                    id={color}
                  />
                </>
              ) : (
                <CreateColorForm handleCloseDialog={handleCloseDialog} />
              )}
            </DialogContent>
          </Dialog>

          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Quản lý màu</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Màu</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingColors &&
                    response &&
                    response.content.map((x) => (
                      <tr key={x.id}>
                        <td>
                          <img
                            key={x.imageColor}
                            width={25}
                            height={25}
                            className="rounded-circle border me-1"
                            src={
                              "https://images.printify.com/5853fec7ce46f30f8328200a"
                            }
                            style={{ backgroundColor: x.imageColor }}
                            alt={x.imageColor}
                          />
                          {x.name}
                        </td>
                        <td>
                          <IconButton
                            onClick={() => {
                              handleOpenCreate();
                              handleEdit(x.id);
                              setIsEdit(true);
                            }}
                          >
                            <DeleteIcon fontSize="medium" color="error" />
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
ManageColor.Layout = MainLayout;
