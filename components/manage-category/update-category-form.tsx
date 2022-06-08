import { UpdateAccountDto } from "@/services/accounts/dto/update-accounts-dto";
import { UpdateCategoryDto } from "@/services/categories/dto/update-categories-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useUpdateAccount from "hooks/accounts/use-update-account";
import useUpdateCategory from "hooks/categories/use-update-categories";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IUpdateCategoryFormProps {
  handleCloseDialog: () => void;
  category: UpdateCategoryDto;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  image: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
});

export default function UpdateCategoryForm(props: IUpdateCategoryFormProps) {
  const { handleCloseDialog, category } = props;

  const defaultValues: UpdateCategoryDto = {
    id: 0,
    name: "",
    image: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCategoryDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(category);
  }, [category]);

  const { mutate: updateCategory, error } =
    useUpdateCategory(handleCloseDialog);

  const onSubmit: SubmitHandler<UpdateCategoryDto> = (data) => {
    const submitData = {
      ...data,
      id: category.id,
    } as UpdateCategoryDto;
    updateCategory(submitData);
    console.log(submitData, "data");
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
                  Category Name
                </label>

                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    >
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      placeholder="Hoodies"
                      aria-label="Hoodies"
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
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Image
                </label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    >
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      placeholder="Image link"
                      aria-label="Image link"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("image")}
                    />
                  </div>
                  {errors.image && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.image.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-primary"
                    color="primary"
                  >
                    UPDATE
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
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
