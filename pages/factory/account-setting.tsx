/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import { Filter } from "@/services/categories";
import useGetFactoryById from "hooks/factories/use-get-factory-by-id";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import CreateProductPriceForm from "@/components/manage-factory/create-product-price-form";
import CreateSizeColorProductForm from "@/components/manage-factory/create-size-color-product-form";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { nanoid } from "@reduxjs/toolkit";
import useGetProductForFactory from "hooks/factories/use-get-product-for-factory";
import useGetSizesColorsById from "hooks/products/use-get-sizes-colors-by-id";
import SizesColorsProduct from "@/components/manage-factory/size-color-product";
import { useAppSelector } from "@/components/hooks/reduxHook";
export interface AccountSettingProps {}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, " Tên cần ít nhất 1 kí tự")
    .max(26, " Tên tối đa 50 kí tự")
    .required(" Tên không được để trống"),
});

export default function AccountSetting(props: AccountSettingProps) {
  const credentialId = useAppSelector((state) => state.auth.userId);
  const [index, setIndex] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

  const { data: responseFactory, isLoading: isLoadingFactory } =
    useGetFactoryById(credentialId);
  const handleOpenSizeColorDialog = (index: number, productId: string) => {
    setIndex(index);
    setOpenDialog(true);
  };
  React.useEffect(() => {
    responseFactory?.data;
  }, [responseFactory]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogContent>
          <SizesColorsProduct
            factoryId={credentialId as string}
            index={index}
          />
        </DialogContent>
      </Dialog>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4"></h4>
          <div className="card-body">
            <div className="d-flex align-items-start align-items-sm-center gap-4">
              <img
                src={responseFactory?.data.image}
                alt="user-avatar"
                className="d-block rounded"
                height={100}
                width={100}
                id="uploadedAvatar"
              />
              <div className="button-wrapper">
                <h2>{responseFactory?.data.name}</h2>
                <p className="text-muted mb-0"></p>
              </div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="row">
            <div className="col-md-12">
              {!isLoadingFactory && responseFactory && (
                <div className="card mb-4">
                  <h4 className="card-header">Thông tin chi tiết</h4>
                  {/* Account */}

                  <div className="card-body">
                    <form id="formAccountSettings">
                      <div className="card-body">
                        <div className="d-flex align-items-start align-items-sm-center gap-4"></div>
                      </div>
                      <hr className="my-0" />
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">ID</label>
                          <input
                            disabled
                            className="form-control"
                            type="text"
                            id="ID"
                            name="ID"
                            defaultValue={responseFactory.data.id}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Tên</label>

                          <input
                            className="form-control"
                            type="text"
                            disabled
                            id="Name"
                            defaultValue={responseFactory.data.name}
                          />
                        </div>

                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            email
                          </label>
                          <input
                            disabled
                            className="form-control"
                            defaultValue={responseFactory.data.email}
                          />
                        </div>

                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Địa chỉ
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            disabled
                            rows={3}
                            defaultValue={responseFactory.data.location}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Số điện thoại
                          </label>
                          <input
                            disabled
                            className="form-control"
                            defaultValue={responseFactory.data.phone}
                          />
                        </div>

                        {/* Small table */}

                        <hr className="my-5" />
                      </div>
                    </form>
                  </div>
                  {/* /Account */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* / Content */}

        <div className="content-backdrop fade" />
      </div>
      {/* Content wrapper */}

      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                {/* Account */}
                <h4 className="card-header">
                  Sản phẩm của nhà máy đang sản xuất
                </h4>
                <hr className="my-0" />
                <div className="card">
                  <div className="table-responsive text-nowrap">
                    {!isLoadingFactory &&
                    responseFactory &&
                    responseFactory.data.productDtoList.length > 0 ? (
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>
                              <strong>Tên</strong>
                            </th>
                            <th>
                              <strong>Category</strong>
                            </th>
                            <th>
                              <strong>Hình ảnh</strong>
                            </th>
                            <th>
                              <strong>Màu và Kích thước</strong>
                            </th>
                          </tr>
                        </thead>
                        {responseFactory?.data.productDtoList.map(
                          (x, index) => (
                            <tbody key={x.id} className="table-border-bottom-0">
                              <tr>
                                <td>
                                  <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                                  <strong>{x.name}</strong>
                                </td>
                                <td>{x.categoryName}</td>
                                <td>
                                  <img
                                    src={x.productImages[0].image}
                                    width="100"
                                    height="100"
                                  />
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenSizeColorDialog(index, x.id)
                                    }
                                    className="btn btn-primary me-2"
                                  >
                                    Xem
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          )
                        )}
                      </table>
                    ) : (
                      <div className="h3 text-center p-3">
                        Nhà máy này hiện chưa có sản phẩm nào
                      </div>
                    )}
                  </div>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>

        {/* / Content */}

        <div className="content-backdrop fade" />
      </div>
    </>
  );
}
AccountSetting.Layout = MainLayout;
