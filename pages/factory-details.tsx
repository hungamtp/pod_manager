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
export interface FactoryDetailsProps {}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, " Name cần ít nhất 1 kí tự")
    .max(26, " Name tối đa 50 kí tự")
    .required(" Name không được để trống"),
});

export default function FactoryDetails(props: FactoryDetailsProps) {
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const router = useRouter();
  const factoryId = router.asPath.split("id=")[2];
  const { id } = router.query;
  const { data: responseFactory, isLoading: isLoadingFactory } =
    useGetFactoryById(id as string);
  const { data: responseProductForFactory, isLoading: isLoadingProForFactory } =
    useGetProductForFactory(factoryId);
  const [index, setIndex] = React.useState(0);
  const [productId, setProductId] = React.useState("");
  const [productForFactoryId, setProductForFactoryId] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openCreatePriceDialog, setOpenCreatePriceDialog] =
    React.useState(false);
  const { data: responseSizesColorById, isLoading: isLoadingSizeColorById } =
    useGetSizesColorsById(productId);

  React.useEffect(() => {
    responseFactory?.data;
  }, [responseFactory]);

  React.useEffect(() => {
    productId;
  }, [productId]);

  const handleOpenSizeColorDialog = (index: number, productId: string) => {
    setProductId(productId);
    setIndex(index);
    setOpenDialog(true);
  };
  const handleOpenCreateSizeColorDialog = (
    index: number,
    productId: string
  ) => {
    setIndex(index);
    setProductId(productId);
    setOpenCreateDialog(true);
  };

  const handleOpenCreatePriceDialog = (index: number, productId: string) => {
    setIndex(index);
    setProductForFactoryId(productId);
    setProductId(productId);
    setOpenCreatePriceDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };
  const handleCloseCreatePriceDialog = () => {
    setOpenCreatePriceDialog(false);
  };

  return (
    <>
      {!isLoadingFactory &&
        !isLoadingSizeColorById &&
        responseFactory &&
        responseSizesColorById && (
          <>
            <>
              <Dialog
                open={openCreateDialog}
                onClose={handleCloseCreateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
              >
                <DialogContent>
                  <CreateSizeColorProductForm
                    handleCloseDialog={handleCloseCreateDialog}
                    factoryId={responseFactory?.data.id}
                    productId={productId}
                    colors={responseSizesColorById?.data.colors}
                    sizes={responseSizesColorById.data.sizes}
                  />
                </DialogContent>
              </Dialog>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
              >
                <DialogContent>
                  <div className="card">
                    <h5 className="card-header">Size-Color</h5>
                    <div className="table-responsive text-nowrap">
                      {!isLoadingFactory &&
                      responseFactory &&
                      responseFactory.data.productDtoList[index].sizeColors
                        .length > 0 ? (
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>
                                <strong>color</strong>
                              </th>
                              <th>
                                <strong>Size</strong>
                              </th>
                              <th>
                                <strong>quantity</strong>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {responseFactory.data.productDtoList[
                              index
                            ]?.sizeColors.map((x) => (
                              <tr key={nanoid()}>
                                <td>{x.colorImage}</td>
                                <td>{x.size}</td>
                                <td>{x.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="h4 text-center p-3">
                          This product does not have any Sizes-Colors yet
                        </div>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </>
            <>
              <Dialog
                open={openCreatePriceDialog}
                onClose={handleCloseCreatePriceDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
              >
                <DialogContent>
                  <CreateProductPriceForm
                    handleCloseDialog={handleCloseCreatePriceDialog}
                    factoryId={responseFactory?.data.id}
                    productId={productForFactoryId}
                  />
                </DialogContent>
              </Dialog>
            </>
          </>
        )}

      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Manage Factory /</span>{" "}
            Factory Details
          </h4>
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
                  <h5 className="card-header">Factory Details</h5>
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
                          <label className="form-label">Name</label>

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
                            location
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
                            Phone Number
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
                <h5 className="card-header">Product By Factory</h5>
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
                              <strong>Name</strong>
                            </th>
                            <th>
                              <strong>category Name</strong>
                            </th>
                            <th>
                              <strong>Image</strong>
                            </th>
                            <th>
                              <strong>Sizes&Colors</strong>
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
                                    View
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenCreateSizeColorDialog(
                                        index,
                                        x.id
                                      )
                                    }
                                    className="btn btn-success me-2"
                                  >
                                    Create
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          )
                        )}
                      </table>
                    ) : (
                      <div className="h3 text-center p-3">
                        Factory does not have any product yet
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

      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                {/* Account */}
                <h5 className="card-header">
                  Product For Factory Does not have
                </h5>
                <hr className="my-0" />
                <div className="card">
                  <div className="table-responsive text-nowrap">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>
                            <strong>Name</strong>
                          </th>
                          <th>
                            <strong>Action</strong>
                          </th>
                        </tr>
                      </thead>
                      {responseProductForFactory?.data.map((x, index) => (
                        <tbody key={index} className="table-border-bottom-0">
                          <tr>
                            <td>
                              <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                              <strong>{x.name}</strong>
                            </td>

                            <td>
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenCreatePriceDialog(index, x.id)
                                }
                                className="btn btn-primary me-2"
                              >
                                Add Price
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
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
      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
FactoryDetails.Layout = MainLayout;
