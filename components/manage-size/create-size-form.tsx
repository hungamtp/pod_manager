/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateColor from "hooks/colors/use-create-colors";
import useCreateSize from "hooks/sizes/use-create-colors";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface ICreateSizeFormProps {
  handleCloseDialog: () => void;
}

type FormCreateAccount = {
  name: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
});

export default function CreateSizeForm(props: ICreateSizeFormProps) {
  const { handleCloseDialog } = props;

  const defaultValues: FormCreateAccount = {
    name: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCreateAccount>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutate: addSize, error } = useCreateSize(handleCloseDialog);

  const onSubmit: SubmitHandler<FormCreateAccount> = (data) => {
    addSize(data);
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
                  Tên Kích thước
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.name.message}
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
