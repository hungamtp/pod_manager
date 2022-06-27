/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import { Filter } from "@/services/categories";
import useCategories from "hooks/categories/use-categories";
import useGetFactoryById from "hooks/factories/use-get-factory-by-id";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import CreateSizeColorProductForm from "@/components/manage-factory/create-size-color-product-form";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
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
  const id = router.asPath.split("id=")[1];
  const { data: responseFactory, isLoading: isLoadingFactory } =
    useGetFactoryById(Number(id));

  const [isDisabled, setIsDisabled] = React.useState(true);

  // const defaultValues: FactoryByIdDtos = {
  //   id: 0,
  //   name: "",
  //   email: "",
  //   location: "",
  //   phone: 0,
  //   image: "",
  //   productDtoList: [],
  // };

  // const form = useForm<FactoryByIdDtos>({
  //   defaultValues,
  //   resolver: yupResolver(schema),
  // });
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = form;

  // React.useEffect(() => {
  //   reset(responseFactory?.data);
  // }, [responseFactory]);

  const handleIsDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const handleOpenSizeColorDialog = (index: number) => {
    setIndex(index);
    setOpenDialog(true);
  };
  const handleOpenCreateSizeColorDialog = (
    index: number,
    productId: number
  ) => {
    setIndex(index);
    setProductId(productId);
    setOpenCreateDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };
  //   const handleChangeCategory = (event: SelectChangeEvent) => {
  //     setCategoryName(event.target.value);
  //   };

  //   const [categoryName, setCategoryName] = React.useState(
  //     responseFactory?.data.categoryName
  //   );

  const [index, setIndex] = React.useState(0);
  const [productId, setProductId] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

  return (
    <>
      {!isLoadingFactory && responseFactory && (
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
                factoryId={responseFactory?.data.id.toString()}
                productId={productId.toString()}
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
                      ].sizeColors.map((x) => (
                        <tr key={index}>
                          <td>{x.color}</td>
                          <td>{x.size}</td>
                          <td>{x.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Product Details /</span>{" "}
            Product
          </h4>
          <div className="row">
            <div className="col-md-12">
              {!isLoadingFactory && responseFactory && (
                <div className="card mb-4">
                  <h5 className="card-header">Product Details</h5>
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
                            disabled={isDisabled}
                            className="form-control"
                            type="text"
                            id="Name"
                            defaultValue={responseFactory.data.name}
                          />
                        </div>

                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            email
                          </label>
                          <input
                            disabled={isDisabled}
                            className="form-control"
                            defaultValue={responseFactory.data.email}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            address
                          </label>
                          <textarea
                            disabled={isDisabled}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={responseFactory.data.address}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            location
                          </label>
                          <textarea
                            disabled={isDisabled}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={responseFactory.data.location}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Phone Number
                          </label>
                          <input
                            disabled={isDisabled}
                            className="form-control"
                            defaultValue={responseFactory.data.phone}
                          />
                        </div>

                        {/* Small table */}

                        <hr className="my-5" />
                      </div>
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={handleIsDisabled}
                          className="btn btn-primary me-2"
                        >
                          Edit
                        </button>
                        <button type="submit" className="btn btn-primary me-2">
                          Save changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          Cancel
                        </button>
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
                <h5 className="card-header">Product</h5>
                <hr className="my-0" />
                <div className="card">
                  <div className="table-responsive text-nowrap">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>
                            <strong>id</strong>
                          </th>
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
                            <strong>description</strong>
                          </th>
                          <th>
                            <strong>Sizes&Colors</strong>
                          </th>
                        </tr>
                      </thead>
                      {responseFactory?.data.productDtoList.map((x, index) => (
                        <tbody key={x.id} className="table-border-bottom-0">
                          <tr>
                            <td>
                              <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                              <strong>{x.id}</strong>
                            </td>
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
                            <td>{x.description}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleOpenSizeColorDialog(index)}
                                className="btn btn-primary me-2"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenCreateSizeColorDialog(index, x.id)
                                }
                                className="btn btn-success me-2"
                              >
                                Create
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
