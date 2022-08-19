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
import { Filter } from "@/services/factories";
import { UpdateFactoryDto } from "@/services/factories/dto/update-factory-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
/* eslint-disable @next/next/no-css-tags */
import { SubmitHandler } from "react-hook-form";
import useUpdateFactory from "hooks/factories/use-update-factory";
import { FactoryInfo } from "@/services/factories/dto/get-factory-by-id-dto";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
import { Skeleton } from "@mui/material";

/* eslint-disable @next/next/no-css-tags */
export interface FactoryDetailsProps {}

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, " Tên nhà in cần ít nhất 3 kí tự")
    .max(50, " Tên nhà in tối đa 50 kí tự")
    .required(" Tên nhà in không được để trống"),
  address: yup
    .string()
    .trim()
    .min(10, "Địa chỉ cần ít nhất 10 kí tự")
    .max(300, "Địa chỉ tối đa 300 kí tự")
    .required("Địa chỉ không được để trống"),
  phone: yup
    .string()
    .trim()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Số điện thoại gồm 10 số và bắt đầu từ 0"
    )
    .required("Số điện thoại không được để trống"),
  tradeDiscount: yup
    .number()
    .typeError("Vui lòng nhập số")
    .min(5, "Chiết khấu cần ít nhất 1 %")
    .max(50, "Chiết khấu tối đa 50 %")
    .required("Chiết khấu không được để trống"),
});

export default function FactoryDetails(props: FactoryDetailsProps) {
  const router = useRouter();
  const factoryId = router.asPath.split("id=")[2];
  // const id = router.asPath.split("factoryid=")[1];
  const { id } = router.query;
  const [filter, setFilter] = React.useState<Filter>({
    search: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: responseFactory, isLoading: isLoadingFactory } =
    useGetFactoryById(id as string, filter);
  const { mutate: updateFactory, isSuccess } = useUpdateFactory();
  const [isEditFactory, setIsEditFactory] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [factoryInfo, setFactoryInfo] = React.useState<FactoryInfo>();
  const [isUpdateFactoryInfo, setIsUpdateFactoryInfo] = React.useState(true);
  React.useEffect(() => {
    if (responseFactory && isUpdateFactoryInfo) {
      console.log(responseFactory, "responseFactory");
      const factoryInfo: FactoryInfo = {
        id: responseFactory.data.id,
        name: responseFactory.data.name,
        email: responseFactory.data.email,
        location: responseFactory.data.location,
        address: responseFactory.data.address,
        phone: responseFactory.data.phone,
        image: responseFactory.data.image,
        tradeDiscount: responseFactory.data.tradeDiscount,
      };
      setFactoryInfo(factoryInfo);
    }
  }, [responseFactory]);
  const defaultValues: UpdateFactoryDto = {
    id: "",
    name: "",
    tradeDiscount: 0,
    phone: "",
    address: "",
  };
  const form = useForm<UpdateFactoryDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  React.useEffect(() => {
    if (factoryInfo && isUpdateFactoryInfo) {
      reset(factoryInfo);
      setIsUpdateFactoryInfo(false);
    }
  }, [factoryInfo]);

  const handleEditFactory = () => {
    setIsEditFactory(true);
    setIsDisabled(false);
  };

  const onSubmit: SubmitHandler<UpdateFactoryDto> = (data) => {
    updateFactory(
      { ...data, id: id as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("GetFactoryById");
          enqueueSnackbar("Cập nhật nhà in thành công!", {
            autoHideDuration: 3000,
            variant: "success",
          });
          setIsUpdateFactoryInfo(true);
        },
      }
    );
    setIsEditFactory(false);
    setIsDisabled(true);
  };

  return (
    <>
      <div>
        {isLoadingFactory && (
          <div>
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"></h4>
              <div className="card-body">
                <div className="d-flex align-items-start align-items-sm-center gap-4">
                  <Skeleton width={100} height={100} />
                  <div className="button-wrapper">
                    <h2>
                      <Skeleton width={130} height={50} />{" "}
                    </h2>
                    <p className="text-muted mb-0"></p>
                  </div>
                </div>
              </div>
              <hr className="my-0" />
              <div className="row">
                <div className="col-md-12">
                  <div className="card mb-4">
                    <h4 className="card-header">
                      <Skeleton width="20%" height={40} />
                    </h4>
                    {/* Account */}

                    <div className="card-body">
                      <form id="formAccountSettings">
                        <div className="card-body">
                          <div className="d-flex align-items-start align-items-sm-center gap-4"></div>
                        </div>
                        <hr className="my-0" />
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              <Skeleton width={30} height={30} />
                            </label>
                            <Skeleton height={60} />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              <Skeleton width={30} height={30} />
                            </label>

                            <Skeleton height={60} />
                          </div>

                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="organization"
                              className="form-label"
                            >
                              <Skeleton width={30} height={30} />
                            </label>
                            <Skeleton height={60} />
                          </div>

                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="organization"
                              className="form-label"
                            >
                              <Skeleton width={30} height={30} />
                            </label>
                            <Skeleton height={60} />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="organization"
                              className="form-label"
                            >
                              <Skeleton width={30} height={30} />
                            </label>
                            <Skeleton height={60} />
                          </div>
                          <div className="mb-3 col-md-1">
                            <label className="form-label ">
                              <Skeleton width={30} height={30} />
                            </label>
                            <div className="position-relative">
                              <Skeleton height={60} />
                            </div>
                          </div>
                          {/* Small table */}

                          <hr className="my-5" />
                        </div>
                      </form>
                    </div>
                    {/* /Account */}
                  </div>
                </div>
              </div>
            </div>

            {/* / Content */}

            <div className="content-backdrop fade" />
          </div>
        )}
        {!isLoadingFactory && factoryInfo && (
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4"></h4>
            <div className="card-body">
              <div className="d-flex align-items-start align-items-sm-center gap-4">
                <img
                  src={factoryInfo?.image}
                  alt="user-avatar"
                  className="d-block rounded"
                  height={100}
                  width={100}
                  id="uploadedAvatar"
                />
                <div className="button-wrapper">
                  <h2>{factoryInfo?.name}</h2>
                  <p className="text-muted mb-0"></p>
                </div>
              </div>
            </div>
            <hr className="my-0" />
            <div className="row">
              <div className="col-md-12">
                {factoryInfo && (
                  <div className="card mb-4">
                    <h4 className="card-header">Thông tin chi tiết</h4>
                    {/* Account */}

                    <div className="card-body">
                      <form
                        id="formAccountSettings"
                        onSubmit={handleSubmit(onSubmit)}
                      >
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
                              defaultValue={factoryInfo.id}
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">Tên</label>

                            <input
                              className="form-control"
                              type="text"
                              disabled={isDisabled}
                              defaultValue={factoryInfo.name}
                              {...register("name")}
                            />
                            {errors.name && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errors.name.message}
                              </span>
                            )}
                          </div>

                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="organization"
                              className="form-label"
                            >
                              Email
                            </label>
                            <input
                              disabled
                              className="form-control"
                              defaultValue={factoryInfo.email}
                            />
                          </div>

                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="organization"
                              className="form-label"
                            >
                              Địa chỉ
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              disabled={isDisabled}
                              rows={3}
                              defaultValue={factoryInfo.location}
                              {...register("address")}
                            />
                            {errors.address && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errors.address.message}
                              </span>
                            )}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="organization"
                              className="form-label"
                            >
                              Số điện thoại
                            </label>
                            <input
                              disabled={isDisabled}
                              className="form-control"
                              defaultValue={factoryInfo.phone}
                              {...register("phone")}
                            />
                            {errors.phone && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errors.phone.message}
                              </span>
                            )}
                          </div>
                          <div className="mb-3 col-md-1">
                            <label className="form-label ">Chiết khấu</label>
                            <div className="position-relative mt-3">
                              <input
                                disabled={isDisabled}
                                className="form-control position-absolute top-50 start-50 translate-middle "
                                defaultValue={factoryInfo.tradeDiscount}
                                {...register("tradeDiscount")}
                              />
                              <p className="position-absolute top-50 end-0 translate-middle-y pe-3">
                                %
                              </p>
                            </div>
                            {errors.tradeDiscount && (
                              <span
                                id="error-pwd-message"
                                className="text-danger mt-4 position-absolute col-md-7"
                              >
                                {errors.tradeDiscount.message}
                              </span>
                            )}
                          </div>

                          {/* Small table */}
                          <hr className="my-5" />
                        </div>
                        <div className="mt-2">
                          {isEditFactory === false && (
                            <button
                              type="button"
                              onClick={() => {
                                handleEditFactory();
                              }}
                              className="btn btn-primary me-2"
                            >
                              Chỉnh sửa
                            </button>
                          )}
                          {isEditFactory && (
                            <button
                              type="submit"
                              className="btn btn-primary me-2"
                            >
                              Lưu thay đổi
                            </button>
                          )}

                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              router.push("manage-factory");
                            }}
                          >
                            Trở về
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
        )}
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
                  Sản phẩm của nhà in đang sản xuất
                </h4>
                <hr className="my-0" />
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
                      <form
                        onSubmit={(e: any) => {
                          e.preventDefault();
                          setFilter((state) => ({
                            ...state,
                            search: e.target[0].value,
                          }));
                        }}
                        className="form-control border-0 shadow-none w-full"
                      >
                        <input
                          type="text"
                          className="form-control border-0  shadow-none w-full"
                          placeholder="Tên sản phẩm..."
                          aria-label="Search..."
                        />
                      </form>
                    </div>
                    {/* /Search */}
                  </div>
                </nav>
                <br />
                <div className="card">
                  {responseFactory && (
                    <ProductOfFactory
                      responseFactory={responseFactory}
                      id={factoryId}
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
                  Sản phẩm chưa được nhà in sản xuất
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
