/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { numberWithCommas } from "@/helpers/number-util";
import { CreateSizeColorProductDto } from "@/services/factories/dto/create-size-color-product-dto";
import { ProductDto } from "@/services/factories/dto/get-factory-by-id-dto";
import {
  ColorDto,
  ColorOfProductDto,
} from "@/services/products/dto/get-all-colors-dtos";
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
import useColorSize from "hooks/sizes/use-get-color-size";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface ICreateSizeColorProductFormProps {
  handleCloseDialog: () => void;
  factoryId: string;
  productId: string;
  colors: ColorOfProductDto[];
  productInfo: ProductDto | any;
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
    .typeError("Vui lòng nhập số")
    .min(10, "Số lượng sản phẩm phải lớn hơn 10")
    .required("Số lượng sản phẩm không được để trống"),
});

export default function CreateSizeColorProductForm(
  props: ICreateSizeColorProductFormProps
) {
  const { handleCloseDialog, factoryId, productId, colors, productInfo } =
    props;

  const { data: responseColorSize, isLoading: isloadingColorSize } =
    useColorSize(productId);
  const [getProduct, setGetProduct] = useState<ProductDto>();

  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    setGetProduct(productInfo);
  }, [productInfo]);

  useEffect(() => {
    if (responseColorSize) {
      setSelectedColor(responseColorSize[0].color.split("-")[1]);
    }
  }, [responseColorSize]);

  useEffect(() => {
    if (responseColorSize) {
      let sizeList = responseColorSize[0].sizes;
      responseColorSize.forEach((data) => {
        if (data.color.split("-")[1] === selectedColor) {
          sizeList = data.sizes;
        }
      });
      setSizesList([]);
      setDropdownSizesList(sizeList);
    }
  }, [selectedColor]);

  const [sizesList, setSizesList] = useState<string[]>([]);
  const [dropdownSizesList, setDropdownSizesList] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setSelectedColor(
      // On autofill we get a stringified value.
      value
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
    sizesList.forEach((size) => {
      submitData.push({
        size: size,
        colorImage: selectedColor,
        quantity: quantity,
      });
    });
    addSizeColorProduct(submitData);
    // addSizeColorProduct(submitData, {
    //   onError: (error: any) => {
    //     console.log(error.response.data.errorMessage);
    //   },
    // });
  };

  return (
    <>
      <div className="col-xxl">
        <h4 className="text-center">
          Tạo Kích thước, màu và số lượng cho sản phẩm
        </h4>
        <div className="card mb-4">
          <div className="card-body">
            {getProduct && (
              <div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <img
                      className="rounded border border-secondary"
                      src={getProduct.productImages[0].image}
                      width="100"
                    />
                  </div>
                  <div className="col-sm-9">
                    <div>
                      <label className="col-form-label text-capitalize fs-6 me-2">
                        Tên sản phẩm:
                      </label>
                      {getProduct.name}
                    </div>
                    <div>
                      <label className="col-form-label text-capitalize fs-6 me-2">
                        Chất liệu:
                      </label>
                      {getProduct.material}
                    </div>
                    <div>
                      <label className="col-form-label text-capitalize fs-6 me-2">
                        Giá:
                      </label>
                      {numberWithCommas(getProduct.price)} VNĐ
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-fullname"
                >
                  Màu
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge border border-light rounded">
                    <FormControl sx={{ marginLeft: 1, width: 400 }}>
                      <Select
                        disableUnderline
                        displayEmpty
                        value={selectedColor}
                        onChange={handleChange}
                        variant="standard"
                        renderValue={(selected) => {
                          return (
                            <img
                              key={selected}
                              width={30}
                              height={30}
                              className="rounded-circle border"
                              src={
                                "https://images.printify.com/5853fec7ce46f30f8328200a"
                              }
                              style={{
                                backgroundColor: selected,
                                marginRight: "0.5rem",
                                opacity: "0.8",
                              }}
                              alt={selected}
                            />
                          );
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {colors.map((color) => (
                          <MenuItem
                            key={color.name}
                            value={color.image}
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
                                backgroundColor: color.image,
                                opacity: "0.8",
                              }}
                              alt={color.name}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-fullname"
                >
                  Kích thước
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge border border-light rounded">
                    <FormControl sx={{ marginLeft: 1, width: 400 }}>
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
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
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
                        {dropdownSizesList.map((size) => (
                          <MenuItem
                            key={size}
                            value={size}
                            className="d-flex justify-content-between"
                          >
                            {size}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-fullname"
                >
                  Số lượng
                </label>

                <div className="col-sm-9">
                  <div className="input-group input-group-merge ">
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
