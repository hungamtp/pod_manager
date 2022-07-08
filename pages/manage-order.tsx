/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { MainLayout } from "@/components/layouts";
import CreateForm from "@/components/manage-account/create-form";
import UpdateForm from "@/components/manage-account/update-form";
import CreateColorForm from "@/components/manage-color/create-color-form";
import { Filter } from "@/services/accounts";
import { AccountDto } from "@/services/accounts/dto/get-all-accounts-dto";
import { UpdateAccountDto } from "@/services/accounts/dto/update-accounts-dto";
import { Fab } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Pagination, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useAccounts from "hooks/accounts/use-accounts";
import useDeleteAccount from "hooks/accounts/use-delete-accounts";
import useColors from "hooks/colors/use-colors";
import useFactories from "hooks/factories/use-factories";
import useSizes from "hooks/sizes/use-sizes";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
export interface IManageOrder {}

const ITEM_HEIGHT = 48;

export default function ManageOrder(props: IManageOrder) {
  const [filter, setFilter] = useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const router = useRouter();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilter({ ...filter, pageNumber: value - 1 });
  };
  const { data: response, isLoading: isLoadingAccount } = useColors(filter);
  //  menu button

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /*{form add account }*/
  const handleOpenCreate = () => {
    setOpenDialog(true);
  };

  /* {open Dialog} */
  const [openDialog, setOpenDialog] = React.useState(false);
  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h3 className="fw-bold py-3 mb-4">Đơn Hàng</h3>

          <br />
          {/* Basic Bootstrap Table */}
          <div className="card ">
            <h5 className="card-header">Quản lý đơn hàng</h5>
            <div className="table-responsive text-nowrap ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Chi Tiết</th>
                    <th>Tên sản phẩm</th>
                    <th>Hình Ảnh</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Giá đơn Hàng</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  <tr>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          router.push(`/order-details`);
                        }}
                      >
                        Chi tiết
                      </button>
                    </td>
                    <td>Áo hoodies mũ cụp</td>
                    <td>
                      <img
                        className=""
                        src="https://firebasestorage.googleapis.com/v0/b/assignment1-302217.appspot.com/o/images%2Fao-hoodies-cup-nu.jpg?alt=media&token=b458f12f-7e5e-4d2b-9663-d72d236c86d0"
                        height={100}
                        width={100}
                      />
                    </td>
                    <td
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    >
                      145 Trần Thị Cờ, Quận 9, TP. Hồ Chí Minh
                    </td>
                    <td>0914354763</td>
                    <td>
                      <strong>200.000 VND</strong>
                    </td>
                    <td style={{ textAlign: "center" }}>2</td>
                    <td>
                      <span className="badge bg-label-warning me-1">
                        Đang xử lý
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          router.push(`/order-details`);
                        }}
                      >
                        Chi tiết
                      </button>
                    </td>
                    <td>Áo hoodies mũ cụp</td>
                    <td>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/assignment1-302217.appspot.com/o/images%2Fao-hoodies-cup-nu.jpg?alt=media&token=b458f12f-7e5e-4d2b-9663-d72d236c86d0"
                        height={100}
                        width={100}
                      />
                    </td>
                    <td
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    >
                      145 Trần Thị Cờ, Quận 9, TP. Hồ Chí Minh
                    </td>
                    <td>0914354763</td>
                    <td>
                      <strong>200.000 VND</strong>
                    </td>
                    <td style={{ textAlign: "center" }}>2</td>
                    <td>
                      <span className="badge bg-label-primary me-1">
                        Đang Vận Chuyển
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          router.push(`/order-details`);
                        }}
                      >
                        Chi tiết
                      </button>
                    </td>
                    <td>Áo hoodies mũ cụp</td>
                    <td>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/assignment1-302217.appspot.com/o/images%2Fao-hoodies-cup-nu.jpg?alt=media&token=b458f12f-7e5e-4d2b-9663-d72d236c86d0"
                        height={100}
                        width={100}
                      />
                    </td>
                    <td
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    >
                      145 Trần Thị Cờ, Quận 9, TP. Hồ Chí Minh
                    </td>
                    <td>0914354763</td>
                    <td>
                      <strong>200.000 VND</strong>
                    </td>
                    <td style={{ textAlign: "center" }}>2</td>
                    <td>
                      <span className="badge bg-label-success me-1">
                        Hoàn thành
                      </span>
                    </td>
                  </tr>
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
        </div>

        <div className="content-backdrop fade" />
      </div>

      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
ManageOrder.Layout = MainLayout;
