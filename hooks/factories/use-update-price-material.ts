import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { updatePriceMaterialProduct } from "@/services/factories";
import { UpdatePriceMaterialDto } from "@/services/factories/dto/update-price-material-dto";
import { updateProduct } from "@/services/products";
import { UpdateProductDto } from "@/services/products/dto/update-product-dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useUpdatePriceMaterialProduct = (
  handleCloseDialog: () => void,
  factoryId: string,
  productId: string
) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: UpdatePriceMaterialDto) => {
      return await updatePriceMaterialProduct(data, factoryId, productId);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        queryClient.invalidateQueries("GetFactoryById");
        enqueueSnackbar("Cập nhật giá và chất liệu thành công!", {
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

export default useUpdatePriceMaterialProduct;
