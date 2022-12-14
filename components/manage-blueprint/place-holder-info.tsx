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
  handleToggle: () => void;
}
const get2Decimal = (num: number): number => {
  return Number(Number(num).toFixed(2));
};

const PlaceHolderInfo = ({
  uploadBackgroundImage,
  changeWidth,
  handleToggle,
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
      <div className="p-3">
        <p className="h5">Th??ng tin khu v???c in</p>
        <div className="p-2">
          <div className="row">
            <div className="d-flex w-100 p-0">
              <div className="w-50 me-4">Chi???u r???ng</div>
              <div className="w-50">Chi???u d??i</div>
            </div>
          </div>
          <div className="row">
            <div className="d-flex w-100 p-0">
              <div className="w-50 me-4">
                <div className="d-flex ">
                  <SingleInputMemo
                    type="number"
                    handleChange={handleChangeWidth}
                    defaultVal={get2Decimal(blueprint.width) + ""}
                  />
                  <span className="custom-input-tag">cm</span>
                </div>
              </div>
              <div className="w-50">
                <div className="d-flex ">
                  <SingleInputMemo
                    type="number"
                    handleChange={handleChangeHeight}
                    defaultVal={get2Decimal(blueprint.height) + ""}
                  />
                  <span className="custom-input-tag">cm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="d-flex w-100 p-0 mt-2">
              <button
                onClick={() => {
                  executeRate();
                }}
                className="btn btn-secondary w-50"
              >
                ??p d???ng
              </button>
            </div>
          </div>

          <div className="row mt-4">
            <div className="d-flex w-100 p-0">
              <div className="w-50">M???t ??o</div>
            </div>
          </div>

          <div className="row">
            <div className="d-flex w-100 p-0">
              <div className="w-50">
                <div className="d-flex ">
                  <select
                    className="form-select custom-input"
                    aria-label="Default select example"
                    {...register("position")}
                  >
                    <option value="back">Sau</option>
                    <option value="front">Tr?????c</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 ">
          <UploadImage
            handleToggle={handleToggle}
            uploadBackgroundImage={uploadBackgroundImage}
          />
        </div>
        {blueprint.key && (
          <button
            type="button"
            className="btn btn-primary "
            onClick={handleSubmit(onSubmit)}
          >
            L??u l???i
          </button>
        )}
      </div>
    </div>
  );
};
const PlaceHolderInfoMemo = React.memo(PlaceHolderInfo);

export default PlaceHolderInfoMemo;
