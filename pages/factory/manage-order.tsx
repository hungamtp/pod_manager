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
export interface IManageOrder {}

const ITEM_HEIGHT = 48;
export interface UnitedData extends OrderFactoryDto {
  orderDetailIdList: string[];
}
export default function ManageOrder(props: IManageOrder) {
  const credentialId = useAppSelector((state) => state.auth.userId);
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const dispatch = useAppDispatch();

  const [unitedOrderDetail, setUnitedOrderDetail] = useState<UnitedData[]>();
  const router = useRouter();

  const { data: ordersFactoryresponse, isLoading: isLoadingOrdersFactory } =
    useOrdersFactory(credentialId, filter);

  React.useEffect(() => {
    if (ordersFactoryresponse && ordersFactoryresponse.totalElements > 0) {
      const newOrdersContent: UnitedData[] = ordersFactoryresponse.content.map(
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
          {/* Basic Bootstrap Table */}
          <div className="card ">
            {ordersFactoryresponse && unitedOrderDetail ? (
              <>
                <h5 className="card-header">Quản lý đơn hàng</h5>
                <div className="table-responsive text-nowrap ">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th>Chi Tiết</th>
                        <th>Tên sản phẩm</th>
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
                                  dispatch(
                                    addUnitedData({
                                      orderId: orders.orderId,
                                      designId: orders.designId,
                                      productName: orders.productName,
                                      designName: orders.designName,
                                      credentialId: credentialId,
                                      orderDetailIdList:
                                        orders.orderDetailIdList,
                                      orderStatus: orders.status,
                                    })
                                  );
                                  router.push(
                                    `/factory/order-details-printing`
                                  );
                                }}
                              >
                                Chi tiết
                              </button>
                            </td>
                            <td>{orders.designName}</td>

                            <td>
                              <strong>
                                {numberWithCommas(orders.price)} VND
                              </strong>
                            </td>
                            <td>{orders.quantity} sản phẩm</td>
                            <td>
                              {orders.status === "PENDING" && (
                                <span className="badge bg-label-warning me-1">
                                  CHỜ XÁC NHẬN
                                </span>
                              )}
                              {orders.status === "PRINTING" && (
                                <span className="badge bg-label-warning me-1">
                                  CHỜ IN
                                </span>
                              )}
                              {orders.status === "PACKAGING" && (
                                <span className="badge bg-label-warning me-1">
                                  ĐANG ĐÓNG GÓI
                                </span>
                              )}
                              {orders.status === "DELIVERING" && (
                                <span className="badge bg-label-warning me-1">
                                  ĐANG GIAO HÀNG
                                </span>
                              )}
                              {orders.status === "DELIVERED" && (
                                <span className="badge bg-label-warning me-1">
                                  ĐÃ GIAO
                                </span>
                              )}
                              {orders.status === "DONE" && (
                                <span className="badge bg-label-success me-1">
                                  HOÀN THÀNH
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
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
