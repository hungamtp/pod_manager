import { setRealHeight, setRealWidth } from "@/redux/slices/blueprints";
import useCreateProductBlueprint from "hooks/products/use-create-product-blueprint";
import useUpdateProductBlueprint from "hooks/products/use-update-product-blueprint";
import { useRouter } from "next/router";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import SingleInputMemo from "./single-input";
import { UploadImage } from "./upload-image";

export interface IPlaceHolderInfoProps {
  uploadBackgroundImage: (tmpSrc: string, src: string) => void;
  changeWidth: (widthRate: number) => void;
}
const get2Decimal = (num: number): number => {
  return Number(Number(num).toFixed(2));
};

const PlaceHolderInfo = ({
  uploadBackgroundImage,
  changeWidth,
}: IPlaceHolderInfoProps) => {
  const dispatch = useAppDispatch();

  const blueprint = useAppSelector((state) => state.blueprint);

  const defaultValues = {
    width: blueprint.width || 14,
    height: blueprint.height || 14,
    position: blueprint.position || "front",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ position: string }>({
    defaultValues,
  });

  const handleChangeWidth = (data: string) => {
    const width = Number(data);
    dispatch(setRealWidth(width));
  };
  const handleChangeHeight = (data: string) => {
    const height = Number(data);
    dispatch(setRealHeight(height));
  };

  const executeRate = () => {
    const newWidthRate = ((blueprint.width / blueprint.maxWidth) * 100) / 2;
    changeWidth(newWidthRate);
  };

  const router = useRouter();

  const productId = router.asPath.split("productId=")[1];

  const { mutate: createProductBlueprint } =
    useCreateProductBlueprint(productId);

  const { mutate: updateProductBlueprint } = useUpdateProductBlueprint();

  const onSubmit: SubmitHandler<{ position: string }> = ({ position }) => {
    const submitData = {
      frameImage: blueprint.src,
      position: position,
      placeHolderTop: blueprint.topRate,
      placeHolderWidth: blueprint.width,
      placeHolderHeight: blueprint.height,
      widthRate: blueprint.widthRate,
      heightRate: blueprint.heightRate,
    };
    console.log(blueprint, "blueprint.isEdit");
    if (blueprint.isEdit) {
      updateProductBlueprint({ ...submitData, id: blueprint.blueprintId });
    } else {
      createProductBlueprint(submitData);
    }
  };

  return (
    <div
      key={blueprint.position}
      className="mb-6 bg-white border  cursor-pointer"
    >
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
                  <SingleInputMemo
                    type="number"
                    handleChange={handleChangeWidth}
                    defaultVal={get2Decimal(blueprint.width) + ""}
                  />
                  <span className="custom-input-tag">in</span>
                </div>
              </td>
              <td className=" pe-4">
                <div className="d-flex ">
                  <SingleInputMemo
                    type="number"
                    handleChange={handleChangeHeight}
                    defaultVal={get2Decimal(blueprint.height) + ""}
                  />
                  <span className="custom-input-tag">in</span>
                </div>
              </td>
            </tr>
            <tr className="">
              <td>
                <div className="mt-3"></div>
              </td>
            </tr>
            <tr className="">
              <td className=" pe-4">
                <div className="d-flex ">
                  <button
                    onClick={() => {
                      executeRate();
                    }}
                    className="btn btn-secondary"
                  >
                    Áp dụng
                  </button>
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
                    {...register("position")}
                  >
                    <option value="back">Sau</option>
                    <option value="front">Trước</option>
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
        {blueprint.key && (
          <button
            type="button"
            className="btn btn-primary "
            onClick={handleSubmit(onSubmit)}
          >
            Lưu lại
          </button>
        )}
      </div>
    </div>
  );
};
const PlaceHolderInfoMemo = React.memo(PlaceHolderInfo);

export default PlaceHolderInfoMemo;
