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
export interface OrderDetailsProps {}

const steps = ["Chờ xác nhận", "Chờ lấy hàng", "Đang giao", "Đã giao"];

export default function OrderDetails(props: OrderDetailsProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const [isCancel, setIsCancel] = React.useState(false);
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
          <h4 className="fw-bold py-3 mb-4"></h4>
          <div className="card-body">
            <div className="d-flex align-items-start align-items-sm-center gap-4">
              <img
                src=""
                alt="user-avatar"
                className="d-block rounded"
                height={100}
                width={100}
                id="uploadedAvatar"
              />
              <div className="button-wrapper">
                <p className="text-muted mb-0"></p>
              </div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="row">
            <div className="col-md-12">
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
                        <label className="form-label">Tên Khách Hàng</label>

                        <input
                          className="form-control"
                          type="text"
                          disabled
                          id="Name"
                        />
                      </div>

                      <div className="mb-3 col-md-6">
                        <label htmlFor="organization" className="form-label">
                          email
                        </label>
                        <input disabled className="form-control" />
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
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="organization" className="form-label">
                          Số điện thoại
                        </label>
                        <input disabled className="form-control" />
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
                                <Step key={label} completed={completed[index]}>
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
                                  <Button onClick={handleReset}>Reset</Button>
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
    </>
  );
}
OrderDetails.Layout = MainLayout;
