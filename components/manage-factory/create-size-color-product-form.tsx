/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { CreateSizeColorProductDto } from "@/services/factories/dto/create-size-color-product-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import useCreateSizeColorProduct from "hooks/factories/use-create-factory";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface ICreateSizeColorProductFormProps {
  handleCloseDialog: () => void;
  factoryId: string;
  productId: string;
}

type FormCreateSizeColorProduct = {
  color: string;
  size: string;
  quantity: number;
};

const schema = yup.object().shape({
  color: yup
    .string()
    .min(1, "color cần ít nhất 1 kí tự")
    .max(26, "color tối đa 50 kí tự")
    .required("color không được để trống"),
  size: yup
    .string()
    .min(1, "size cần ít nhất 1 kí tự")
    .max(26, "size tối đa 50 kí tự")
    .required("size không được để trống"),
  quantity: yup
    .number()
    .min(10, "quantity phải lớn hơn 10")
    .required("quantity không được để trống"),
});

export default function CreateSizeColorProductForm(
  props: ICreateSizeColorProductFormProps
) {
  const { handleCloseDialog, factoryId, productId } = props;

  const defaultValues: FormCreateSizeColorProduct = {
    color: "",
    size: "",
    quantity: 0,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCreateSizeColorProduct>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { mutate: addSizeColorProduct, error } = useCreateSizeColorProduct(
    handleCloseDialog,
    factoryId,
    productId
  );

  const onSubmit: SubmitHandler<FormCreateSizeColorProduct> = (data) => {
    addSizeColorProduct([data], {
      onError: (error: any) => {
        console.log(error.response.data.errorMessage);
      },
    });
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Color
                </label>

                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    ></span>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("color")}
                    />
                  </div>
                  {errors.color && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.color.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Size
                </label>

                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    ></span>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("size")}
                    />
                  </div>
                  {errors.size && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.size.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Quantity
                </label>

                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    ></span>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("quantity")}
                    />
                  </div>
                  {errors.quantity && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.quantity.message}
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
                    CREATE
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
                    type="button"
                  >
                    CANCEL
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
