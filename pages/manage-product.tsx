/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import CreateProductForm from "@/components/manage-product/create-product-form";
import PublishProduct from "@/components/manage-product/publish-product-form";
import UnPublishProduct from "@/components/manage-product/un-publish-product-form";
import UpdateProductForm from "@/components/manage-product/update-product-form";
import { Filter } from "@/services/products";
import { ProductDto } from "@/services/products/dto/get-all-products-dto";
import { UpdateProductDto } from "@/services/products/dto/update-product-dto";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import {
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useDeleteProduct from "hooks/products/use-delete-products";
import useProducts from "hooks/products/use-products";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
export interface IManageProductProps {}
const ITEM_HEIGHT = 48;

export default function ManageProduct(props: IManageProductProps) {
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
    search: "",
    searchValues: "",
  });
  const [searchValue, setSearchValue] = React.useState("name");
  const { data: response, isLoading: isLoadingProduct } = useProducts(filter);

  const inputHandler = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setFilter({ ...filter, search: lowerCase });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilter({ ...filter, pageNumber: value - 1 });
  };

  const handleSearchClick = (event: SelectChangeEvent) => {
    setSearchValue(event.target.value);
    setFilter({ ...filter, searchValues: event.target.value });
  };

  React.useEffect(() => {
    setFilter({ ...filter, searchValues: searchValue });
  }, [response]);

  const { mutate: deleteProduct, error } = useDeleteProduct();
  const onDelete = (id: string) => {
    deleteProduct(id);
    setOpenDeleteDialog(false);
  };
  //  menu button

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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

  const hanldeIsDelete = (x: string) => {
    setIsDelete(x);
    setOpenDeleteDialog(true);
  };
  /* {open Publish} */
  const handleIsPublishTrue = (id: string) => {
    setIdProduct(id);
    setIsPublish(true);
    setOpenPublishDialog(true);
  };
  const handleIsPublishFalse = (id: string) => {
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
    id: "",
    name: "",
    categoryName: "",
    description: "",
    images: [],
  };
  const router = useRouter();
  const [isPublish, setIsPublish] = useState(false);
  const [product, setProduct] = useState<UpdateProductDto>(defaultValues);
  const [isDelete, setIsDelete] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openPublishDialog, setOpenPublishDialog] = React.useState(false);

  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h3 className="fw-bold py-3 mb-4">Sản phẩm thô</h3>
          <button
            className="btn btn-success ms-4 text-dark"
            onClick={handleIsEditFalse}
          >
            <AddIcon sx={{ mr: 1 }} />
            Tạo mới sản phẩm thô
          </button>

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
                {"Tạo mới sản phẩm thô"}
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
                {"Chỉnh sửa sản phẩm"}
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
                {"Bạn có muốn ngừng công bố sản phẩm thô này không?"}
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
                {"Bạn có muốn công bố sản phẩm thô này không?"}
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
              {"Bạn có muốn xóa sản phẩm thô này không?"}
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
                    Xóa
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDeleteDialog}
                    autoFocus
                  >
                    không
                  </button>
                </div>
              </div>
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>

          {/* Dialog */}
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
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={searchValue}
                  label="Role"
                  onChange={handleSearchClick}
                  inputProps={{
                    disableUnderline: true,
                  }}
                  variant="standard"
                >
                  <MenuItem className="d-flex flex-column" value="name">
                    Tên
                  </MenuItem>
                  <MenuItem className="d-flex flex-column" value="categoryName">
                    Thể loại
                  </MenuItem>
                </Select>
              </FormControl>
              {/* Search */}
              <div className="nav-item d-flex align-items-center w-full">
                <i className="bx bx-search fs-4 lh-0" />
                <input
                  type="text"
                  onChange={inputHandler}
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
            <h4 className="card-header">Quản lý sản phẩm thô</h4>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Thể loại</th>
                    <th>Publish</th>
                    <th>Mô tả sản phẩm</th>
                    <th>Delete</th>
                    <th>hành động</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {!isLoadingProduct &&
                    response &&
                    response.content.map((x) => (
                      <tr key={x.id}>
                        <td>
                          <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                          <strong>
                            <Link href={`/product-details?id=${x.id}`}>
                              {x.name}
                            </Link>
                          </strong>
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
                        <td
                          style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                          }}
                        >
                          {x.description}{" "}
                        </td>

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
                              {/* <IconButton
                                onClick={() => {
                                  handleIsEditTrue(x);
                                  handleClose();
                                }}
                              >
                                <EditIcon fontSize="medium" color="primary" />
                              </IconButton> */}

                              <IconButton
                                onClick={() => {
                                  hanldeIsDelete(x.id);
                                }}
                              >
                                <DeleteIcon fontSize="medium" color="error" />
                              </IconButton>

                              {x.public == true && (
                                <IconButton
                                  onClick={() => {
                                    handleIsPublishTrue(x.id);
                                  }}
                                >
                                  <PublicOffIcon
                                    fontSize="medium"
                                    color="warning"
                                  />
                                </IconButton>
                              )}
                              {x.public == false && (
                                <IconButton
                                  onClick={() => {
                                    handleIsPublishFalse(x.id);
                                  }}
                                >
                                  <PublicIcon fontSize="medium" color="info" />
                                </IconButton>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                router.push(`/product-details?id=${x.id}`);
                              }}
                            >
                              Chi tiết
                            </button>
                          </div>
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
              page={filter.pageNumber + 1}
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
