import { nanoid } from "@reduxjs/toolkit";
import useGetFactoryById from "hooks/factories/use-get-factory-by-id";
import * as React from "react";

export interface ISizesColorsProductProps {
  index: number;
  factoryId: string;
}

export default function SizesColorsProduct(props: ISizesColorsProductProps) {
  const { index, factoryId } = props;
  const { data: responseFactory, isLoading: isLoadingFactory } =
    useGetFactoryById(factoryId);

  return (
    <>
      <div className="card">
        <h5 className="card-header">Bảng Thông tin</h5>
        <div className="table-responsive text-nowrap">
          {!isLoadingFactory &&
          responseFactory &&
          responseFactory.data.productDtoList[index].sizeColors.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>
                    <strong>Màu</strong>
                  </th>
                  <th>
                    <strong>Kích thước</strong>
                  </th>
                  <th>
                    <strong>Số lượng</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {responseFactory.data.productDtoList[index]?.sizeColors.map(
                  (x) => (
                    <tr key={nanoid()}>
                      <td>{x.colorImage}</td>
                      <td>{x.size}</td>
                      <td>{x.quantity}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <div className="h4 text-center p-3">
              Sản phẩm này tạm thời chưa có dữ liệu
            </div>
          )}
        </div>
      </div>
    </>
  );
}
