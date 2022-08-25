/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { CreatePriceMaterialDto } from "@/services/factories/dto/create-price-material-dto";
import { Filter } from "@/services/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useCreateProductPrice from "hooks/factories/use-create-product-price";
import useMaterial from "hooks/material/use-material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
export interface ICreateProductPriceFormProps {
  handleCloseDialog: () => void;
  factoryId: string;
  productId: string;
  proName: string;
}

type FormCreateProductPrice = {
  price: number;
};

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
    .typeError("Vui lòng nhập số")
    .min(10000, "Giá sản phẩm phải lớn hơn 10.000 VND")
    .required("Giá sản phẩm không được để trống"),
});

export default function CreateProductPriceForm(
  props: ICreateProductPriceFormProps
) {
  const { handleCloseDialog, factoryId, productId, proName } = props;
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 100,
  });
  const [material, setMaterial] = useState("");
  const { data: response, isLoading: isLoadingMaterial } = useMaterial(filter);
  const defaultValues: CreatePriceMaterialDto = {
    price: 10000,
    material: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePriceMaterialDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let tmpMaterial = "";
    if (response && response?.totalElements > 0) {
      tmpMaterial = response.content[0].name || "";
    }
    setMaterial(tmpMaterial);
  }, [response]);

  const onSubmit: SubmitHandler<CreatePriceMaterialDto> = (data) => {
    addProductPrice({ ...data, material: material });
  };

  const { mutate: addProductPrice, error } = useCreateProductPrice(
    handleCloseDialog,
    factoryId,
    productId
  );

  const handleChange = (event: SelectChangeEvent) => {
    setMaterial(event.target.value);
  };

  return (
    <>
      <div className="col-xxl">
        <h4 className="text-center">Thêm giá và chất liệu sản phẩm</h4>
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label
                  className="col-sm-4 col-form-label text-capitalize fs-5"
                  htmlFor="basic-icon-default-fullname"
                >
                  Tên sản phẩm:
                </label>
                <div className="col-sm-8">
                  <div className="input-group input-group-merge">
                    <div className="col-form-label text-capitalize fs-5 fw-normal">
                      {proName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label text-capitalize fs-6"
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
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-fullname"
                >
                  Chất liệu vải
                </label>
                <div className="col-sm-9">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Chất liệu</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={material}
                      onChange={handleChange}
                    >
                      {!isLoadingMaterial &&
                        response &&
                        response.content.map((material) => (
                          <MenuItem
                            className="d-flex flex-column"
                            key={material.name}
                            value={material.name}
                          >
                            {material.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {/* {material === "" && (
                    <span id="error-pwd-message" className="text-danger">
                      {"Hãy chọn chất liệu vãi"}
                    </span>
                  )} */}
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
