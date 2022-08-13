/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import * as React from "react";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { DialogTitle, StepLabel } from "@mui/material";
import { useRouter } from "next/router";
import useGetOrderDetails from "hooks/factories/use-get-order-details";
import ViewOrder from "@/components/manage-factory/view-order";
import useGetSizeProductByProductId from "hooks/products/use-get-product-size-by-productId";
import { nanoid } from "@reduxjs/toolkit";
import useGetProductById from "hooks/products/use-get-products-by-id";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { clearData } from "@/redux/slices/unitedOrderData";
import useUpdateOrderStatusFactory from "hooks/factories/use-update-order-status";
import ConfirmOrderStatus from "@/components/manage-factory/confirm-order-status";
import CancelOrderStatus from "@/components/manage-factory/cancel-order-status";

export interface OrderDetailsProps {}

const steps = [
  "Chờ xác nhận",
  "Đang xử lí",
  "Đang đóng gói",
  "Đang giao hàng",
  "Đã giao",
  "Hoàn thành",
];
const englishSteps = [
  "PENDING",
  "PRINTING",
  "PACKAGING",
  "DELIVERING",
  "DELIVERED",
  "DONE",
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
    orderDetailIdList,
    orderStatus: statusOfOrder,
  } = useAppSelector((state) => state.unitedData);

  const { data: responseOrderDetails } = useGetOrderDetails(
    orderId as string,
    designId as string,
    credentialId as string
  );
  // console.log(orderDetailIdList, "orderDetailIdList");

  const [orderStatus, setOrderStatus] = React.useState("PENDING");
  const { data: sizeProductResponse, isLoading: isLoadingSizeProductResponse } =
    useGetSizeProductByProductId(responseOrderDetails?.data.productId || "");

  const { data: productResponse, isLoading: isLoadingProductResponse } =
    useGetProductById(responseOrderDetails?.data.productId || "");
  const [renderColor, setRenderColor] = React.useState("");

  React.useEffect(() => {
    if (responseOrderDetails) {
      const colorList = responseOrderDetails.data.orderDetailsSupportDtos.map(
        (data) => data.color
      );
      let loopColorList: string[] = [];

      if (colorList.length > 1) {
        let newLength = 1;
        let i;
        let j;
        let count = 0;
        for (i = 1; i < colorList.length; i++) {
          for (j = 0; j < newLength; j++) {
            if (colorList[i] === colorList[j]) {
              count++;
              break;
            }
          }
          if (newLength === j) {
            colorList[newLength++] = colorList[i];
          }
        }
        if (count === colorList.length - 1) {
          loopColorList = [colorList[0]];
          setRenderedColorList([colorList[0]]);
        } else {
          loopColorList = colorList.slice(0, newLength);
          setRenderedColorList(colorList.slice(0, newLength));
        }
      } else {
        loopColorList = colorList;
        setRenderedColorList(colorList);
      }

      const sizeList: {
        size: string;
        colorsData: { color: string; quantity: number; colorImage: string }[];
      }[] = [];
      responseOrderDetails.data.orderDetailsSupportDtos.forEach((data) => {
        const tmpSizeData: {
          size: string;
          colorsData: { color: string; quantity: number; colorImage: string }[];
        } = { size: data.size, colorsData: [] };

        loopColorList.forEach((color) => {
          if (color === data.color) {
            tmpSizeData.colorsData.push({
              color: color,
              quantity: data.quantity,
              colorImage: data.colorImage,
            });
          } else {
            tmpSizeData.colorsData.push({
              color: color,
              quantity: 0,
              colorImage: data.colorImage,
            });
          }
        });
        sizeList.push(tmpSizeData);
      });

      if (sizeList.length > 1) {
        let newLength = 1;
        let i: number;
        let j: number;
        let count = 0;
        for (i = 1; i < sizeList.length; i++) {
          for (j = 0; j < newLength; j++) {
            if (sizeList[i].size === sizeList[j].size) {
              sizeList[j].colorsData.forEach((colorData) => {
                sizeList[i].colorsData.forEach((element) => {
                  if (
                    element.quantity !== 0 &&
                    colorData.color === element.color
                  ) {
                    colorData.quantity = element.quantity;
                  }
                });
              });
              count++;
              break;
            }
          }
          if (newLength === j) {
            sizeList[newLength++] = sizeList[i];
          }
        }
        if (count === sizeList.length - 1) {
          setSizeList([sizeList[0]]);
        } else {
          setSizeList(sizeList.slice(0, newLength));
        }
      } else {
        setSizeList(sizeList);
      }
    }
  }, [responseOrderDetails]);

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

  const handleCancel = () => {
    setIsCancel(true);
    setActiveStep(totalSteps() - 1);
  };
  let tmpOrderStatusData = "";

  const handleGetStatus = () => {
    if (steps[activeStep] === "Chờ xác nhận") {
      tmpOrderStatusData = "PENDING";
    } else if (steps[activeStep] === "Đang xử lí") {
      tmpOrderStatusData = "PRINTING";
    } else if (steps[activeStep] === "Đang đóng gói") {
      tmpOrderStatusData = "PACKAGING";
    } else if (steps[activeStep] === "Đang giao hàng") {
      tmpOrderStatusData = "DELIVERING";
    } else if (steps[activeStep] === "Đã giao") {
      tmpOrderStatusData = "DELIVERED";
    } else if (steps[activeStep] === "Hoàn thành") {
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

  React.useEffect(() => {
    if (statusOfOrder) {
      let newStatusList = {};
      let stepIndex = 0;
      const BreakError = {};

      try {
        englishSteps.forEach((step, index) => {
          newStatusList = { ...newStatusList, [index]: true };
          if (step === statusOfOrder) {
            stepIndex = index;
            throw BreakError;
          } else if (statusOfOrder === "CANCEL") {
            setIsCancel(true);
            setActiveStep(totalSteps() - 1);
            throw BreakError;
          }
        });
      } catch (error) {
        if (error !== BreakError) throw error;
      }
      setActiveStep(stepIndex + 1);
      setCompleted(newStatusList);
    }
  }, [statusOfOrder]);

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
          <h4 className="fw-bold py-3 mb-4">Chi tiết đơn hàng</h4>
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
                    <div className="d-flex justify-content-end p-4">
                      <button
                        className="btn btn-primary p-2"
                        onClick={() => setIsViewOrder(true)}
                      >
                        Hướng dẫn in
                      </button>
                    </div>
                    <hr className="my-0" />
                    {/* Account */}

                    <div className="card-body">
                      <form id="formAccountSettings">
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <p className="h4">Thông tin khách hàng</p>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">
                                Tên khách hàng
                              </div>
                              <div className=" border p-2 col-md-4">
                                {responseOrderDetails.data.customerName}
                              </div>
                            </div>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">Email</div>
                              <div className=" border p-2 col-md-4">
                                {responseOrderDetails.data.email}
                              </div>
                            </div>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">
                                Số điện thoại
                              </div>
                              <div className=" border p-2 col-md-4">
                                {responseOrderDetails.data.phoneNumber}
                              </div>
                            </div>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">
                                Địa chỉ nhận hàng
                              </div>
                              <div className=" border p-2 col-md-4">
                                175 Trần Thị Cờ, Quận 9, TP. Hồ Chí Minh
                              </div>
                            </div>
                          </div>

                          <div className="mb-3 col-md-6">
                            {productResponse && (
                              <>
                                <p className="h4">Thông tin sản phẩm</p>
                                <div className="row ms-2">
                                  <div className=" border p-2 col-md-4">
                                    Mã sản phẩm
                                  </div>
                                  <div className=" border p-2 col-md-4">
                                    {productResponse.data.id}
                                  </div>
                                </div>
                                <div className="row ms-2">
                                  <div className=" border p-2 col-md-4">
                                    Tên sản phẩm
                                  </div>
                                  <div className=" border p-2 col-md-4">
                                    {productResponse.data.name}
                                  </div>
                                </div>
                                <div className="row ms-2">
                                  <div className=" border p-2 col-md-4">
                                    Tên thiết kế
                                  </div>
                                  <div className=" border p-2 col-md-4">
                                    {designName}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="mb-3">
                            <p className="h4 mt-4">Thông tin đặt hàng</p>
                            <div className="w-75 ms-3">
                              <div className="row ">
                                <div className="col-md-2 p-0">
                                  <div className="border p-2">Màu/Size</div>
                                  {renderedColorList.map((color) => (
                                    <div key={color} className="border p-2">
                                      {color}
                                    </div>
                                  ))}
                                </div>
                                <div className="col-md-10 p-0">
                                  <div className="d-flex flex-col">
                                    {sizeList.map((data) => (
                                      <div key={nanoid()}>
                                        <div className="border py-2 px-4">
                                          {data.size}
                                        </div>
                                        {data.colorsData.map((dataColor) => {
                                          if (
                                            dataColor.quantity > 0 &&
                                            !renderColor
                                          ) {
                                            setRenderColor(
                                              dataColor.colorImage
                                            );
                                          }

                                          return (
                                            <div
                                              key={dataColor.color}
                                              className="border py-2 px-4"
                                            >
                                              {dataColor.quantity}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Small table */}

                          <hr className="my-5" />

                          <div>
                            <Box sx={{ width: "100%" }}>
                              <Stepper
                                alternativeLabel
                                nonLinear
                                activeStep={activeStep}
                              >
                                {!isCancel &&
                                  steps.map((label, index) => (
                                    <Step
                                      key={label}
                                      completed={completed[index]}
                                    >
                                      <div>
                                        <StepButton color="inherit" disabled>
                                          {label}
                                          {completed[index] && (
                                            <Typography
                                              sx={{
                                                textAlign: "center",
                                                color: "green",
                                                fontSize: "13px",
                                              }}
                                            >
                                              hoàn thành
                                            </Typography>
                                          )}
                                        </StepButton>
                                        {activeStep === index && (
                                          <Button
                                            className="ms-5"
                                            onClick={() => {
                                              handleGetStatus();
                                              handleClickOpenOrderDialog();
                                              setIsUpdate(true);
                                            }}
                                          >
                                            {completedSteps() ===
                                            totalSteps() - 1
                                              ? "Hoàn thành đơn hàng"
                                              : "Hoàn thành"}
                                          </Button>
                                        )}
                                      </div>
                                    </Step>
                                  ))}
                                {isCancel &&
                                  steps.map((label, index) => {
                                    const labelProps: {
                                      optional?: React.ReactNode;
                                      error?: boolean;
                                    } = {};
                                    if (activeStep === index) {
                                      labelProps.error = true;
                                    }

                                    return (
                                      <Step key={label}>
                                        <StepLabel {...labelProps}>
                                          {label}
                                        </StepLabel>
                                      </Step>
                                    );
                                  })}
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
                                      Đơn hàng đã hoàn thành
                                    </Typography>
                                  </React.Fragment>
                                ) : (
                                  <>
                                    {!isCancel ? (
                                      <React.Fragment>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            pt: 2,
                                          }}
                                        >
                                          <Button
                                            onClick={() => {
                                              handleClickOpenOrderDialog();
                                              setIsUpdate(false);
                                            }}
                                            color="error"
                                            sx={{ mr: 1 }}
                                          >
                                            Hủy đơn hàng
                                          </Button>
                                          {/* {activeStep !== steps.length &&
                                            (completed[activeStep] ? (
                                              <Typography
                                                variant="caption"
                                                sx={{ display: "inline-block" }}
                                              >
                                                Step {activeStep + 1} already
                                                completed
                                              </Typography>
                                            ) : (
                                              <Button
                                                onClick={() => {
                                                  handleGetStatus();
                                                  handleClickOpenOrderDialog();
                                                }}
                                              >
                                                {completedSteps() ===
                                                totalSteps() - 1
                                                  ? "Hoàn thành đơn hàng"
                                                  : "Hoàn thành bước"}
                                              </Button>
                                            ))} */}
                                        </Box>
                                      </React.Fragment>
                                    ) : (
                                      <React.Fragment>
                                        <Typography
                                          sx={{
                                            mt: 2,
                                            mb: 1,
                                            textAlign: "center",
                                            color: "red",
                                          }}
                                        >
                                          Đơn hàng đã hủy
                                        </Typography>
                                      </React.Fragment>
                                    )}
                                  </>
                                )}
                              </div>
                            </Box>
                          </div>
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
                            orderDetailId={orderDetailIdList}
                            orderStatus={orderStatus}
                            handleComplete={handleComplete}
                          />
                        ) : (
                          <CancelOrderStatus
                            handleCloseDialog={handleCloseOrderDialog}
                            orderId={orderId}
                            orderStatus={orderStatus}
                          />
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
