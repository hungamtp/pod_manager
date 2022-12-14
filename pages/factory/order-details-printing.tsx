/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import * as React from "react";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import CancelOrderStatus from "@/components/manage-factory/cancel-order-status";
import ConfirmOrderStatus from "@/components/manage-factory/confirm-order-status";
import ViewOrder from "@/components/manage-factory/view-order";
import {
  clearData,
  setOrderStatus as setOrderStatusRedux,
} from "@/redux/slices/unitedOrderData";
import { DialogTitle, StepLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { nanoid } from "@reduxjs/toolkit";
import useGetOrderDetails from "hooks/factories/use-get-order-details";
import useGetSizeProductByProductId from "hooks/products/use-get-product-size-by-productId";
import useGetProductById from "hooks/products/use-get-products-by-id";
import { useRouter } from "next/router";
import EastIcon from "@mui/icons-material/East";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { SupportOrderDetail } from "@/services/factories/dto/get-orders-detail-dto";
import { numberWithCommas } from "@/helpers/number-util";
import Image from "next/image";
import { dateFormat } from "@/helpers/date-utils";
export interface OrderDetailsProps {}

const steps = [
  "Ch??? x??c nh???n",
  "??ang x??? l??",
  "??ang ????ng g??i",
  "??ang giao h??ng",
  "???? giao",
  "Ho??n th??nh",
];
const englishSteps = [
  "PENDING",
  "PRINTING",
  "PACKAGING",
  "DELIVERING",
  "DELIVERED",
  "DONE",
];

interface Column {
  id: "size" | "name" | "color" | "quantity" | "status" | "date" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "size", label: "Size", minWidth: 170 },
  { id: "color", label: "M??u", minWidth: 170 },
  { id: "quantity", label: "S??? l?????ng", minWidth: 170 },
  { id: "date", label: "Ng??y t???o", minWidth: 170 },
  { id: "status", label: "Tr???ng th??i", minWidth: 170 },
];

export default function OrderDetails(props: OrderDetailsProps) {
  const dispatch = useAppDispatch();

  const [activeStep, setActiveStep] = React.useState(0);
  const [renderedColorList, setRenderedColorList] = React.useState<string[]>(
    []
  );
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [sizeList, setSizeList] = React.useState<
    {
      size: string;
      colorsData: { color: string; quantity: number; colorImage: string }[];
    }[]
  >([]);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!url.includes("factory/order-details-printing")) {
        dispatch(clearData());
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const [isCancel, setIsCancel] = React.useState(false);
  const router = useRouter();

  const {
    orderId,
    designId,
    credentialId,
    designName,
    designPrice,
    orderStatus: statusOfOrder,
  } = useAppSelector((state) => state.unitedData);

  const { data: responseOrderDetails } = useGetOrderDetails(
    orderId as string,
    designId as string,
    credentialId as string
  );
  const [orderDetailsList, setOrderDetailsList] =
    useState<SupportOrderDetail[]>();
  React.useEffect(() => {
    if (responseOrderDetails) {
      setOrderDetailsList(responseOrderDetails.data.orderDetailsSupportDtos);
      setRenderColor(
        responseOrderDetails.data.orderDetailsSupportDtos[0].colorImage
      );
    }
  }, [responseOrderDetails]);
  // console.log(orderDetailIdList, "orderDetailIdList");

  const [orderStatus, setOrderStatus] = React.useState("PENDING");
  const { data: sizeProductResponse, isLoading: isLoadingSizeProductResponse } =
    useGetSizeProductByProductId(responseOrderDetails?.data.productId || "");

  const { data: productResponse, isLoading: isLoadingProductResponse } =
    useGetProductById(responseOrderDetails?.data.productId || "");
  const [renderColor, setRenderColor] = React.useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [selectedOrderDetailId, setSelectedOrderDetailId] =
    React.useState<string>("");
  const [isShowCancelReason, setIsShowCancelReason] = React.useState(false);

  const [isCancelByFactory, setIsCancelByFactory] = useState(false);
  const [cancelReasonByFactory, setCancelReasonByFactory] = useState("");

  // React.useEffect(() => {
  //   if (responseOrderDetails) {
  //     const colorList = responseOrderDetails.data.orderDetailsSupportDtos.map(
  //       (data) => data.color
  //     );
  //     let loopColorList: string[] = [];

  //     if (colorList.length > 1) {
  //       let newLength = 1;
  //       let i;
  //       let j;
  //       let count = 0;
  //       for (i = 1; i < colorList.length; i++) {
  //         for (j = 0; j < newLength; j++) {
  //           if (colorList[i] === colorList[j]) {
  //             count++;
  //             break;
  //           }
  //         }
  //         if (newLength === j) {
  //           colorList[newLength++] = colorList[i];
  //         }
  //       }
  //       if (count === colorList.length - 1) {
  //         loopColorList = [colorList[0]];
  //         setRenderedColorList([colorList[0]]);
  //       } else {
  //         loopColorList = colorList.slice(0, newLength);
  //         setRenderedColorList(colorList.slice(0, newLength));
  //       }
  //     } else {
  //       loopColorList = colorList;
  //       setRenderedColorList(colorList);
  //     }

  //     const sizeList: {
  //       size: string;
  //       colorsData: { color: string; quantity: number; colorImage: string }[];
  //     }[] = [];
  //     responseOrderDetails.data.orderDetailsSupportDtos.forEach((data) => {
  //       const tmpSizeData: {
  //         size: string;
  //         colorsData: { color: string; quantity: number; colorImage: string }[];
  //       } = { size: data.size, colorsData: [] };

  //       loopColorList.forEach((color) => {
  //         if (color === data.color) {
  //           tmpSizeData.colorsData.push({
  //             color: color,
  //             quantity: data.quantity,
  //             colorImage: data.colorImage,
  //           });
  //         } else {
  //           tmpSizeData.colorsData.push({
  //             color: color,
  //             quantity: 0,
  //             colorImage: data.colorImage,
  //           });
  //         }
  //       });
  //       sizeList.push(tmpSizeData);
  //     });

  //     if (sizeList.length > 1) {
  //       let newLength = 1;
  //       let i: number;
  //       let j: number;
  //       let count = 0;
  //       for (i = 1; i < sizeList.length; i++) {
  //         for (j = 0; j < newLength; j++) {
  //           if (sizeList[i].size === sizeList[j].size) {
  //             sizeList[j].colorsData.forEach((colorData) => {
  //               sizeList[i].colorsData.forEach((element) => {
  //                 if (
  //                   element.quantity !== 0 &&
  //                   colorData.color === element.color
  //                 ) {
  //                   colorData.quantity = element.quantity;
  //                 }
  //               });
  //             });
  //             count++;
  //             break;
  //           }
  //         }
  //         if (newLength === j) {
  //           sizeList[newLength++] = sizeList[i];
  //         }
  //       }
  //       if (count === sizeList.length - 1) {
  //         setSizeList([sizeList[0]]);
  //       } else {
  //         setSizeList(sizeList.slice(0, newLength));
  //       }
  //     } else {
  //       setSizeList(sizeList);
  //     }
  //   }
  // }, [responseOrderDetails]);

  const [renderPedingOrderDetailList, setRenderPendingOrderDetailList] =
    React.useState<SupportOrderDetail[]>([]);
  const [renderCanceledOrderDetailList, setRenderCanceledOrderDetailList] =
    React.useState<SupportOrderDetail[]>([]);

  React.useEffect(() => {
    if (orderDetailsList) {
      const pendingList: SupportOrderDetail[] = [];
      const canceledList: SupportOrderDetail[] = [];
      orderDetailsList.forEach((orderDetail) => {
        if (
          orderDetail.status === "CANCEL" ||
          orderDetail.status === "IS_CANCEL"
        ) {
          canceledList.push(orderDetail);
          if (orderDetail.reasonByFactory) {
            setIsCancelByFactory(true);
            setCancelReasonByFactory(orderDetail.reasonByFactory);
          }
        } else pendingList.push(orderDetail);
      });
      setRenderPendingOrderDetailList(pendingList);

      setRenderCanceledOrderDetailList(canceledList);
    }
  }, [orderDetailsList]);

  const [isViewOrder, setIsViewOrder] = React.useState(false);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 2;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  let tmpOrderStatusData = "";

  const handleGetStatus = () => {
    if (steps[activeStep] === "Ch??? x??c nh???n") {
      tmpOrderStatusData = "PENDING";
    } else if (steps[activeStep] === "??ang x??? l??") {
      tmpOrderStatusData = "PRINTING";
    } else if (steps[activeStep] === "??ang ????ng g??i") {
      tmpOrderStatusData = "PACKAGING";
    } else if (steps[activeStep] === "??ang giao h??ng") {
      tmpOrderStatusData = "DELIVERING";
    } else if (steps[activeStep] === "???? giao") {
      tmpOrderStatusData = "DELIVERED";
    } else if (steps[activeStep] === "Ho??n th??nh") {
      tmpOrderStatusData = "DONE";
    }
    setOrderStatus(tmpOrderStatusData);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const [stepIndex, setStepIndex] = React.useState(0);

  React.useEffect(() => {
    if (statusOfOrder) {
      let newStatusList = {};
      const BreakError = {};
      try {
        englishSteps.forEach((step, index) => {
          newStatusList = { ...newStatusList, [index]: true };
          if (step === statusOfOrder) {
            setStepIndex(index);
            throw BreakError;
          } else if (statusOfOrder === "CANCEL") {
            if (step === responseOrderDetails?.data.statuses[1]) {
              setStepIndex(index);
              setIsCancel(true);
              throw BreakError;
            }
          }
        });
      } catch (error) {
        if (error !== BreakError) throw error;
      }
      if (statusOfOrder !== "CANCEL") {
        setActiveStep(stepIndex + 1);
      } else {
        setActiveStep(stepIndex);
      }
      setCompleted(newStatusList);
    }
  }, [responseOrderDetails, statusOfOrder]);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const [openOrderDialog, setOpenOrderDialog] = React.useState(false);

  const handleClickOpenOrderDialog = () => {
    setOpenOrderDialog(true);
  };

  const handleCloseOrderDialog = () => {
    setOpenOrderDialog(false);
  };

  return (
    <>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">Chi ti???t ????n h??ng</h4>
          <div className="card-body"></div>
          <hr className="my-0" />
          <div className="row">
            {responseOrderDetails ? (
              <div className="col-md-12">
                {isViewOrder && responseOrderDetails && sizeProductResponse ? (
                  <>
                    <ViewOrder
                      setIsViewOrder={setIsViewOrder}
                      responseOrderDetails={responseOrderDetails}
                      sizeProductResponse={sizeProductResponse}
                      renderColor={renderColor}
                    />
                  </>
                ) : (
                  <div className="card mb-4">
                    <div className="d-flex justify-content-between p-4">
                      <button
                        className="btn btn-secondary pe-4 ps-4"
                        onClick={() => router.back()}
                      >
                        Tr??? v???
                      </button>
                      <button
                        className="btn btn-primary p-2"
                        onClick={() => setIsViewOrder(true)}
                      >
                        H?????ng d???n in
                      </button>
                    </div>
                    <hr className="my-0" />
                    {/* Account */}

                    <div className="card-body">
                      <form id="formAccountSettings">
                        <div className="row">
                          <div className="mb-3 mx-5 col-md-5 card text-dark">
                            <div className="d-flex card-header bg-light px-1">
                              <h5 className="my-auto text-start">
                                Th??ng tin kh??ch h??ng
                              </h5>
                            </div>
                            <div className="row">
                              <div className=" border-top px-3 py-2 w-50">
                                T??n kh??ch h??ng
                              </div>
                              <div className=" border-top border-start px-3 py-2 w-50">
                                {responseOrderDetails.data.customerName}
                              </div>
                            </div>
                            <div className="row">
                              <div className=" border-top px-3 py-2 w-50">
                                Email
                              </div>
                              <div className=" border-top border-start px-3 py-2 w-50">
                                {responseOrderDetails.data.email}
                              </div>
                            </div>
                            <div className="row">
                              <div className=" border-top px-3 py-2 w-50">
                                S??? ??i???n tho???i
                              </div>
                              <div className=" border-top border-start px-3 py-2 w-50">
                                {responseOrderDetails.data.phoneNumber}
                              </div>
                            </div>
                            <div className="row">
                              <div className=" border-top px-3 py-2 w-50">
                                ?????a ch??? nh???n h??ng
                              </div>
                              <div className=" border-top border-start px-3 py-2 w-50">
                                {responseOrderDetails.data.address}
                              </div>
                            </div>
                          </div>

                          <div className="mb-3 ms-5 col-md-5 card text-dark">
                            {productResponse && (
                              <div className="">
                                <div className="d-flex card-header bg-light px-1">
                                  <h5 className="my-auto text-start">
                                    Th??ng tin s???n ph???m
                                  </h5>
                                </div>
                                <div className="row ">
                                  <div className=" border-top px-3 py-2 w-50">
                                    M?? s???n ph???m
                                  </div>
                                  <div className=" border-top border-start px-3 py-2 w-50">
                                    {productResponse.data.id}
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className=" border-top px-3 py-2 w-50">
                                    T??n s???n ph???m
                                  </div>
                                  <div className=" border-top border-start px-3 py-2 w-50">
                                    {productResponse.data.name}
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className=" border-top px-3 py-2 w-50">
                                    T??n thi???t k???
                                  </div>
                                  <div className=" border-top border-start px-3 py-2 w-50">
                                    {designName}
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className=" border-top px-3 py-2 w-50">
                                    Gi?? s???n ph???m
                                  </div>
                                  <div className=" border-top border-start px-3 py-2 w-50">
                                    {numberWithCommas(designPrice)} VND
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <br />

                          <div className="my-5">
                            {/* <p className="h4 mt-4">Th??ng tin ?????t h??ng</p> */}

                            {renderCanceledOrderDetailList &&
                              renderCanceledOrderDetailList.length > 0 && (
                                <div className="card mx-4">
                                  <div className="d-flex card-header border-bottom px-3">
                                    <h5 className="my-auto text-start bg-light">
                                      ????n h??ng b??? h???y
                                    </h5>
                                  </div>
                                  <div className="table-responsive text-nowrap">
                                    <>
                                      <Paper
                                        sx={{
                                          width: "100%",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <TableContainer sx={{}}>
                                          <Table
                                            stickyHeader
                                            aria-label="sticky table"
                                          >
                                            <TableHead>
                                              <TableRow>
                                                <TableCell>Size</TableCell>
                                                <TableCell>M??u</TableCell>
                                                <TableCell>S??? l?????ng</TableCell>
                                                <TableCell>Ng??y t???o</TableCell>
                                                <TableCell>
                                                  B??? h???y b???i
                                                </TableCell>
                                                <TableCell>
                                                  Tr???ng th??i
                                                </TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {renderCanceledOrderDetailList
                                                .slice(
                                                  page * rowsPerPage,
                                                  page * rowsPerPage +
                                                    rowsPerPage
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
                                                        <strong>
                                                          {row.size}
                                                        </strong>
                                                      </TableCell>

                                                      <TableCell>
                                                        <strong>
                                                          {row.color}
                                                        </strong>
                                                      </TableCell>
                                                      <TableCell>
                                                        <strong>
                                                          {row.quantity} s???n
                                                          ph???m
                                                        </strong>
                                                      </TableCell>

                                                      <TableCell>
                                                        <strong>
                                                          {dateFormat(
                                                            row.createdDate
                                                          )}
                                                        </strong>
                                                      </TableCell>
                                                      <TableCell>
                                                        {row.reasonByUser !==
                                                        null ? (
                                                          <span className="fw-bold me-1">
                                                            Kh??ch h??ng
                                                          </span>
                                                        ) : (
                                                          <span className="fw-bold me-1">
                                                            Nh?? in
                                                          </span>
                                                        )}
                                                      </TableCell>
                                                      <TableCell>
                                                        <td>
                                                          {row.status ===
                                                            "PENDING" && (
                                                            <span className="badge bg-label-warning me-1">
                                                              Ch??? x??c nh???n
                                                            </span>
                                                          )}
                                                          {row.status ===
                                                            "PRINTING" && (
                                                            <span className="badge bg-label-warning me-1">
                                                              ??ang x??? l??
                                                            </span>
                                                          )}
                                                          {row.status ===
                                                            "PACKAGING" && (
                                                            <span className="badge bg-label-warning me-1">
                                                              ??ang ????ng g??i
                                                            </span>
                                                          )}
                                                          {row.status ===
                                                            "DELIVERING" && (
                                                            <span className="badge bg-label-warning me-1">
                                                              ??ang giao h??ng
                                                            </span>
                                                          )}
                                                          {row.status ===
                                                            "DELIVERED" && (
                                                            <span className="badge bg-label-warning me-1">
                                                              ???? giao
                                                            </span>
                                                          )}
                                                          {row.status ===
                                                            "DONE" && (
                                                            <span className="badge bg-label-success me-1">
                                                              Ho??n th??nh
                                                            </span>
                                                          )}
                                                          {row.status ===
                                                            "CANCEL" && (
                                                            <div className="d-flex flex-wrap w-50">
                                                              <div className="badge bg-label-danger h-75 mt-1">
                                                                ???? h???y
                                                              </div>
                                                              <div
                                                                className="text-secondary btn p-0 text-start text-decoration-underline"
                                                                onClick={() => {
                                                                  setSelectedOrderDetailId(
                                                                    row.orderDetailsId
                                                                  );
                                                                  setIsShowCancelReason(
                                                                    true
                                                                  );
                                                                }}
                                                              >
                                                                xem l?? do{" "}
                                                              </div>
                                                            </div>
                                                          )}
                                                        </td>
                                                      </TableCell>
                                                    </TableRow>
                                                  );
                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                        {renderCanceledOrderDetailList &&
                                          Math.ceil(
                                            renderPedingOrderDetailList.length /
                                              rowsPerPage
                                          ) > 1 && (
                                            <TablePagination
                                              rowsPerPageOptions={[5]}
                                              count={
                                                renderCanceledOrderDetailList.length
                                              }
                                              rowsPerPage={rowsPerPage}
                                              page={page}
                                              onPageChange={handleChangePage}
                                              onRowsPerPageChange={
                                                handleChangeRowsPerPage
                                              }
                                            />
                                          )}
                                      </Paper>
                                    </>
                                  </div>
                                </div>
                              )}

                            {renderPedingOrderDetailList &&
                              renderPedingOrderDetailList.length > 0 && (
                                <div className="card mt-5 mx-4">
                                  <div className="d-flex card-header bg-light border-bottom px-3">
                                    <h5 className="my-auto text-start ">
                                      Danh s??ch ????n h??ng
                                    </h5>
                                  </div>
                                  <div className="table-responsive text-nowrap">
                                    <>
                                      <Paper
                                        sx={{
                                          width: "100%",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <TableContainer sx={{}}>
                                          <Table
                                            stickyHeader
                                            aria-label="sticky table"
                                          >
                                            <TableHead>
                                              <TableRow>
                                                {columns.map((column) => (
                                                  <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                      minWidth: column.minWidth,
                                                    }}
                                                  >
                                                    {column.label}
                                                  </TableCell>
                                                ))}
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {renderPedingOrderDetailList
                                                .slice(
                                                  page * rowsPerPage,
                                                  page * rowsPerPage +
                                                    rowsPerPage
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
                                                        <strong>
                                                          {row.size}
                                                        </strong>
                                                      </TableCell>

                                                      <TableCell>
                                                        <strong>
                                                          {row.color}
                                                        </strong>
                                                      </TableCell>
                                                      <TableCell>
                                                        <strong>
                                                          {row.quantity} s???n
                                                          ph???m
                                                        </strong>
                                                      </TableCell>

                                                      <TableCell>
                                                        <strong>
                                                          {dateFormat(
                                                            row.createdDate as Date
                                                          )}
                                                        </strong>
                                                      </TableCell>

                                                      <TableCell>
                                                        {
                                                          <td>
                                                            {row.status ===
                                                              "PENDING" && (
                                                              <span className="badge bg-label-warning me-1">
                                                                Ch??? x??c nh???n
                                                              </span>
                                                            )}
                                                            {row.status ===
                                                              "PRINTING" && (
                                                              <span className="badge bg-label-warning me-1">
                                                                ??ang x??? l??
                                                              </span>
                                                            )}
                                                            {row.status ===
                                                              "PACKAGING" && (
                                                              <span className="badge  bg-label-warning me-1">
                                                                ??ang ????ng g??i
                                                              </span>
                                                            )}
                                                            {row.status ===
                                                              "DELIVERING" && (
                                                              <span className="badge bg-label-warning me-1">
                                                                ??ang giao h??ng
                                                              </span>
                                                            )}
                                                            {row.status ===
                                                              "DELIVERED" && (
                                                              <span className="badge bg-label-warning me-1">
                                                                ???? giao
                                                              </span>
                                                            )}
                                                            {row.status ===
                                                              "DONE" && (
                                                              <span className="badge bg-label-success me-1">
                                                                Ho??n th??nh
                                                              </span>
                                                            )}
                                                            {row.status ===
                                                              "CANCEL" && (
                                                              <span className="badge bg-label-danger me-1">
                                                                ???? h???y
                                                              </span>
                                                            )}
                                                          </td>
                                                        }
                                                      </TableCell>
                                                    </TableRow>
                                                  );
                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                        {renderPedingOrderDetailList &&
                                          Math.ceil(
                                            renderPedingOrderDetailList.length /
                                              rowsPerPage
                                          ) > 1 && (
                                            <TablePagination
                                              sx={{ border: "none" }}
                                              rowsPerPageOptions={[5]}
                                              count={
                                                renderPedingOrderDetailList.length
                                              }
                                              rowsPerPage={rowsPerPage}
                                              page={page}
                                              onPageChange={handleChangePage}
                                              onRowsPerPageChange={
                                                handleChangeRowsPerPage
                                              }
                                            />
                                          )}
                                      </Paper>
                                    </>
                                  </div>
                                  <div>
                                    {
                                      <Box
                                        sx={{
                                          width: "100%",
                                          marginTop: 6,
                                          marginBottom: 5,
                                        }}
                                      >
                                        <Stepper
                                          alternativeLabel
                                          nonLinear
                                          activeStep={activeStep}
                                        >
                                          {steps.map((label, index) => (
                                            <Step
                                              key={label}
                                              completed={completed[index]}
                                            >
                                              <div>
                                                <StepButton
                                                  color="inherit"
                                                  disabled
                                                >
                                                  {label}
                                                  {completed[index] && (
                                                    <Typography
                                                      sx={{
                                                        textAlign: "center",
                                                        color: "green",
                                                        fontSize: "13px",
                                                      }}
                                                    >
                                                      Ho??n th??nh
                                                    </Typography>
                                                  )}
                                                </StepButton>

                                                {activeStep === index && (
                                                  <button
                                                    type="button"
                                                    className="btn btn-primary ms-4 ps-3 p-1 pe-2"
                                                    onClick={() => {
                                                      handleGetStatus();
                                                      handleClickOpenOrderDialog();
                                                      setIsUpdate(true);
                                                    }}
                                                  >
                                                    {completedSteps() ===
                                                    totalSteps() - 1 ? (
                                                      <div>
                                                        Ho??n th??nh <CheckIcon />
                                                      </div>
                                                    ) : (
                                                      <div>
                                                        Ho??n th??nh <EastIcon />
                                                      </div>
                                                    )}
                                                  </button>
                                                )}
                                              </div>
                                            </Step>
                                          ))}
                                        </Stepper>
                                        <div>
                                          {allStepsCompleted() ? (
                                            <React.Fragment>
                                              <Typography
                                                sx={{
                                                  mt: 2,
                                                  mb: 1,
                                                  textAlign: "center",
                                                  color: "green",
                                                }}
                                              >
                                                ????n h??ng ???? ho??n th??nh
                                              </Typography>
                                            </React.Fragment>
                                          ) : (
                                            <>
                                              {
                                                <React.Fragment>
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      pt: 2,
                                                    }}
                                                  >
                                                    <button
                                                      type="button"
                                                      onClick={() => {
                                                        handleClickOpenOrderDialog();
                                                        setIsUpdate(false);
                                                      }}
                                                      color="error"
                                                      className="btn btn-danger ms-3"
                                                    >
                                                      H???y ????n h??ng
                                                    </button>
                                                  </Box>
                                                </React.Fragment>
                                              }
                                            </>
                                          )}
                                        </div>
                                      </Box>
                                    }
                                  </div>
                                </div>
                              )}
                          </div>

                          {/* Small table */}

                          <hr className="my-5" />
                        </div>
                      </form>
                    </div>
                    <Dialog
                      open={openOrderDialog}
                      onClose={handleCloseOrderDialog}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth={true}
                    >
                      <DialogTitle></DialogTitle>
                      <DialogContent>
                        {isUpdate ? (
                          <ConfirmOrderStatus
                            handleCloseDialog={handleCloseOrderDialog}
                            orderDetailIdList={renderPedingOrderDetailList.map(
                              (data) => data.orderDetailsId
                            )}
                            orderStatus={orderStatus}
                            handleComplete={handleComplete}
                          />
                        ) : (
                          <CancelOrderStatus
                            handleCloseDialog={handleCloseOrderDialog}
                            orderDetailsIdList={renderPedingOrderDetailList.map(
                              (data) => data.orderDetailsId
                            )}
                            orderStatus={orderStatus}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={isShowCancelReason}
                      onClose={() => setIsShowCancelReason(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth={true}
                    >
                      <DialogContent>
                        {selectedOrderDetailId &&
                          orderDetailsList &&
                          orderDetailsList.filter(
                            (orderDetail) =>
                              orderDetail.orderDetailsId ===
                              selectedOrderDetailId
                          )[0] && (
                            <div className="">
                              <div className=" d-flex justify-content-center">
                                <Image
                                  src="/assets/img/avatars/logo_man.png"
                                  className="avatar avatar rounded-circle "
                                  width={150}
                                  height={150}
                                  objectFit="cover"
                                  alt="productImage"
                                />
                              </div>

                              {orderDetailsList.filter(
                                (orderDetail) =>
                                  orderDetail.orderDetailsId ===
                                  selectedOrderDetailId
                              )[0].reasonByUser && (
                                <>
                                  <div className="h5 d-flex justify-content-center text-dark">
                                    Kh??ch h??ng ???? h???y ????n v???i l?? do:
                                  </div>
                                  <div className="d-flex justify-content-center">
                                    {
                                      orderDetailsList.filter(
                                        (orderDetail) =>
                                          orderDetail.orderDetailsId ===
                                          selectedOrderDetailId
                                      )[0].reasonByUser
                                    }
                                  </div>
                                </>
                              )}
                              {orderDetailsList.filter(
                                (orderDetail) =>
                                  orderDetail.orderDetailsId ===
                                  selectedOrderDetailId
                              )[0].reasonByFactory && (
                                <>
                                  <div className="h5 d-flex justify-content-center text-dark">
                                    B???n ???? h???y ????n v???i l?? do:
                                  </div>
                                  <div className="d-flex justify-content-center">
                                    {
                                      orderDetailsList.filter(
                                        (orderDetail) =>
                                          orderDetail.orderDetailsId ===
                                          selectedOrderDetailId
                                      )[0].reasonByFactory
                                    }
                                  </div>
                                </>
                              )}

                              <div className=" d-flex justify-content-center mt-4">
                                <button
                                  className="btn btn-primary ps-4 pe-4"
                                  onClick={() => setIsShowCancelReason(false)}
                                >
                                  ????ng
                                </button>
                              </div>
                            </div>
                          )}
                      </DialogContent>
                    </Dialog>
                    {/* /Account */}
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
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
    </>
  );
}
OrderDetails.Layout = MainLayout;
