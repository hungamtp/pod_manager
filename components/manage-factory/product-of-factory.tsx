/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { numberWithCommas } from "@/helpers/number-util";
import {
  getFactoryByIdDtos,
  ProductDto,
} from "@/services/factories/dto/get-factory-by-id-dto";
import { UpdatePriceMaterialDto } from "@/services/factories/dto/update-price-material-dto";
import useGetSizesColorsById from "hooks/products/use-get-sizes-colors-by-id";
import * as React from "react";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import CreateSizeColorProductForm from "@/components/manage-factory/create-size-color-product-form";
import UpdateProductPriceForm from "@/components/manage-factory/update-price-material-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
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
import { nanoid } from "@reduxjs/toolkit";
import SizesColorsProduct from "./size-color-product";
import { DialogTitle } from "@material-ui/core";

export interface IProductOfFactoryProps {
  responseFactory: getFactoryByIdDtos;
  id: any;
}

interface Column {
  id:
    | "name"
    | "category"
    | "price"
    | "material"
    | "image"
    | "colorASize"
    | "action";
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
  { id: "action", label: "Cập nhật giá & chất liệu", minWidth: 100 },
];

export default function ProductOfFactory(props: IProductOfFactoryProps) {
  const { responseFactory, id } = props;
  const defaultValues: UpdatePriceMaterialDto = {
    price: 0,
    material: "",
  };
  const [productId, setProductId] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [sizeColors, setSizeColors] =
    React.useState<{ quantity: number; size: string; colorImage: string }[]>();
  const [priceMaterial, setPriceMaterial] =
    React.useState<UpdatePriceMaterialDto>(defaultValues);
  const [openPriceMaterialDialog, setOpenPriceMaterialDialog] =
    React.useState(false);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [productInfo, setProdutInfo] = React.useState<ProductDto>();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { data: responseSizesColorById, isLoading: isLoadingSizeColorById } =
    useGetSizesColorsById(productId);
  React.useEffect(() => {
    productId;
  }, [productId]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenPriceMaterialDialog = (
    productId: string,
    price: number,
    material: string
  ) => {
    const tmpData = {
      price: price,
      material: material,
    };
    setPriceMaterial(tmpData);
    setProductId(productId);
    setOpenPriceMaterialDialog(true);
  };

  const handleOpenCreateSizeColorDialog = (
    index: number,
    productId: string,
    getProduct: ProductDto
  ) => {
    setProdutInfo(getProduct);
    setIndex(index);
    setProductId(productId);
    setOpenCreateDialog(true);
  };
  const handleOpenSizeColorDialog = async (
    data: { quantity: number; size: string; colorImage: string }[]
  ) => {
    await setSizeColors(data);
    setOpenDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCloseUpdatePriceMaterialDialog = () => {
    setOpenPriceMaterialDialog(false);
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
        {/* View size color quantity */}
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

        {!isLoadingSizeColorById && responseSizesColorById && (
          <Dialog
            open={openCreateDialog}
            onClose={handleCloseCreateDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogContent>
              <CreateSizeColorProductForm
                handleCloseDialog={handleCloseCreateDialog}
                factoryId={responseFactory.data.id}
                productId={productId}
                colors={responseSizesColorById.data.colors}
                productInfo={productInfo}
              />
            </DialogContent>
          </Dialog>
        )}

        <Dialog
          open={openPriceMaterialDialog}
          onClose={handleCloseUpdatePriceMaterialDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
        >
          <DialogContent>
            <UpdateProductPriceForm
              factoryId={id as string}
              productId={productId}
              priceMaterial={priceMaterial}
              handleCloseDialog={handleCloseUpdatePriceMaterialDialog}
            />
          </DialogContent>
        </Dialog>
        <div className="table-responsive text-nowrap">
          {responseFactory && responseFactory.data.productDtoList.length > 0 ? (
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
                                    // handleOpenSizeColorDialog(index, row.id)
                                    handleOpenSizeColorDialog(row.sizeColors)
                                  }
                                >
                                  <VisibilityIcon
                                    fontSize="medium"
                                    color="info"
                                  />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    handleOpenCreateSizeColorDialog(
                                      index,
                                      row.id,
                                      row
                                    )
                                  }
                                >
                                  <AddCircleIcon
                                    fontSize="medium"
                                    color="success"
                                  />
                                </IconButton>
                              </TableCell>

                              <TableCell>
                                <IconButton
                                  onClick={() => {
                                    handleOpenPriceMaterialDialog(
                                      row.id,
                                      row.price,
                                      row.material
                                    );
                                  }}
                                >
                                  <EditIcon fontSize="medium" color="primary" />
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
      </>
    </>
  );
}
