/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { UpdateSizeDto } from "@/services/sizes/dto/update-sizes-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateSize from "hooks/sizes/use-create-sizes";
import useDeleteSize from "hooks/sizes/use-delete-sizes";
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
    .trim()
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

  const { mutate: deleteSize, error } = useDeleteSize(handleCloseDialog);

  const onSubmit: SubmitHandler<FormUpdateSize> = (data) => {
    deleteSize(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-center">
          <div className="col-sm-10 d-flex justify-content-around">
            <button className="btn btn-primary" color="primary" type="submit">
              Có
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
    </>
  );
}
