/* eslint-disable jsx-a11y/alt-text */

import { getOrdersDetailResponse } from "@/services/factories/dto/get-orders-detail-dto";
import { ProductSizeDto } from "@/services/products/dto/product-size-dto";
import { nanoid } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
/* eslint-disable @next/next/no-css-tags */
export interface IViewOrderProps {
  setIsViewOrder: (isViewOrder: boolean) => void;
  responseOrderDetails: getOrdersDetailResponse;
  sizeProductResponse: ProductSizeDto[];
  renderColor: string;
}

export interface RenderedData {
  name: string;
  type: string;
  rotate: number;
  data: DesignInfoData[];
  src: string;
  font?: string;
  textColor?: string;
}
export interface DesignInfoData {
  size: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

const to2Decimals = (num: number) => {
  return Number(parseFloat(num.toString()).toFixed(2));
};

const measurementList = [
  { name: "cm", value: 1 },
  { name: "inch", value: 1 / 2.54 },
];

function save(filename: string, data: string) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = (event) => {
    const blob = xhr.response;
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  };
  xhr.open("GET", data);
  xhr.send();
}

export default function ViewOrder({
  setIsViewOrder,
  responseOrderDetails,
  sizeProductResponse,
  renderColor,
}: IViewOrderProps) {
  const [measurementType, setMeasurementType] = useState<{
    name: string;
    value: number;
  }>({ name: "cm", value: 1 });
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [sizeDataOfL, setSizeDataOfL] = useState<ProductSizeDto>(
    sizeProductResponse[0]
  );

  useEffect(() => {
    if (sizeProductResponse) {
      let sizeL = sizeProductResponse[0];
      sizeProductResponse.forEach((sizeData) => {
        if (sizeData.size === "L" || sizeData.size === "l") {
          sizeL = sizeData;
        }
      });
      setSizeDataOfL(sizeL);
    }
  }, [sizeProductResponse]);

  const data = responseOrderDetails.data;

  //nho can phai load het nha
  return (
    <div className="card ">
      <div className="d-flex justify-content-between p-4">
        <button
          className="btn btn-secondary p-2 px-4"
          onClick={() => {
            setIsViewOrder(false);
          }}
        >
          Trở về
        </button>
        <button
          className="btn btn-primary p-2 px-4"
          onClick={() => {
            handlePrint();
          }}
        >
          Tải về
        </button>
      </div>
      {/* Account */}

      <div className="card-body" ref={componentRef}>
        <hr className="my-0" />
        <div className="row">
          <div className="mb-3 col-lg-12">
            <div className="d-flex flex-wrap">
              {data.bluePrintDtos.map((blueprint, index) => {
                let renderedImage = data.previewImages[index];
                data.previewImages.forEach((image) => {
                  if (
                    image.position === blueprint.position &&
                    image.color === renderColor
                  ) {
                    renderedImage = image;
                  }
                });

                return (
                  <>
                    {blueprint.designInfos.length > 0 ? (
                      <div key={nanoid()}>
                        <div className=" row w-75 mx-auto position-relative">
                          <div className="h1 text-center position-absolute headline">
                            {blueprint.position === "front"
                              ? "Mặt trước"
                              : "Mặt sau"}
                          </div>
                          <Image
                            src={renderedImage.image}
                            alt="Picture of the author"
                            width={4000}
                            height={4000}
                            objectFit="cover"
                          />
                        </div>
                        <div>
                          <div style={{ pageBreakAfter: "always" }} />
                          <div>&nbsp;</div>
                        </div>

                        {blueprint.designInfos.map((designData, index) => {
                          const leftPos = to2Decimals(
                            (sizeDataOfL.width - blueprint.placeholder.width) /
                              2 +
                              (blueprint.placeholder.width / 100) *
                                (designData.leftPosition < 0
                                  ? 0
                                  : designData.leftPosition)
                          );

                          const topPos = to2Decimals(
                            (sizeDataOfL.height / 100) *
                              (designData.topPosition < 0
                                ? 0
                                : designData.topPosition) +
                              7.6
                          );
                          return (
                            <>
                              {designData.types === "text" && index !== 0 && (
                                <div>
                                  <div
                                    style={{
                                      pageBreakBefore: "always",
                                    }}
                                  />
                                  <div>&nbsp;</div>
                                </div>
                              )}
                              {index === 0 && (
                                <p className="h3">Các mẫu thiết kế</p>
                              )}
                              <div key={designData.name} className="row mt-5">
                                {designData.types !== "text" ? (
                                  <div className={`col-lg-4`}>
                                    <div
                                      onClick={() =>
                                        save(designData.name, designData.src)
                                      }
                                    >
                                      <Image
                                        src={designData.src}
                                        alt="Picture of the author"
                                        width={300}
                                        height={300}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="col-lg-4">
                                    <div className="row mb-5">
                                      <p className="h5">Thông tin mô tả</p>
                                      <div className="mt-2">
                                        Nội dung: {designData.src}
                                      </div>
                                      <div className="mt-2">
                                        Font chữ: {designData.font}
                                      </div>
                                      <div className="mt-2">
                                        Màu chữ: {designData.textColor}
                                      </div>
                                      <div className="mt-2">
                                        Độ xoay: {designData.rotate}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="col-lg-8">
                                  <>
                                    {designData.types !== "text" && (
                                      <>
                                        <p className="h5">Thông tin mô tả</p>
                                        <div className="mb-5 d-flex">
                                          <div className="col-6">
                                            <div className=" h6">
                                              Tên thiết kế: {designData.name}
                                            </div>
                                            <div className=" h6">
                                              Độ xoay: {designData.rotate}
                                            </div>
                                          </div>
                                          <a
                                            href={designData.src}
                                            target="blank"
                                          >
                                            Link hình
                                          </a>
                                        </div>
                                      </>
                                    )}

                                    <div className="d-flex justify-content-between pe-0">
                                      <p className="h5">Thông tin số đo</p>
                                      <div className="d-flex justify-content-end w-25">
                                        <p className=" m-auto ">Đơn vị:</p>
                                        <select
                                          className="form-select w-50  mb-1"
                                          aria-label="Default select example"
                                          value={measurementType.value}
                                          onChange={(e: any) => {
                                            const selectedOption =
                                              e.target.options[
                                                e.target.selectedIndex
                                              ];
                                            setMeasurementType({
                                              name: selectedOption.innerHTML,
                                              value: selectedOption.value,
                                            });
                                          }}
                                        >
                                          {measurementList.map(
                                            (measurement) => (
                                              <option
                                                key={measurement.name}
                                                value={measurement.value}
                                              >
                                                {measurement.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>
                                    </div>

                                    <div className="d-flex">
                                      <div className="w-50">
                                        <div className=" border p-2 ">
                                          Cách cổ áo
                                        </div>
                                        <div className=" border p-2 ">
                                          Chiều rộng
                                        </div>
                                        <div className=" border p-2 ">
                                          Chiều dài
                                        </div>
                                        <div className=" border p-2 ">
                                          Cách thân trái
                                        </div>
                                      </div>
                                      <div
                                        key={designData.name}
                                        className="w-50"
                                      >
                                        <div className=" border p-2">
                                          {topPos * measurementType.value}{" "}
                                          {measurementType.name}
                                        </div>
                                        <div className=" border p-2">
                                          {to2Decimals(
                                            designData.width *
                                              measurementType.value
                                          )}{" "}
                                          {measurementType.name}
                                        </div>
                                        <div className=" border p-2">
                                          {to2Decimals(
                                            designData.height *
                                              measurementType.value
                                          )}{" "}
                                          {measurementType.name}
                                        </div>
                                        <div className=" border p-2">
                                          {leftPos * measurementType.value}{" "}
                                          {measurementType.name}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                </div>
                              </div>
                            </>
                          );
                        })}
                        <br />

                        <hr />
                        {index !== data.bluePrintDtos.length - 1 && (
                          <div>
                            <div style={{ pageBreakAfter: "always" }} />
                            <div>&nbsp;</div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </div>
          </div>

          {/* Small table */}
        </div>
      </div>
      {/* /Account */}
    </div>
  );
}
