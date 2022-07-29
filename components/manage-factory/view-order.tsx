/* eslint-disable jsx-a11y/alt-text */

import { getOrdersDetailResponse } from "@/services/factories/dto/get-orders-detail-dto";
import { ProductSizeDto } from "@/services/products/dto/product-size-dto";
import { Box } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import Image from "next/image";
import { useState } from "react";
/* eslint-disable @next/next/no-css-tags */
export interface IViewOrderProps {
  setIsViewOrder: (isViewOrder: boolean) => void;
  responseOrderDetails: getOrdersDetailResponse;
  sizeProductResponse: ProductSizeDto[];
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
  { name: "inch", value: 1 },
  { name: "cm", value: 2.54 },
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
}: IViewOrderProps) {
  const [measurementType, setMeasurementType] = useState<{
    name: string;
    value: number;
  }>({ name: "inch", value: 1 });
  const data = responseOrderDetails.data;

  console.log(sizeProductResponse, "sizeProductResponse");
  //nho can phai load het nha
  return (
    <div className="container-xxl w-80p flex-grow-1 container-p-y ">
      <div className="card ">
        <div className="d-flex justify-content-between p-4">
          <h4 className="">Chi tiết đơn hàng</h4>
          <button
            className="btn btn-primary py-0"
            onClick={() => {
              setIsViewOrder(false);
            }}
          >
            Trở về
          </button>
        </div>
        {/* Account */}

        <div className="card-body">
          <div id="pdfPart">
            <hr className="my-0" />
            <div className="row">
              <div className="mb-3 col-md-12">
                <div className="d-flex flex-wrap">
                  {data.bluePrintDtos.map((blueprint) => {
                    let renderedImage = data.previewImages[0];
                    const renderedColor = data.previewImages[0].color;
                    data.previewImages.forEach((image) => {
                      if (
                        image.position === blueprint.position &&
                        image.color === renderedColor
                      ) {
                        renderedImage = image;
                      }
                    });
                    let renderData: RenderedData[] = [];
                    blueprint.designInfos.forEach((designInfos) => {
                      const designInfosData: DesignInfoData[] = [];

                      sizeProductResponse.forEach((sizeData) => {
                        const width =
                          (designInfos.width * sizeData.width) /
                          blueprint.placeholder.width;
                        const height =
                          (designInfos.height * sizeData.height) /
                          blueprint.placeholder.height;
                        const top =
                          ((((sizeData.width * 2) / 100) *
                            blueprint.placeholder.heightRate) /
                            100) *
                            designInfos.topPosition +
                          2;
                        const left =
                          ((((sizeData.width * 2) / 100) *
                            blueprint.placeholder.widthRate) /
                            100) *
                          designInfos.leftPosition;
                        const newRenderedData = {
                          size: sizeData.size,
                          width: to2Decimals(width * measurementType.value),
                          height: to2Decimals(height * measurementType.value),
                          left: to2Decimals(left * measurementType.value),
                          top: to2Decimals(top * measurementType.value),
                        };

                        designInfosData.push(newRenderedData);
                      });

                      const newDesignInfo: RenderedData = {
                        name: designInfos.name,
                        rotate: designInfos.rotate,
                        src: designInfos.src,
                        type: designInfos.types,
                        textColor: designInfos.textColor,
                        font: designInfos.font,
                        data: designInfosData,
                      };
                      renderData.push(newDesignInfo);
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
                                width={2000}
                                height={2000}
                                objectFit="cover"
                              />
                            </div>
                            <p className="h3">Các mẫu thiết kế</p>
                            {renderData.length > 0 &&
                              renderData.map((designData) => (
                                <div key={designData.name} className="row">
                                  {designData.type !== "text" ? (
                                    <div className={`col-lg-4`}>
                                      <div
                                        onClick={() =>
                                          save(designData.name, designData.src)
                                        }
                                      >
                                        <Image
                                          src={designData.src}
                                          alt="Picture of the author"
                                          width={1000}
                                          height={1000}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="col-md-4">
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

                                  <div className="col-md-8">
                                    <>
                                      {designData.type !== "text" && (
                                        <>
                                          <p className="h5">Thông tin mô tả</p>
                                          <div className="row mb-5">
                                            <>
                                              <div className="col-6 h6">
                                                Tên thiết kế: {designData.name}
                                              </div>
                                              <div className="col-6 h6 mt-2">
                                                Độ xoay: {designData.rotate}
                                              </div>
                                            </>
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
                                        <div className="w-100">
                                          <div className=" border p-2 ">
                                            Kích thước
                                          </div>
                                          <div className=" border p-2 ">
                                            Cách cổ ({measurementType.name})
                                          </div>
                                          <div className=" border p-2 ">
                                            Chiều rộng ({measurementType.name})
                                          </div>
                                          <div className=" border p-2 ">
                                            Chiều dài ({measurementType.name})
                                          </div>
                                          <div className=" border p-2 ">
                                            Cách trái ({measurementType.name})
                                          </div>
                                        </div>
                                        {designData.data.map((data) => (
                                          <div key={data.size} className="w-50">
                                            <div className=" border p-2">
                                              {data.size}
                                            </div>
                                            <div className=" border p-2">
                                              {data.top}
                                            </div>
                                            <div className=" border p-2">
                                              {data.width}
                                            </div>
                                            <div className=" border p-2">
                                              {data.height}
                                            </div>

                                            <div className=" border p-2">
                                              {data.left}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  </div>
                                </div>
                              ))}
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

              <hr className="my-5" />
            </div>
          </div>
        </div>
        {/* /Account */}
      </div>
    </div>
  );
}
