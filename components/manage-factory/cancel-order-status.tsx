import { CancelOrderStatusDto } from "@/services/factories/dto/cancel-order-status-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import useCancelOrderStatusFactory from "hooks/factories/use-cancel-order-status";
import Image from "next/image";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { setOrderStatus } from "@/redux/slices/unitedOrderData";
export interface ICancelOrderStatusProps {
  handleCloseDialog: () => void;
  orderId: string;
  orderStatus: string;
}

type FormCancelOrderStatus = {
  cancelReason: string;
};

const schema = yup.object().shape({
  cancelReason: yup
    .string()
    .trim()
    .min(10, "Lý do cần ít nhất 10 kí tự")
    .max(255, "Lý do tối đa 255 kí tự")
    .required("không được để trống lý do"),
});

export default function CancelOrderStatus(props: ICancelOrderStatusProps) {
  const { handleCloseDialog, orderId, orderStatus } = props;
  const { mutate: cancelOrderStatus, isSuccess } =
    useCancelOrderStatusFactory(handleCloseDialog);
  const defaultValues: FormCancelOrderStatus = {
    cancelReason: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCancelOrderStatus>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormCancelOrderStatus> = (data) => {
    const tmpData: CancelOrderStatusDto = {
      orderId: orderId,
      cancelReason: data.cancelReason,
      orderStatus: "CANCEL",
    };
    cancelOrderStatus(tmpData);
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="d-flex justify-content-center">
            <Image
              src="/assets/img/avatars/logo_man.png"
              className="avatar avatar rounded-circle "
              width={150}
              height={150}
              objectFit="cover"
              alt="productImage"
            />
          </div>
          <div className="d-flex justify-content-center">
            <strong>Bạn có muốn hủy đơn hàng này không?</strong>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label
                  className="col-sm-5 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-fullname"
                >
                  Lý do hủy đơn
                </label>
                <div className="">
                  <div className="input-group input-group-merge">
                    <textarea
                      rows={3}
                      className="form-control"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("cancelReason")}
                    />
                  </div>
                  {errors.cancelReason && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.cancelReason.message}
                    </span>
                  )}
                </div>
              </div>
              <div className=" d-flex justify-content-center mt-2">
                <button
                  className="btn btn-primary ps-4 pe-4 me-3"
                  type="submit"
                >
                  Đồng ý
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ps-4 pe-4"
                  onClick={handleCloseDialog}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
