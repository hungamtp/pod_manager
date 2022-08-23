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
    .number()
    .typeError("Chiều rộng không được để trống")
    .min(20, "Chiều rộng cần phải lớn hơn 20 cm")
    .max(80, "Chiều rộng tối đa 80 cm")
    .required("Chiều rộng không được để trống"),
  height: yup
    .number()
    .typeError("Chiều dài không được để trống")
    .min(20, "Chiều dài cần phải lớn hơn 20")
    .max(100, "Chiều dài tối đa 100 cm")
    .required("Chiều dài không được để trống"),
});

export default function CreateProductSizeForm(
  props: ICreateProductSizeFormProps
) {
  const { setOpenCreateProductSize, productId, size } = props;

  const defaultValues: FormCreateProductSize = {
    width: 30,
    height: 30,
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
                  className="col-sm-3 col-form-label text-capitalize fs-6"
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
                  className="col-sm-3 col-form-label text-capitalize fs-6"
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
