/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import { numberWithCommas } from "@/helpers/number-util";
import { addUnitedData } from "@/redux/slices/unitedOrderData";
import { Filter } from "@/services/accounts";
import { OrderFactoryDto } from "@/services/factories/dto/get-all-orders-factory";
import { nanoid } from "@reduxjs/toolkit";
import useOrdersFactory from "hooks/factories/use-orders-factory";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";

export interface IManageOrder {}

const ITEM_HEIGHT = 48;
export interface UnitedData extends OrderFactoryDto {
  orderDetailIdList: string[];
}

interface Column {
  id: "action" | "name" | "price" | "quantity" | "status" | "date";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Tên", minWidth: 170 },
  { id: "price", label: "Giá", minWidth: 170 },
  { id: "quantity", label: "Số lượng", minWidth: 170 },
  { id: "date", label: "Ngày tạo", minWidth: 170 },
  { id: "status", label: "Trạng thái", minWidth: 170 },
  { id: "action", label: "", minWidth: 100 },
];
export default function ManageOrder(props: IManageOrder) {
  const credentialId = useAppSelector((state) => state.auth.userId);
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useAppDispatch();

  const [unitedOrderDetail, setUnitedOrderDetail] = useState<UnitedData[]>();
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: ordersFactoryresponse, isLoading: isLoadingOrdersFactory } =
    useOrdersFactory(credentialId, filter);

  React.useEffect(() => {
    if (ordersFactoryresponse && ordersFactoryresponse.length > 0) {
      const newOrdersContent: UnitedData[] = ordersFactoryresponse.map(
        (orderData) => {
          return { ...orderData, orderDetailIdList: [orderData.id] };
        }
      );
      let newLength = 1;
      if (newOrdersContent.length > 1) {
        let i, j;

        let keep = true;
        let count = 0;
        for (i = 1; i < newOrdersContent.length; i++) {
          for (j = 0; j < newLength; j++) {
            if (
              newOrdersContent[j].designId === newOrdersContent[i].designId &&
              newOrdersContent[j].orderId === newOrdersContent[i].orderId
            ) {
              newOrdersContent[j].quantity =
                newOrdersContent[j].quantity + newOrdersContent[i].quantity;
              newOrdersContent[j].price =
                newOrdersContent[j].price + newOrdersContent[i].price;
              newOrdersContent[j].orderDetailIdList.push(
                newOrdersContent[i].id
              );
              count++;
              break;
            }
          }
          keep = true;
          if (j === newLength) {
            newOrdersContent[newLength++] = newOrdersContent[i];
          }
        }
        if (count === newOrdersContent.length - 1)
          setUnitedOrderDetail([newOrdersContent[0]]);
        else setUnitedOrderDetail(newOrdersContent.slice(0, newLength));
      } else {
        setUnitedOrderDetail(newOrdersContent);
      }
    }

    //nho them else
  }, [ordersFactoryresponse]);

  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h3 className="fw-bold py-3 mb-4">Đơn Hàng</h3>

          <br />
          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            {ordersFactoryresponse && unitedOrderDetail ? (
              <>
                <div className="table-responsive text-nowrap">
                  {unitedOrderDetail.length > 0 ? (
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
                              {unitedOrderDetail
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
                                        <strong>{row.designName}</strong>
                                      </TableCell>

                                      <TableCell>
                                        <strong>
                                          {numberWithCommas(row.price)} VND
                                        </strong>
                                      </TableCell>

                                      <TableCell>
                                        <strong>{row.quantity} sản phẩm</strong>
                                      </TableCell>

                                      <TableCell>
                                        <strong>
                                          {`${new Date(
                                            row.createDate
                                          ).getDate()}-${new Date(
                                            row.createDate
                                          ).getMonth()}-${new Date(
                                            row.createDate
                                          ).getFullYear()}`}
                                        </strong>
                                      </TableCell>

                                      <TableCell>
                                        {row.canceledOrder === false ? (
                                          <td>
                                            {row.status === "PENDING" && (
                                              <span className="badge bg-label-warning me-1">
                                                CHỜ XÁC NHẬN
                                              </span>
                                            )}
                                            {row.status === "PRINTING" && (
                                              <span className="badge bg-label-warning me-1">
                                                CHỜ IN
                                              </span>
                                            )}
                                            {row.status === "PACKAGING" && (
                                              <span className="badge bg-label-warning me-1">
                                                ĐANG ĐÓNG GÓI
                                              </span>
                                            )}
                                            {row.status === "DELIVERING" && (
                                              <span className="badge bg-label-warning me-1">
                                                ĐANG GIAO HÀNG
                                              </span>
                                            )}
                                            {row.status === "DELIVERED" && (
                                              <span className="badge bg-label-warning me-1">
                                                ĐÃ GIAO
                                              </span>
                                            )}
                                            {row.status === "DONE" && (
                                              <span className="badge bg-label-success me-1">
                                                HOÀN THÀNH
                                              </span>
                                            )}
                                            {row.status === "CANCEL" && (
                                              <span className="badge bg-label-danger me-1">
                                                ĐÃ HỦY
                                              </span>
                                            )}
                                          </td>
                                        ) : (
                                          <td>
                                            <span className="badge bg-label-danger me-1">
                                              ĐÃ HỦY
                                            </span>
                                          </td>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        <button
                                          type="button"
                                          className="btn btn-primary btn-sm"
                                          onClick={() => {
                                            dispatch(
                                              addUnitedData({
                                                orderId: row.orderId,
                                                designId: row.designId,
                                                productName: row.productName,
                                                designName: row.designName,
                                                credentialId: credentialId,
                                                orderDetailIdList:
                                                  row.orderDetailIdList,
                                                orderStatus: row.status,
                                              })
                                            );
                                            router.push(
                                              `/factory/order-details-printing`
                                            );
                                          }}
                                        >
                                          Chi tiết
                                        </button>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        {unitedOrderDetail && (
                          <TablePagination
                            rowsPerPageOptions={[5]}
                            count={unitedOrderDetail.length}
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
            ) : (
              <div className="h4 m-0 p-4">Chưa có đơn hàng nào</div>
            )}
          </div>
          <br />
          {/*/ Table within card */}
          <hr className="my-5" />
        </div>

        <div className="content-backdrop fade" />
      </div>

      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
ManageOrder.Layout = MainLayout;
