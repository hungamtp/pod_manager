import { useAppDispatch } from "@/components/hooks/reduxHook";
import { useMutation, useQueryClient } from "react-query";

import { useRouter } from "next/router";
import { CreateSizeColorProductDto } from "@/services/factories/dto/create-size-color-product-dto";
import { createSizeColorProduct } from "@/services/factories";

const useCreateSizeColorProduct = (
  handleCloseDialog: () => void,
  factoryId: string,
  productId: string
) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: CreateSizeColorProductDto[]) => {
      return await createSizeColorProduct(data, factoryId, productId);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        queryClient.invalidateQueries("GetFactoryById");
      },
    }
  );
};

export default useCreateSizeColorProduct;
