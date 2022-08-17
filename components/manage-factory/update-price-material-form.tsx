/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { UpdatePriceMaterialDto } from "@/services/factories/dto/update-price-material-dto";
import { Filter } from "@/services/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useUpdatePriceMaterialProduct from "hooks/factories/use-update-price-material";
import useMaterial from "hooks/material/use-material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IUpdateProductPriceFormProps {
  handleCloseDialog: () => void;
  factoryId: string;
  productId: string;
  priceMaterial: UpdatePriceMaterialDto;
}

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
    .min(10, "Giá sản phẩm phải lớn hơn 10.000 VND")
    .required("Giá sản phẩm không được để trống"),
});

export default function UpdateProductPriceForm(
  props: IUpdateProductPriceFormProps
) {
  const { handleCloseDialog, factoryId, productId, priceMaterial } = props;
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 100,
  });
  const [material, setMaterial] = useState("");
  const { data: response, isLoading: isLoadingMaterial } = useMaterial(filter);

  const defaultValues: UpdatePriceMaterialDto = {
    price: 0,
    material: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePriceMaterialDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(priceMaterial);
    setMaterial(priceMaterial.material);
  }, [priceMaterial]);

  const onSubmit: SubmitHandler<UpdatePriceMaterialDto> = (data) => {
    const tmpData = {
      price: data.price,
      material: material,
    };
    updateProductPriceMaterial(tmpData);
  };

  const { mutate: updateProductPriceMaterial, error } =
    useUpdatePriceMaterialProduct(handleCloseDialog, factoryId, productId);

  const handleChange = (event: SelectChangeEvent) => {
    setMaterial(event.target.value);
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
                  className="col-sm-3 col-form-label"
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
                  {errors.material && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.material.message}
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
