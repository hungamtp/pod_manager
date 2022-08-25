import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { setOrderStatus } from "@/redux/slices/unitedOrderData";
import { updateOrderStatusFactory } from "@/services/factories";
import { UpdateOrderStatusDto } from "@/services/factories/dto/update-order-status-dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useUpdateOrderStatusFactory = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  let orderStatus = "";
  return useMutation(
    async (data: UpdateOrderStatusDto) => {
      orderStatus = data.orderStatus;
      return await updateOrderStatusFactory(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        dispatch(setOrderStatus(orderStatus));
        dispatch(setOrderStatus(orderStatus));
        handleCloseDialog();
        queryClient.invalidateQueries("GetOrderDetails");
        enqueueSnackbar("Cập nhật trạng thái thành công!", {
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

export default useUpdateOrderStatusFactory;
