/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import { numberWithCommas } from "@/helpers/number-util";
import { Filter } from "@/services/factories";
import useFactoryDashboard from "hooks/dashboard/use-factory-dashboard";
import useGetFactoryById from "hooks/factories/use-get-factory-by-id";
import { Skeleton } from "@mui/material";

import * as React from "react";

export interface IDashBoardFactoryProps {}

export default function DashBoardFactory(props: IDashBoardFactoryProps) {
  const { data: response, isLoading: isLoadingDashBoard } =
    useFactoryDashboard();
  const [filter, setFilter] = React.useState<Filter>({
    search: "",
  });
  const credentialId = useAppSelector((state) => state.auth.userId);
  const { data: responseAccount, isLoading: isLoadingAccount } =
    useGetFactoryById(credentialId, filter);
  return (
    <>
      <div>
        {/* Layout wrapper */}
        {/* Content */}
        {isLoadingDashBoard && (
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
              <div className="col-lg-8 mb-4 order-0">
                <div className="card">
                  <div className="d-flex align-items-end row">
                    <div className="col-sm-7">
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          <Skeleton />
                        </h5>
                        <p className="mb-4">
                          <Skeleton />
                        </p>
                      </div>
                    </div>
                    {/* logo factory */}
                    <div className="col-sm-5 text-center text-sm-left">
                      <div className="card-body pb-0 px-0 px-md-4">
                        <Skeleton width={130} height={130} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-4 order-0">
                <div className="row">
                  <div className="col col-md-4 col-6 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-title d-flex align-items-start justify-content-between">
                          <div className="avatar flex-shrink-0">
                            <img
                              src="/assets/img/icons/unicons/chart-success.png"
                              alt="chart success"
                              className="rounded"
                            />
                          </div>
                        </div>
                        <Skeleton />
                        <Skeleton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Total Revenue */}

              <div className="row">
                {/* Order Statistics */}
                <div className="col-md-6 col-lg-4 col-xl-4 order-1 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex align-items-center justify-content-between pb-0 mb-4">
                      <div className="card-title mb-0">
                        <Skeleton />
                      </div>
                    </div>
                    <div className="card-body">
                      <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-bag-dash"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
                                />
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                              </svg>
                            </span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <Skeleton />
                            </div>
                            <div className="user-progress">
                              <small className="fs-5 fw-semibold">
                                <Skeleton />
                                <small className="fs-6 text-muted fw-light ">
                                  <Skeleton />
                                </small>
                              </small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-success">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-bag-check"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                />
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                              </svg>
                            </span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <Skeleton />
                            </div>
                            <div className="user-progress">
                              <small className="fs-5 fw-semibold">
                                <Skeleton />
                              </small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*/ Order Statistics */}
                {/* Expense Overview */}
                <div className="col-md-6 col-lg-4 order-1 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item">
                          <div className="card-title mb-0">
                            <Skeleton />
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body px-0">
                      <div className="tab-content p-0">
                        <div
                          className="tab-pane fade show active"
                          id="navs-tabs-line-card-income"
                          role="tabpanel"
                        >
                          <div className="d-flex p-4 pt-3">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="/assets/img/icons/unicons/wallet.png"
                                alt="User"
                              />
                            </div>
                            <div>
                              <Skeleton />
                              <div className="d-flex align-items-center">
                                <h6 className="mb-0 me-1">
                                  <Skeleton />
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*/ Expense Overview */}
                {/* Transactions */}

                {/*/ Transactions */}
              </div>
            </div>
            {/* / Content */}

            <div className="content-backdrop fade" />
          </div>
        )}
        {!isLoadingDashBoard && response && responseAccount && (
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
              <div className="col-lg-8 mb-4 order-0">
                <div className="card">
                  <div className="d-flex align-items-end row">
                    <div className="col-sm-7">
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          Chào {responseAccount.data.name}! 🎉
                        </h5>
                        <p className="mb-4">
                          Chào mừng bạn đến với Dashboard của{" "}
                          <span className="fw-bold">Factory</span>
                        </p>
                      </div>
                    </div>
                    {/* logo factory */}
                    <div className="col-sm-5 text-center text-sm-left">
                      <div className="card-body pb-0 px-0 px-md-4">
                        <img
                          src={responseAccount.data.image}
                          width={130}
                          height={130}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-4 order-0">
                <div className="row">
                  <div className="col col-md-4 col-6 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-title d-flex align-items-start justify-content-between">
                          <div className="avatar flex-shrink-0">
                            <img
                              src="/assets/img/icons/unicons/chart-success.png"
                              alt="chart success"
                              className="rounded"
                            />
                          </div>
                        </div>
                        <span className="fw-semibold d-block mb-1">
                          Tổng thu nhập
                        </span>
                        <h3 className="card-title mb-2">
                          {numberWithCommas(response.income)} VND
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Total Revenue */}

              <div className="row">
                {/* Order Statistics */}
                <div className="col-md-6 col-lg-4 col-xl-4 order-1 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex align-items-center justify-content-between pb-0 mb-4">
                      <div className="card-title mb-0">
                        <h5 className="m-0 me-2">Thống kê đơn hàng</h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-bag-dash"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
                                />
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                              </svg>
                            </span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Đơn hàng đang xử lý</h6>
                            </div>
                            <div className="user-progress">
                              <small className="fs-5 fw-semibold">
                                {response.inProcessOrder}{" "}
                                <small className="fs-6 text-muted fw-light ">
                                  đơn
                                </small>
                              </small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-success">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-bag-check"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                />
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                              </svg>
                            </span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Đơn hàng đã hoàn thành</h6>
                            </div>
                            <div className="user-progress">
                              <small className="fs-5 fw-semibold">
                                {response.doneOrder}{" "}
                                <small className="fs-6 text-muted fw-light ">
                                  đơn
                                </small>
                              </small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*/ Order Statistics */}
                {/* Expense Overview */}
                <div className="col-md-6 col-lg-4 order-1 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item">
                          <div className="card-title mb-0">
                            <h5 className="m-0 me-2">Thống kê theo tháng</h5>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body px-0">
                      <div className="tab-content p-0">
                        <div
                          className="tab-pane fade show active"
                          id="navs-tabs-line-card-income"
                          role="tabpanel"
                        >
                          <div className="d-flex p-4 pt-3">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="/assets/img/icons/unicons/wallet.png"
                                alt="User"
                              />
                            </div>
                            <div>
                              <small className="text-muted d-block">
                                Thu nhập
                              </small>
                              <div className="d-flex align-items-center">
                                <h6 className="mb-0 me-1">
                                  {numberWithCommas(
                                    response.incomeCurrentMonth
                                  )}{" "}
                                  VND
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*/ Expense Overview */}
                {/* Transactions */}

                {/*/ Transactions */}
              </div>
            </div>
            {/* / Content */}

            <div className="content-backdrop fade" />
          </div>
        )}
        {/* Content wrapper */}
        {/* / Layout page */}
      </div>
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
      {/* / Layout wrapper */}

      {/* Core JS */}
      {/* build:js /assets/vendor/js/core.js */}
      {/* endbuild */}
      {/* Vendors JS */}
      {/* Main JS */}
      {/* Page JS */}
      {/* Place this tag in your head or just before your close body tag. */}
    </>
  );
}

DashBoardFactory.Layout = MainLayout;
