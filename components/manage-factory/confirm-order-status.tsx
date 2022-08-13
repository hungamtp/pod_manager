import { UpdateOrderStatusDto } from "@/services/factories/dto/update-order-status-dto";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useUpdateOrderStatusFactory from "hooks/factories/use-update-order-status";
import Image from "next/image";
import * as React from "react";
export interface IConfirmOrderStatusProps {
  handleCloseDialog: () => void;
  orderDetailId: string[];
  orderStatus: string;
  handleComplete: () => void;
}

export default function ConfirmOrderStatus(props: IConfirmOrderStatusProps) {
  const { handleCloseDialog, orderDetailId, orderStatus, handleComplete } =
    props;
  const { mutate: updateOrderStatus, isSuccess } =
    useUpdateOrderStatusFactory(handleCloseDialog);

  const handleUpdateStatus = () => {
    const tmpData: UpdateOrderStatusDto = {
      orderDetailId: orderDetailId,
      orderStatus: orderStatus,
    };
    updateOrderStatus(tmpData);
  };

  return (
    <>
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
        <div className="d-flex justify-content-center m-3">
          Bạn có muốn hoàn thành bước này không?
        </div>
        <div className=" d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary ps-4 pe-4 me-3"
            onClick={() => {
              handleUpdateStatus();
            }}
          >
            Đồng ý
          </button>
          <button
            className="btn btn-primary ps-4 pe-4"
            onClick={handleCloseDialog}
          >
            Đóng
          </button>
        </div>
      </div>
    </>
  );
}
