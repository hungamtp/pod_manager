import { getFactoryByIdDtos } from "@/services/factories/dto/get-factory-by-id-dto";
import useGetProductForFactory from "hooks/factories/use-get-product-for-factory";
import * as React from "react";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import CreateProductPriceForm from "@/components/manage-factory/create-product-price-form";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Filter } from "@/services/factories";
export interface IProductNotSupportProps {
  responseFactory: getFactoryByIdDtos;
  factoryId: any;
}

interface Column {
  id: "name" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Tên", minWidth: 170 },
  { id: "action", label: "Thêm giá và chất liệu sản phẩm", minWidth: 100 },
];

export default function ProductNotSupport(props: IProductNotSupportProps) {
  const { responseFactory, factoryId } = props;
  const [filter, setFilter] = React.useState<Filter>({
    search: "",
  });
  const [index, setIndex] = React.useState(0);
  const [productId, setProductId] = React.useState("");
  const [productForFactoryId, setProductForFactoryId] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openCreatePriceDialog, setOpenCreatePriceDialog] =
    React.useState(false);
  const { data: responseProductForFactory, isLoading: isLoadingProForFactory } =
    useGetProductForFactory(factoryId as string, filter);

  const handleCloseCreatePriceDialog = () => {
    setOpenCreatePriceDialog(false);
  };

  const handleOpenCreatePriceDialog = (index: number, productId: string) => {
    setIndex(index);
    setProductForFactoryId(productId);
    setProductId(productId);
    setOpenCreatePriceDialog(true);
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
      <>
        {responseFactory && (
          <>
            {/* add price */}
            <Dialog
              open={openCreatePriceDialog}
              onClose={handleCloseCreatePriceDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
            >
              <DialogContent>
                <CreateProductPriceForm
                  handleCloseDialog={handleCloseCreatePriceDialog}
                  factoryId={responseFactory?.data.id}
                  productId={productForFactoryId}
                />
              </DialogContent>
            </Dialog>
            {/* update price material  */}
          </>
        )}
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
                  placeholder="Search..."
                  aria-label="Search..."
                />
              </form>
            </div>
            {/* /Search */}
          </div>
        </nav>
        <br />
        <div className="table-responsive text-nowrap">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                  {!isLoadingProForFactory &&
                    responseProductForFactory &&
                    responseProductForFactory.data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            <TableCell>
                              <strong>{row.name}</strong>
                            </TableCell>
                            <TableCell>
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenCreatePriceDialog(index, row.id)
                                }
                                className="btn btn-primary me-2"
                              >
                                Thêm giá và Chất liệu sản phẩm
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            {responseProductForFactory && (
              <TablePagination
                rowsPerPageOptions={[5]}
                count={responseProductForFactory.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Paper>
        </div>
      </>
    </>
  );
}
