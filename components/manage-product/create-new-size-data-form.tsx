/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateColor from "hooks/colors/use-create-colors";
import useCreateProductSize from "hooks/products/use-create-product-size";
import useCreateSize from "hooks/sizes/use-create-sizes";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface ICreateProductSizeFormProps {
  setOpenCreateProductSize: (isOpen: boolean) => void;
  productId: string;
  size: string;
}

type FormCreateProductSize = {
  width: number;
  height: number;
};

const schema = yup.object().shape({
  width: yup
    .string()
    .trim()
    .min(1, "Chiều rộng cần phải lớn hơn 1")
    .max(26, "Chiều rộng tối đa 26")
    .required("Chiều rộng không được để trống"),
  height: yup
    .string()
    .trim()
    .min(1, "Chiều dài cần phải lớn hơn 1")
    .max(26, "Chiều dài tối đa 26")
    .required("Chiều dài không được để trống"),
});

export default function CreateProductSizeForm(
  props: ICreateProductSizeFormProps
) {
  const { setOpenCreateProductSize, productId, size } = props;

  const defaultValues: FormCreateProductSize = {
    width: 10,
    height: 10,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCreateProductSize>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutate: createProductSize } = useCreateProductSize(
    setOpenCreateProductSize
  );

  const onSubmit: SubmitHandler<FormCreateProductSize> = (data) => {
    createProductSize({ ...data, productId: productId, size: size });
  };

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
                  Chiều rộng (cm)
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("width")}
                    />
                  </div>
                  {errors.width && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.width.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Chiều dài (cm)
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("height")}
                    />
                  </div>
                  {errors.height && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.height.message}
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
                    Tạo mới
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setOpenCreateProductSize(false)}
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
