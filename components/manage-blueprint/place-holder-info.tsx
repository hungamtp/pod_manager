import { Blueprint } from "@/models/blueprint";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppSelector } from "../hooks/reduxHook";
import { UploadImage } from "./upload-image";

export interface IPlaceHolderInfoProps {
  uploadBackgroundImage: (tmpSrc: string, src: string) => void;
}
const get2Decimal = (num: number): number => {
  return Number(Number(num).toFixed(2));
};

const schema = yup.object().shape({
  width: yup
    .number()
    .min(6, "Chiều rộng tối thiểu là 6 inches")
    .max(30, "Chiều rộng tối đa là 30 inches")
    .required(" Chiều rộng không được để trống"),
  height: yup
    .number()
    .min(6, "Chiều dài tối thiểu là 6 inches")
    .max(30, "Chiều dài tối đa là 30 inches")
    .required(" Chiều dài không được để trống"),
});

const PlaceHolderInfo = ({ uploadBackgroundImage }: IPlaceHolderInfoProps) => {
  let designPosInitVal: {
    top: number;
    left: number;
    scale: number;
    rotate: number;
  } = { top: 0, left: 0, scale: 0, rotate: 0 };
  const defaultValues = {
    width: 14,
    height: 16,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ width: number; height: number }>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const blueprint = useAppSelector((state) => state.blueprint);

  return (
    <div>
      <div key={blueprint.key} className="mb-6 bg-white border  cursor-pointer">
        <div className="py-3 ps-4 pe-2">
          <table className="w-full p-5 text-gray-700">
            <tbody>
              <tr className="">
                <td>Width</td>
                <td>Height</td>
              </tr>
              <tr className="">
                <td className=" pe-4">
                  <div className="d-flex ">
                    <input
                      type="number"
                      className="custom-input"
                      aria-label="Inches (with dot and two decimal places)"
                      {...register("width")}
                    />
                    <span className="custom-input-tag">in</span>
                  </div>
                </td>
                <td className=" pe-4">
                  <div className="d-flex ">
                    <input
                      type="number"
                      className="custom-input"
                      aria-label="Inches (with dot and two decimal places)"
                      {...register("height")}
                    />
                    <span className="custom-input-tag">in</span>
                  </div>
                </td>
              </tr>
              <tr className="">
                <td>
                  <div className="mt-3">Top</div>
                </td>
                <td>
                  <div className="mt-3">Mặt</div>
                </td>
              </tr>
              <tr>
                <td className=" pe-4">
                  <div className="d-flex ">
                    <input
                      type="number"
                      className="custom-input"
                      aria-label="Inches (with dot and two decimal places)"
                      value={blueprint.topRate}
                    />
                    <span className="custom-input-tag">%</span>
                  </div>
                </td>
                <td className=" pe-4">
                  <div className="d-flex ">
                    <select
                      className="form-select custom-input"
                      aria-label="Default select example"
                    >
                      <option selected value="front">
                        Trước
                      </option>
                      <option value="back">Sau</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr></tr>
            </tbody>
          </table>

          <div className="mt-5 ">
            <UploadImage uploadBackgroundImage={uploadBackgroundImage} />
          </div>
          <button type="button" className="btn btn-primary ">
            Lưu lại
          </button>
        </div>
      </div>
    </div>
  );
};
const PlaceHolderInfoMemo = React.memo(PlaceHolderInfo);

export default PlaceHolderInfoMemo;
