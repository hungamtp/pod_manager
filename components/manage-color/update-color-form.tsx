/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { UpdateColorDto } from "@/services/colors/dto/update-colors-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateColor from "hooks/colors/use-create-colors";
import useUpdateColor from "hooks/colors/use-update-colors";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IUpdateColorFormProps {
  handleCloseDialog: () => void;
  color: UpdateColorDto;
}

type FormUpdateColor = {
  id: string;
  name: string;
  imageColor: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Màu cần ít nhất 1 kí tự")
    .max(26, "Màu tối đa 50 kí tự")
    .required("Màu không được để trống"),
});

export default function UpdateColorForm(props: IUpdateColorFormProps) {
  const { handleCloseDialog, color } = props;

  const defaultValues: FormUpdateColor = {
    id: "",
    name: "",
    imageColor: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUpdateColor>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({ ...color, imageColor: color.imageColor });
  }, [color]);

  const { mutate: updateColor, error } = useUpdateColor(handleCloseDialog);

  const onSubmit: SubmitHandler<FormUpdateColor> = (data) => {
    updateColor(data);
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
                  Tên màu
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
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Chọn màu
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <input
                      type="color"
                      className="form-control"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("imageColor")}
                    />
                  </div>
                  {errors.imageColor && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.imageColor.message}
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
