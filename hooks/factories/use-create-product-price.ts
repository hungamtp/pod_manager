import { useMutation, useQueryClient } from "react-query";

import { createProductPrice } from "@/services/factories";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { CreatePriceMaterialDto } from "@/services/factories/dto/create-price-material-dto";

const useCreateProductPrice = (
  handleCloseDialog: () => void,
  factoryId: string,
  productId: string
) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: CreatePriceMaterialDto) => {
      return await createProductPrice(factoryId, productId, data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        queryClient.invalidateQueries("GetProductForFactory");
        queryClient.invalidateQueries("GetFactoryById");
        const message = "Tạo mới thành công!";
        enqueueSnackbar(message, {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          handleCloseDialog();

          enqueueSnackbar("Chất liệu sản phẩm không được để trống", {
            autoHideDuration: 9000,
            variant: "error",
          });
        }
      },
    }
  );
};

export default useCreateProductPrice;
