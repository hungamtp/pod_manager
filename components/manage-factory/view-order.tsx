/* eslint-disable jsx-a11y/alt-text */

import { getOrdersDetailResponse } from "@/services/factories/dto/get-orders-detail-dto";
import { Box } from "@mui/material";
import useGetSizeProductByProductId from "hooks/products/use-get-product-size-by-productId";
import Image from "next/image";

/* eslint-disable @next/next/no-css-tags */
export interface IViewOrderProps {
  setIsViewOrder: (isViewOrder: boolean) => void;
  responseOrderDetails: getOrdersDetailResponse;
}

export default function ViewOrder({
  setIsViewOrder,
  responseOrderDetails,
}: IViewOrderProps) {
  const data = responseOrderDetails.data;
  const { data: sizeProductResponse, isLoading: isLoadingSizeProductResponse } =
    useGetSizeProductByProductId(data.productId);

  console.log(sizeProductResponse, "sizeProductResponse");
  return (
    <div>
      <div className="card mb-4">
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
                    data.previewImages.forEach((image) => {
                      if (image.position === blueprint.position) {
                        renderedImage = image;
                      }
                    });
                    return (
                      <div key={renderedImage.position}>
                        {sizeProductResponse && (
                          <div className="row">
                            <div className="col-6">
                              <Image
                                src={renderedImage.image}
                                alt="Picture of the author"
                                width={1100}
                                height={1100}
                                objectFit="cover"
                              />
                            </div>
                            {/* <p className="h5">
                          Mọi thông số liên quan tới kích thước đều dựa trên
                          size L của áo mẫu
                        </p> */}
                            <div className="col-6">
                              <p className="h3 mt-5">Thông tin khu vực in</p>
                              <>
                                <div className="col-8">
                                  <div className="row">
                                    <div className="col-2 border p-2">
                                      Số đo/Kích thước
                                    </div>
                                    {sizeProductResponse.map((size) => (
                                      <div
                                        key={size.id}
                                        className="col-2 border p-2"
                                      >
                                        {size}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="col-2 border p-2">
                                    chiều dài
                                  </div>
                                  <div className="col-2 border p-2">
                                    Cách trên
                                  </div>
                                  <div className="col-2 border p-2">{}</div>
                                  <div className="col-2 border p-2">
                                    Bề ngang
                                  </div>
                                  <div className="col-2 border p-2">{}</div>
                                </div>
                              </>
                            </div>
                          </div>
                        )}
                        <p className="h3 pb-4 mt-5">Các mẫu thiết kế</p>
                        <div className="d-flex justify-content-start flex-wrap">
                          {blueprint.designInfos.map((design) => (
                            <>
                              <div key={design.src} className="row col-4">
                                <div className="col-4">
                                  {design.types === "text" ? (
                                    <p className="h2 bg-light p-2">
                                      {design.src}
                                    </p>
                                  ) : (
                                    <Image
                                      src={design.src}
                                      alt="Picture of the author"
                                      width={100}
                                      height={100}
                                    />
                                  )}
                                </div>
                                <div className="col-8 row">
                                  <div className="col-4 border p-2">
                                    Cách trái
                                  </div>
                                  <div className="col-8 border p-2">{}</div>
                                  <div className="col-4 border p-2">
                                    Cách trên
                                  </div>
                                  <div className="col-8 border p-2">{}</div>
                                  <div className="col-4 border p-2">
                                    Bề ngang
                                  </div>
                                  <div className="col-8 border p-2">{}</div>
                                </div>
                              </div>
                              <div key={design.src} className="row col-4">
                                <div className="col-4">
                                  {design.types === "text" ? (
                                    <p className="h2">{design.src}</p>
                                  ) : (
                                    <Image
                                      src={design.src}
                                      alt="Picture of the author"
                                      width={100}
                                      height={100}
                                    />
                                  )}
                                </div>
                                <div className="col-8 row">
                                  <div className="col-4 border p-2">
                                    Cách trái
                                  </div>
                                  <div className="col-8 border p-2">{}</div>
                                  <div className="col-4 border p-2">
                                    Cách trên
                                  </div>
                                  <div className="col-8 border p-2">{}</div>
                                  <div className="col-4 border p-2">
                                    Bề ngang
                                  </div>
                                  <div className="col-8 border p-2">{}</div>
                                </div>
                              </div>
                              <div key={design.src} className="row col-4">
                                <div className="col-4">
                                  {design.types === "text" ? (
                                    <p className="h2">{design.src}</p>
                                  ) : (
                                    <Image
                                      src={design.src}
                                      alt="Picture of the author"
                                      width={100}
                                      height={100}
                                    />
                                  )}
                                </div>
                                <div className="col-8 row">
                                  <div className="col-4 border p-2">
                                    Cách trái
                                  </div>
                                  <div className="col-8 border p-2">{}</div>
                                  <div className="col-4 border p-2">
                                    Cách trên
                                  </div>
                                  <div className="col-8 border p-2">{}</div>
                                  <div className="col-4 border p-2">
                                    Bề ngang
                                  </div>
                                  <div className="col-8 border p-2">{}</div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>

                        {/* 
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Số điện thoại
                          </label>
                          <input disabled className="form-control" />
                        </div> */}
                      </div>
                    );
                  })}
                </div>
                <input disabled className="form-control" />
              </div>

              {/* Small table */}

              <hr className="my-5" />

              <div>
                <Box sx={{ width: "100%" }}></Box>
              </div>
            </div>
          </div>
        </div>
        {/* /Account */}
      </div>
    </div>
  );
}
