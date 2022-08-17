/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import useGetFactoryById from "hooks/factories/use-get-factory-by-id";
import * as React from "react";
import * as yup from "yup";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { useAppSelector } from "@/components/hooks/reduxHook";
import SizesColorsProduct from "@/components/manage-factory/size-color-product";
import { numberWithCommas } from "@/helpers/number-util";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { nanoid } from "@reduxjs/toolkit";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { Filter } from "@/services/factories";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
export interface AccountSettingProps {}

interface Column {
  id: "name" | "category" | "price" | "material" | "image" | "colorASize";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Tên", minWidth: 170 },
  { id: "category", label: "Thể loại", minWidth: 170 },
  { id: "price", label: "Giá", minWidth: 170 },
  { id: "material", label: "Chất liệu", minWidth: 170 },
  { id: "image", label: "Hình sản phẩm", minWidth: 170 },
  { id: "colorASize", label: "Màu & Kích thước", minWidth: 170 },
];

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(1, " Tên cần ít nhất 1 kí tự")
    .max(26, " Tên tối đa 50 kí tự")
    .required(" Tên không được để trống"),
});

export default function AccountSetting(props: AccountSettingProps) {
  const credentialId = useAppSelector((state) => state.auth.userId);
  const [index, setIndex] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [filter, setFilter] = React.useState<Filter>({
    search: "",
  });
  const [sizeColors, setSizeColors] =
    React.useState<{ quantity: number; size: string; colorImage: string }[]>();
  const { data: responseFactory, isLoading: isLoadingFactory } =
    useGetFactoryById(credentialId, filter);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleOpenSizeColorDialog = (
    data: { quantity: number; size: string; colorImage: string }[]
  ) => {
    setSizeColors(data);
    setOpenDialog(true);
  };
  React.useEffect(() => {
    responseFactory?.data;
  }, [responseFactory]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogContent>
          <SizesColorsProduct data={sizeColors} />
        </DialogContent>
      </Dialog>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4"></h4>
          <div className="card-body">
            <div className="d-flex align-items-start align-items-sm-center gap-4">
              <img
                src={responseFactory?.data.image}
                alt="user-avatar"
                className="d-block rounded"
                height={100}
                width={100}
                id="uploadedAvatar"
              />
              <div className="button-wrapper">
                <h2>{responseFactory?.data.name}</h2>
                <p className="text-muted mb-0"></p>
              </div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="row">
            <div className="col-md-12">
              {!isLoadingFactory && responseFactory && (
                <div className="card mb-4">
                  <h4 className="card-header">Thông tin chi tiết</h4>
                  {/* Account */}

                  <div className="card-body">
                    <form id="formAccountSettings">
                      <div className="card-body">
                        <div className="d-flex align-items-start align-items-sm-center gap-4"></div>
                      </div>
                      <hr className="my-0" />
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">ID</label>
                          <input
                            disabled
                            className="form-control"
                            type="text"
                            id="ID"
                            name="ID"
                            defaultValue={responseFactory.data.id}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Tên</label>

                          <input
                            className="form-control"
                            type="text"
                            disabled
                            id="Name"
                            defaultValue={responseFactory.data.name}
                          />
                        </div>

                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            email
                          </label>
                          <input
                            disabled
                            className="form-control"
                            defaultValue={responseFactory.data.email}
                          />
                        </div>

                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Địa chỉ
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            disabled
                            rows={3}
                            defaultValue={responseFactory.data.location}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Số điện thoại
                          </label>
                          <input
                            disabled
                            className="form-control"
                            defaultValue={responseFactory.data.phone}
                          />
                        </div>
                        <div className="mb-3 col-md-1">
                          <label className="form-label ">Chiết khấu</label>
                          <div className="position-relative mt-3">
                            <input
                              disabled
                              className="form-control position-absolute top-50 start-50 translate-middle "
                              defaultValue={responseFactory.data.tradeDiscount}
                            />
                            <p className="position-absolute top-50 end-0 translate-middle-y pe-3">
                              %
                            </p>
                          </div>
                        </div>
                        {/* Small table */}

                        <hr className="my-5" />
                      </div>
                    </form>
                  </div>
                  {/* /Account */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* / Content */}

        <div className="content-backdrop fade" />
      </div>
      {/* Content wrapper */}

      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                {/* Account */}
                <h4 className="card-header">
                  Sản phẩm của nhà in đang sản xuất
                </h4>
                <hr className="my-0" />
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
                    {/* Search */}
                    <div className="nav-item d-flex align-items-center w-full">
                      <i className="bx bx-search fs-4 lh-0" />
                      <form
                        onSubmit={(e: any) => {
                          e.preventDefault();
                          setFilter((state) => ({
                            ...state,
                            search: e.target[0].value,
                          }));
                        }}
                        className="form-control border-0 shadow-none w-full"
                      >
                        <input
                          type="text"
                          className="form-control border-0  shadow-none w-full"
                          placeholder="Tên sản phẩm..."
                          aria-label="Search..."
                        />
                      </form>
                    </div>
                    {/* /Search */}
                  </div>
                </nav>
                <br />
                <div className="card">
                  <div className="table-responsive text-nowrap">
                    {!isLoadingFactory &&
                    responseFactory &&
                    responseFactory.data.productDtoList.length > 0 ? (
                      <>
                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                          <TableContainer sx={{}}>
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead>
                                <TableRow>
                                  {columns.map((column) => (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{ minWidth: column.minWidth }}
                                    >
                                      {column.label}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {responseFactory?.data.productDtoList
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((row, index) => {
                                    return (
                                      <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={nanoid()}
                                      >
                                        <TableCell>
                                          <strong>{row.name}</strong>
                                        </TableCell>

                                        <TableCell>
                                          <strong>{row.categoryName}</strong>
                                        </TableCell>

                                        <TableCell>
                                          <strong>
                                            {numberWithCommas(row.price)} VND
                                          </strong>
                                        </TableCell>

                                        <TableCell>
                                          <strong>{row.material}</strong>
                                        </TableCell>
                                        <TableCell>
                                          <img
                                            src={row.productImages[0].image}
                                            width="80"
                                            height="80"
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <IconButton
                                            onClick={() =>
                                              handleOpenSizeColorDialog(
                                                row.sizeColors
                                              )
                                            }
                                          >
                                            <VisibilityIcon
                                              fontSize="medium"
                                              color="info"
                                            />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          {responseFactory && (
                            <TablePagination
                              rowsPerPageOptions={[5]}
                              count={responseFactory.data.productDtoList.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                          )}
                        </Paper>
                      </>
                    ) : (
                      <div className="h3 text-center p-3">
                        Nhà in này hiện chưa có sản phẩm nào
                      </div>
                    )}
                  </div>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>

        {/* / Content */}

        <div className="content-backdrop fade" />
      </div>
    </>
  );
}
AccountSetting.Layout = MainLayout;
