import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { setOrderStatus } from "@/redux/slices/unitedOrderData";
import { cancelOrderStatusFactory } from "@/services/factories";
import { CancelOrderStatusDto } from "@/services/factories/dto/cancel-order-status-dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useCancelOrderStatusFactory = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  let orderStatus = "";
  return useMutation(
    async (data: CancelOrderStatusDto) => {
      orderStatus = data.orderStatus;
      return await cancelOrderStatusFactory(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        dispatch(setOrderStatus(orderStatus));
        queryClient.invalidateQueries("GetOrderDetails");
        enqueueSnackbar("Hủy đơn hàng thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          enqueueSnackbar(error.response?.data.errorMessage, {
            autoHideDuration: 9000,
            variant: "error",
          });
        }
      },
    }
  );
};

export default useCancelOrderStatusFactory;
