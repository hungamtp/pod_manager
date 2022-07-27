/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import { numberWithCommas } from "@/helpers/number-util";
import { Filter } from "@/services/accounts";
import { OrderFactoryDto } from "@/services/factories/dto/get-all-orders-factory";
import { Pagination, Stack } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import useColors from "hooks/colors/use-colors";
import useOrdersFactory from "hooks/factories/use-orders-factory";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
export interface IManageOrder {}

const ITEM_HEIGHT = 48;

export default function ManageOrder(props: IManageOrder) {
  const credentialId = useAppSelector((state) => state.auth.userId);
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });

  const [unitedOrderDetail, setUnitedOrderDetail] =
    useState<OrderFactoryDto[]>();
  const router = useRouter();

  const { data: ordersFactoryresponse, isLoading: isLoadingOrdersFactory } =
    useOrdersFactory(credentialId, filter);

  React.useEffect(() => {
    if (ordersFactoryresponse && ordersFactoryresponse.content.length > 0) {
      let newLength = 1;
      if (ordersFactoryresponse.content.length > 1) {
        let i, j;

        let keep = true;
        let count = 0;
        for (i = 1; i < ordersFactoryresponse.content.length; i++) {
          for (j = 0; j < newLength; j++) {
            if (
              ordersFactoryresponse.content[j].designId ===
              ordersFactoryresponse.content[i].designId
            ) {
              count++;
              break;
            }
          }
          keep = true;
          if (j === newLength) {
            ordersFactoryresponse.content[newLength++] =
              ordersFactoryresponse.content[i];
          }
        }
        if (count === ordersFactoryresponse.content.length - 1)
          setUnitedOrderDetail([ordersFactoryresponse.content[0]]);
        else
          setUnitedOrderDetail(
            ordersFactoryresponse.content.slice(0, newLength)
          );
      } else {
        setUnitedOrderDetail(ordersFactoryresponse.content);
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
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Quản lý đơn hàng</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Chi Tiết</th>
                    <th>Tên sản phẩm</th>
                    <th>Màu</th>
                    <th>Kích thước</th>
                    <th>Giá đơn Hàng</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {unitedOrderDetail &&
                    unitedOrderDetail.map((orders) => (
                      <tr key={nanoid()}>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              router.push(
                                `/factory/order-details-printing/?orderId=${orders.orderId}&designId=${orders.designId}&credentialId=${credentialId}`
                              );
                            }}
                          >
                            Chi tiết
                          </button>
                        </td>
                        <td>{orders.designName}</td>
                        <td
                          style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                          }}
                        >
                          {orders.color}
                        </td>
                        <td>{orders.size}</td>
                        <td>
                          <strong>{numberWithCommas(orders.price)} VND</strong>
                        </td>
                        <td>{orders.quantity} sản phẩm</td>
                        <td>
                          {orders.status === "PENDING" && (
                            <span className="badge bg-label-warning me-1">
                              CHỜ XÁC NHẬN
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
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
