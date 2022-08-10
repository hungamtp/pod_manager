/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { CreatePriceMaterialDto } from "@/services/factories/dto/create-price-material-dto";
import { CreateSizeColorProductDto } from "@/services/factories/dto/create-size-color-product-dto";
import { UpdatePriceMaterialDto } from "@/services/factories/dto/update-price-material-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateSizeColorProduct from "hooks/factories/use-create-factory";
import useCreateProductPrice from "hooks/factories/use-create-product-price";
import useUpdatePriceMaterialProduct from "hooks/factories/use-update-price-material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IUpdateProductPriceFormProps {
  handleCloseDialog: () => void;
  factoryId: string;
  productId: string;
  priceMaterial: UpdatePriceMaterialDto;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const schema = yup.object().shape({
  price: yup
    .number()
    .min(10, "Giá sản phẩm phải lớn hơn 10.000 VND")
    .required("Giá sản phẩm không được để trống"),
  material: yup.string().trim().required("Chất liệu vải không được để trống"),
});

export default function UpdateProductPriceForm(
  props: IUpdateProductPriceFormProps
) {
  const { handleCloseDialog, factoryId, productId, priceMaterial } = props;

  const defaultValues: UpdatePriceMaterialDto = {
    price: 0,
    material: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePriceMaterialDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(priceMaterial);
  }, [priceMaterial]);

  const onSubmit: SubmitHandler<UpdatePriceMaterialDto> = (data) => {
    updateProductPriceMaterial(data);
  };

  const { mutate: updateProductPriceMaterial, error } =
    useUpdatePriceMaterialProduct(handleCloseDialog, factoryId, productId);
  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Giá sản phẩm (VND)
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    ></span>
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("price")}
                    />
                  </div>
                  {errors.price && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.price.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Chất liệu vải
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    ></span>
                    <input
                      step="any"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("material")}
                    />
                  </div>
                  {errors.material && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.material.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
                    type="button"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
