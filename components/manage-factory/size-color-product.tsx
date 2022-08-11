import { numberWithCommas } from "@/helpers/number-util";
import { nanoid } from "@reduxjs/toolkit";
import useGetFactoryById from "hooks/factories/use-get-factory-by-id";
import * as React from "react";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
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
export interface ISizesColorsProductProps {
  index: number;
  factoryId: string;
}

interface Column {
  id: "color" | "size" | "quantity";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "color", label: "Màu", minWidth: 170 },
  { id: "size", label: "Kích thước", minWidth: 100 },
  { id: "quantity", label: "Số lượng sản phẩm", minWidth: 100 },
];

export default function SizesColorsProduct(props: ISizesColorsProductProps) {
  const { index, factoryId } = props;
  const { data: responseFactory, isLoading: isLoadingFactory } =
    useGetFactoryById(factoryId);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
      <div className="card">
        <h5 className="card-header">Bảng Thông tin</h5>
        <div className="table-responsive text-nowrap">
          {!isLoadingFactory &&
          responseFactory &&
          responseFactory.data.productDtoList[index].sizeColors.length > 0 ? (
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
                      {responseFactory.data.productDtoList[index].sizeColors
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
                              key={nanoid()}
                            >
                              <TableCell>
                                <strong>{row.colorImage}</strong>
                              </TableCell>

                              <TableCell>
                                <strong>{row.size}</strong>
                              </TableCell>

                              <TableCell>
                                <strong>{row.quantity}</strong>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10]}
                  count={
                    responseFactory.data.productDtoList[index].sizeColors.length
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </>
          ) : (
            <div className="h4 text-center p-3">
              Sản phẩm này tạm thời chưa có dữ liệu
            </div>
          )}
        </div>
      </div>
    </>
  );
}
