/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import useGetFactoryById from "hooks/factories/use-get-factory-by-id";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import ProductNotSupport from "@/components/manage-factory/product-not-support";
import ProductOfFactory from "@/components/manage-factory/product-of-factory";
export interface FactoryDetailsProps {}

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(1, " Tên nhà máy cần ít nhất 1 kí tự")
    .max(26, " Tên nhà máy tối đa 50 kí tự")
    .required(" Tên nhà máy không được để trống"),
});

export default function FactoryDetails(props: FactoryDetailsProps) {
  const router = useRouter();
  const factoryId = router.asPath.split("id=")[2];
  // const id = router.asPath.split("factoryid=")[1];
  const { id } = router.query;
  const { data: responseFactory, isLoading: isLoadingFactory } =
    useGetFactoryById(id as string);

  React.useEffect(() => {
    responseFactory?.data;
  }, [responseFactory]);
  return (
    <>
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
                  {responseFactory && (
                    <ProductOfFactory
                      responseFactory={responseFactory}
                      factoryId={id}
                    />
                  )}
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>
        {/* / Content */}
        <div className="content-backdrop fade" />
      </div>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                {/* Account */}
                <h5 className="card-header">
                  Sản phẩm chưa được nhà máy sản xuất
                </h5>
                <hr className="my-0" />
                <div className="card">
                  {responseFactory && (
                    <ProductNotSupport
                      responseFactory={responseFactory}
                      factoryId={factoryId}
                    />
                  )}
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>

        {/* / Content */}

        <div className="content-backdrop fade" />
      </div>
      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
FactoryDetails.Layout = MainLayout;
