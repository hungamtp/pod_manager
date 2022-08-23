/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { CreateSizeColorProductDto } from "@/services/factories/dto/create-size-color-product-dto";
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useColors from "hooks/colors/use-colors";
import useCreateSizesColorsForProduct from "hooks/products/use-create-sizes-colors-for-produt";
import useSizes from "hooks/sizes/use-sizes";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export interface ICreateNewSizeColorForProductFormProps {
  handleCloseDialog: () => void;
  id: string;
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

export default function CreateNewSizeColorForProductForm(
  props: ICreateNewSizeColorForProductFormProps
) {
  const { handleCloseDialog, id } = props;
  const [colorsList, setColorsList] = useState<string[]>([]);
  const [sizesList, setSizesList] = useState<string[]>([]);
  const { data: colors } = useColors({ pageNumber: 0, pageSize: 100 });
  const { data: sizes } = useSizes({ pageNumber: 0, pageSize: 100 });
  const { mutate: addSizesColorsForProduct } = useCreateSizesColorsForProduct(
    handleCloseDialog,
    id
  );
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

  const onSubmit = () => {
    const submitColors = colorsList.map((color) => {
      return color.split("-")[0];
    });
    const submitData = {
      colors: submitColors,
      sizes: sizesList,
    };
    addSizesColorsForProduct(submitData);
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
            <div className="row mb-3">
              <label
                className="col-sm-2 col-form-label text-capitalize fs-6"
                htmlFor="basic-icon-default-fullname"
              >
                Màu
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
                        key={color.split("-")[1]}
                        width={30}
                        height={30}
                        className="rounded-circle border"
                        src={
                          "https://images.printify.com/5853fec7ce46f30f8328200a"
                        }
                        style={{
                          backgroundColor: color.split("-")[1],
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
                  {colors?.content.map((color) => (
                    <MenuItem
                      key={color.name}
                      value={`${color.name}-${color.imageColor}`}
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
                className="col-sm-2 col-form-label text-capitalize fs-6"
                htmlFor="basic-icon-default-fullname"
              >
                Kích thước
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
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    );
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {sizes?.content.map((size) => (
                    <MenuItem
                      key={size.id}
                      value={size.name}
                      className="d-flex justify-content-between"
                    >
                      {size.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="d-flex justify-content-center">
              <div className="col-sm-10 d-flex justify-content-around">
                <button
                  className="btn btn-primary"
                  color="primary"
                  type="submit"
                  onClick={onSubmit}
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
          </div>
        </div>
      </div>
    </>
  );
}
