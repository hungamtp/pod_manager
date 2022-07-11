import { useAppDispatch } from "@/components/hooks/reduxHook";
import { useMutation, useQueryClient } from "react-query";

import { createProductBluePrint } from "@/services/products";
import { CreateProductBlueprintDto } from "@/services/products/dto/create-products-blueprint-dto";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { resetDesigns } from "@/redux/slices/blueprints";

const useCreateProductBlueprint = (id: string) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: CreateProductBlueprintDto) => {
      return await createProductBluePrint(data, id);
    },
    {
      onSuccess: (data) => {
        //because data:any
        queryClient.invalidateQueries("GetProductBlueprint");
        queryClient.invalidateQueries("GetProductById");
        dispatch(resetDesigns());
        router.back();
        enqueueSnackbar("Create successfully!", {
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

export default useCreateProductBlueprint;
