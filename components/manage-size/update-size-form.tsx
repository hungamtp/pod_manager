/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { UpdateSizeDto } from "@/services/sizes/dto/update-sizes-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateSize from "hooks/sizes/use-create-sizes";
import useUpdateSize from "hooks/sizes/use-update-sizes";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IUpdateSizeFormProps {
  handleCloseDialog: () => void;
  size: UpdateSizeDto;
}

type FormUpdateSize = {
  id: string;
  name: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Kích thước cần ít nhất 1 kí tự")
    .max(26, "Kích thước tối đa 50 kí tự")
    .required("Kích thước không được để trống"),
});

export default function UpdateSizeForm(props: IUpdateSizeFormProps) {
  const { handleCloseDialog, size } = props;

  const defaultValues: FormUpdateSize = {
    id: "",
    name: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUpdateSize>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(size);
  }, [size]);

  const { mutate: updateSize, error } = useUpdateSize(handleCloseDialog);

  const onSubmit: SubmitHandler<FormUpdateSize> = (data) => {
    updateSize(data);
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
                    Sửa
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
