/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { CreateSizeColorProductDto } from "@/services/factories/dto/create-size-color-product-dto";
import { ColorDto } from "@/services/products/dto/get-all-colors-dtos";
import { SizeDto } from "@/services/products/dto/get-all-size-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { color } from "@mui/system";
import useCreateSizeColorProduct from "hooks/factories/use-create-factory";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface ICreateSizeColorProductFormProps {
  handleCloseDialog: () => void;
  factoryId: string;
  productId: string;
  sizes: SizeDto[];
  colors: ColorDto[];
}

type FormCreateSizeColorProduct = {
  color: string;
  size: string;
  quantity: number;
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
  quantity: yup
    .number()
    .min(10, "quantity phải lớn hơn 10")
    .required("quantity không được để trống"),
});

export default function CreateSizeColorProductForm(
  props: ICreateSizeColorProductFormProps
) {
  const [colorsList, setColorsList] = useState<string[]>([]);
  const [sizesList, setSizesList] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof colorsList>) => {
    const {
      target: { value },
    } = event;

    setColorsList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeSize = (event: SelectChangeEvent<typeof sizesList>) => {
    const {
      target: { value },
    } = event;

    setSizesList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { handleCloseDialog, factoryId, productId, sizes, colors } = props;

  const defaultValues: { quantity: number } = {
    quantity: 0,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ quantity: number }>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { mutate: addSizeColorProduct, error } = useCreateSizeColorProduct(
    handleCloseDialog,
    factoryId,
    productId
  );

  const onSubmit: SubmitHandler<{ quantity: number }> = (data) => {
    const quantity = data.quantity;
    const submitData: CreateSizeColorProductDto[] = [];
    colorsList.forEach((color) => {
      sizesList.forEach((size) => {
        submitData.push({ size: size, colorImage: color, quantity: quantity });
      });
    });
    console.log(submitData, "dataaa");
    // addSizeColorProduct(submitData, {
    //   onError: (error: any) => {
    //     console.log(error.response.data.errorMessage);
    //   },
    // });
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
                  Color
                </label>

                <FormControl sx={{ mb: 1, width: 400 }}>
                  <Select
                    multiple
                    disableUnderline
                    displayEmpty
                    value={colorsList}
                    onChange={handleChange}
                    variant="standard"
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return selected;
                      }

                      return selected.map((color) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={color}
                          width={30}
                          height={30}
                          className="rounded-circle border"
                          src={
                            "https://images.printify.com/5853fec7ce46f30f8328200a"
                          }
                          style={{
                            backgroundColor: color,
                            marginRight: "0.5rem",
                            opacity: "0.8",
                          }}
                          alt={color}
                        />
                      ));
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {colors.map((color) => (
                      <MenuItem
                        key={color.name}
                        value={color.imageColor}
                        className="d-flex justify-content-between"
                      >
                        <p className="m-0">{color.name}</p>
                        <img
                          key={color.name}
                          width={30}
                          height={30}
                          className="rounded-circle border"
                          src={
                            "https://images.printify.com/5853fec7ce46f30f8328200a"
                          }
                          style={{
                            backgroundColor: color.imageColor,
                            opacity: "0.8",
                          }}
                          alt={color.name}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Sizes
                </label>
                <FormControl sx={{ mb: 1, width: 400 }}>
                  <Select
                    multiple
                    disableUnderline
                    displayEmpty
                    value={sizesList}
                    onChange={handleChangeSize}
                    variant="standard"
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return selected;
                      }

                      return (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      );
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {sizes.map((size) => (
                      <MenuItem
                        key={size.name}
                        value={size.name}
                        className="d-flex justify-content-between"
                      >
                        {size.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Quantity
                </label>

                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    ></span>
                    <input
                      type="number"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("quantity")}
                    />
                  </div>
                  {errors.quantity && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.quantity.message}
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
                    CREATE
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
                    type="button"
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
