/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { UpdateMaterialDto } from "@/services/material/dto/update-material-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import useUpdateMaterial from "hooks/material/use-update-material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IUpdateMaterialFormProps {
  handleCloseDialog: () => void;
  material: UpdateMaterialDto;
}

type FormUpdateMaterial = {
  id: string;
  name: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, "Chất liệu cần ít nhất 1 kí tự")
    .max(50, "Chất liệu tối đa 50 kí tự")
    .required("Chất liệu không được để trống"),
});

export default function UpdateMaterialForm(props: IUpdateMaterialFormProps) {
  const { handleCloseDialog, material } = props;

  const defaultValues: FormUpdateMaterial = {
    id: "",
    name: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUpdateMaterial>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(material);
  }, [material]);

  const { mutate: updateMaterial, error } =
    useUpdateMaterial(handleCloseDialog);

  const onSubmit: SubmitHandler<FormUpdateMaterial> = (data) => {
    updateMaterial(data);
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
                  Chất liệu áo
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
