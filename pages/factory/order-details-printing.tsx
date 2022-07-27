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
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { StepLabel } from "@mui/material";
import { useRouter } from "next/router";
import useGetOrderDetails from "hooks/factories/use-get-order-details";
import ViewOrder from "@/components/manage-factory/view-order";
import useGetSizeProductByProductId from "hooks/products/use-get-product-size-by-productId";

export interface OrderDetailsProps {}

const steps = ["Chờ xác nhận", "Chờ lấy hàng", "Đang giao", "Đã giao"];

export default function OrderDetails(props: OrderDetailsProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [colorList, setColorList] = React.useState<string[]>([]);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [isCancel, setIsCancel] = React.useState(false);
  const router = useRouter();
  const { orderId, designId, credentialId } = router.query;
  const { data: responseOrderDetails } = useGetOrderDetails(
    orderId as string,
    designId as string,
    credentialId as string
  );

  const { data: sizeProductResponse, isLoading: isLoadingSizeProductResponse } =
    useGetSizeProductByProductId(responseOrderDetails?.data.productId || "");

  React.useEffect(() => {
    if (responseOrderDetails) {
      const colorList = responseOrderDetails.data.orderDetailsSupportDtos.map(
        (data) => data.color
      );
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
          setColorList([colorList[0]]);
        } else {
          setColorList(colorList.slice(0, newLength));
        }
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
    return activeStep === totalSteps() - 1;
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    console.log(steps[activeStep], "neee");
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
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
                    />
                  </>
                ) : (
                  <div className="card mb-4">
                    <div className="d-flex justify-content-between p-4">
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
                              <div className=" border p-2 col-md-4">{}</div>
                            </div>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">Email</div>
                              <div className=" border p-2 col-md-4">{}</div>
                            </div>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">
                                Số điện thoại
                              </div>
                              <div className=" border p-2 col-md-4">{}</div>
                            </div>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">
                                Địa chỉ nhận hàng
                              </div>
                              <div className=" border p-2 col-md-4">{}</div>
                            </div>
                          </div>

                          <div className="mb-3 col-md-6">
                            <p className="h4">Thông tin sản phẩm</p>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">
                                Mã sản phẩm
                              </div>
                              <div className=" border p-2 col-md-4">{}</div>
                            </div>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">
                                Tên sản phẩm
                              </div>
                              <div className=" border p-2 col-md-4">{}</div>
                            </div>
                            <div className="row ms-2">
                              <div className=" border p-2 col-md-4">
                                Tên thiết kế
                              </div>
                              <div className=" border p-2 col-md-4">{}</div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="h4 mt-4">Thông tin đặt hàng</p>
                            <div className="w-75 ms-3">
                              <div className="row ">
                                <div className="col-md-2 p-0">
                                  <div className="border p-2">Màu/Size</div>
                                  {colorList.map((color) => (
                                    <div key={color} className="border p-2">
                                      {color}
                                    </div>
                                  ))}
                                </div>
                                <div className="col-md-10 p-0">
                                  <div className="d-flex flex-col">
                                    {responseOrderDetails.data.orderDetailsSupportDtos.map(
                                      (data) => (
                                        <div key={data.orderDetailsId}>
                                          <div className="border py-2 px-4">
                                            {data.size}
                                          </div>
                                          {colorList.map((color) => {
                                            if (color)
                                              return (
                                                <div className="border py-2 px-4">
                                                  {data.color === color
                                                    ? data.quantity
                                                    : 0}
                                                </div>
                                              );
                                          })}
                                        </div>
                                      )
                                    )}
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
                                      <StepButton color="inherit">
                                        {label}
                                      </StepButton>
                                    </Step>
                                  ))}
                                {isCancel &&
                                  steps.map((label, index) => {
                                    const labelProps: {
                                      optional?: React.ReactNode;
                                      error?: boolean;
                                    } = {};
                                    labelProps.error = true;

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
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        pt: 2,
                                      }}
                                    >
                                      <Box sx={{ flex: "1 1 auto" }} />
                                      <Button onClick={handleReset}>
                                        Reset
                                      </Button>
                                    </Box>
                                  </React.Fragment>
                                ) : (
                                  <>
                                    {!isCancel && (
                                      <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>
                                          Step {activeStep + 1}
                                        </Typography>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            pt: 2,
                                          }}
                                        >
                                          <Button
                                            onClick={handleCancel}
                                            sx={{ mr: 1 }}
                                          >
                                            Hủy
                                          </Button>
                                          {activeStep !== steps.length &&
                                            (completed[activeStep] ? (
                                              <Typography
                                                variant="caption"
                                                sx={{ display: "inline-block" }}
                                              >
                                                Step {activeStep + 1} already
                                                completed
                                              </Typography>
                                            ) : (
                                              <Button onClick={handleComplete}>
                                                {completedSteps() ===
                                                totalSteps() - 2
                                                  ? "Finish"
                                                  : "Complete Step"}
                                              </Button>
                                            ))}
                                        </Box>
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
