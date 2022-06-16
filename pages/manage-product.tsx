/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import CreateForm from "@/components/manage-account/create-form";
import UpdateForm from "@/components/manage-account/update-form";
import { Filter } from "@/services/accounts";
import { Fab } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Pagination, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useProducts from "hooks/products/use-products";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateProductForm from "@/components/manage-product/create-product-form";
import useDeleteProduct from "hooks/products/use-delete-products";
import { UpdateProductDto } from "@/services/products/dto/update-product-dto";
import UpdateProductForm from "@/components/manage-product/update-product-form";
import { ProductDto } from "@/services/products/dto/get-all-products-dto";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import PublishProduct from "@/components/manage-product/publish-product-form";
import UnPublishProduct from "@/components/manage-product/un-publish-product-form";
import Link from "next/link";

export interface IManageProductProps {}
const ITEM_HEIGHT = 48;

export default function ManageProduct(props: IManageProductProps) {
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilter({ ...filter, pageNumber: value - 1 });
  };
  const { data: response, isLoading: isLoadingProduct } = useProducts(filter);
  const { mutate: deleteProduct, error } = useDeleteProduct();
  const onDelete = (id: number) => {
    deleteProduct(id);
    setOpenDeleteDialog(false);
  };
  //  menu button

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /*{form add account }*/

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  /*{form add account }*/
  const handleIsEditTrue = (product: ProductDto) => {
    console.log(product, "productttt");
    const tmpPro = {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.productImages.map((image) => image.image),
      categoryName: product.categoryName,
    };
    setProduct(tmpPro);
    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleIsEditFalse = () => {
    setIsEdit(false);
    setOpenDialog(true);
  };

  const hanldeIsDelete = (x: number) => {
    setIsDelete(x);
    setOpenDeleteDialog(true);
  };
  /* {open Publish} */
  const handleIsPublishTrue = (id: number) => {
    setIdProduct(id);
    setIsPublish(true);
    setOpenPublishDialog(true);
  };
  const handleIsPublishFalse = (id: number) => {
    setIdProduct(id);
    setIsPublish(false);
    setOpenPublishDialog(true);
  };
  const handleClosePublishDialog = () => {
    setOpenPublishDialog(false);
  };
  /* {open Publish} */

  /* {open Dialog} */
  const [isEdit, setIsEdit] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const defaultValues: UpdateProductDto = {
    id: 0,
    name: "",
    categoryName: "",
    description: "",
    images: [],
  };

  const [isPublish, setIsPublish] = useState(false);
  const [product, setProduct] = useState<UpdateProductDto>(defaultValues);
  const [isDelete, setIsDelete] = useState(0);
  const [idProduct, setIdProduct] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openPublishDialog, setOpenPublishDialog] = React.useState(false);
  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Tables /</span> Basic Tables
          </h4>
          <Fab
            className="badge bg-success"
            variant="extended"
            size="small"
            aria-label="add"
            onClick={handleIsEditFalse}
          >
            <AddIcon sx={{ mr: 1 }} />
            Create New Product
          </Fab>

          <hr className="my-4" />
          {isEdit == false && (
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title">
                {"Create New Product"}
              </DialogTitle>
              <DialogContent>
                <CreateProductForm handleCloseDialog={handleCloseDialog} />
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          )}
          {isEdit == true && (
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title">
                {"Update Product"}
              </DialogTitle>
              <DialogContent>
                <UpdateProductForm
                  product={product}
                  handleCloseDialog={handleCloseDialog}
                />
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          )}

          {isPublish == true && (
            <Dialog
              open={openPublishDialog}
              onClose={handleClosePublishDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title">
                {"Bạn có muốn unPublish sản phẩm này không?"}
              </DialogTitle>
              <DialogContent>
                <UnPublishProduct
                  idProduct={idProduct}
                  handleClosePublishDialog={handleClosePublishDialog}
                />
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          )}

          {isPublish == false && (
            <Dialog
              open={openPublishDialog}
              onClose={handleClosePublishDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title">
                {"Bạn có muốn Publish sản phẩm này không?"}
              </DialogTitle>
              <DialogContent>
                <PublishProduct
                  idProduct={idProduct}
                  handleClosePublishDialog={handleClosePublishDialog}
                />
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          )}

          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title">
              {"Bạn có muốn xóa sản phẩm này không?"}
            </DialogTitle>
            <DialogContent>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-danger"
                    color="danger"
                    onClick={() => {
                      onDelete(isDelete);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDeleteDialog}
                    autoFocus
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>

          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4">
                <i className="bx bx-menu bx-sm" />
              </a>
            </div>
            <div
              className="navbar-nav-right d-flex align-items-center"
              id="navbar-collapse"
            >
              {/* Search */}
              <div className="nav-item d-flex align-items-center w-full">
                <i className="bx bx-search fs-4 lh-0" />
                <input
                  type="text"
                  className="form-control border-0  shadow-none w-full"
                  placeholder="Search..."
                  aria-label="Search..."
                />
              </div>
              {/* /Search */}
            </div>
          </nav>
          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Products management</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Product Image</th>
                    <th>Category Name</th>
                    <th>IS Public</th>
                    <th>Description</th>
                    <th>is Delete</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingProduct &&
                    response &&
                    response.content.map((x) => (
                      <tr key={x.id}>
                        <td>{x.id}</td>

                        <td>
                          <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                          <Link href="">{x.name}</Link>
                        </td>
                        <td>
                          <img
                            src={x.productImages[0].image}
                            className="d-block rounded"
                            height={100}
                            width={100}
                          />
                        </td>
                        <td>{x.categoryName}</td>
                        <td>
                          {x.public == true && (
                            <span className="badge bg-label-info me-1">
                              TRUE
                            </span>
                          )}
                          {x.public == false && (
                            <span className="badge bg-label-danger me-1">
                              FALSE
                            </span>
                          )}
                        </td>
                        <td>{x.description}</td>

                        {/* <td>{x.productTags[0].tag.name}</td> */}
                        <td>
                          {x.deleted == true && (
                            <span className="badge bg-label-danger me-1">
                              TRUE
                            </span>
                          )}
                          {x.deleted == false && (
                            <span className="badge bg-label-primary me-1">
                              FALSE
                            </span>
                          )}
                        </td>

                        <td>
                          {x.deleted == false && (
                            <div>
                              <IconButton
                                onClick={() => {
                                  handleIsEditTrue(x);
                                  handleClose();
                                }}
                              >
                                <EditIcon fontSize="medium" color="primary" />
                              </IconButton>

                              <IconButton>
                                <DeleteIcon
                                  onClick={() => {
                                    hanldeIsDelete(x.id);
                                  }}
                                  fontSize="medium"
                                  color="error"
                                />
                              </IconButton>

                              {x.public == true && (
                                <IconButton>
                                  <PublicOffIcon
                                    onClick={() => {
                                      handleIsPublishTrue(x.id);
                                    }}
                                    fontSize="medium"
                                    color="warning"
                                  />
                                </IconButton>
                              )}
                              {x.public == false && (
                                <IconButton>
                                  <PublicIcon
                                    onClick={() => {
                                      handleIsPublishFalse(x.id);
                                    }}
                                    fontSize="medium"
                                    color="info"
                                  />
                                </IconButton>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          {/*/ Table within card */}
          <Stack spacing={2}>
            <Pagination
              shape="circular"
              size="large"
              count={response?.totalPages}
              onChange={handlePageChange}
              color="secondary"
            />
          </Stack>
          <hr className="my-5" />
          {/* Responsive Table */}

          {/*/ Responsive Table */}
        </div>
        {/* / Content */}
        {/* Footer */}
        <footer className="content-footer footer bg-footer-theme">
          <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
            <div className="mb-2 mb-md-0">
              © , made with ❤️ by
              <a
                href="https://themeselection.com"
                className="footer-link fw-bolder"
              >
                ThemeSelection
              </a>
            </div>
            <div>
              <a
                href="https://themeselection.com/license/"
                className="footer-link me-4"
              >
                License
              </a>
              <a
                href="https://themeselection.com/"
                className="footer-link me-4"
              >
                More Themes
              </a>
              <a
                href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                className="footer-link me-4"
              >
                Documentation
              </a>
              <a
                href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                className="footer-link me-4"
              >
                Support
              </a>
            </div>
          </div>
        </footer>
        {/* / Footer */}
        <div className="content-backdrop fade" />
      </div>
      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
      {/* / Layout wrapper */}
    </>
  );
}
ManageProduct.Layout = MainLayout;
