/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import { storage } from "@/firebase/firebase";
import { AccountByIdDtos } from "@/services/accounts/dto/get-accounts-by-id-dto";
import { UpdateAccountDto } from "@/services/accounts/dto/update-accounts-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { Email, Phone } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useGetAccountById from "hooks/accounts/use-get-accounts-by-id";
import useUpdateImageAccount from "hooks/accounts/use-update-image";
import useUpdateProfile from "hooks/accounts/use-update-profile";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as yup from "yup";

export interface IAccountSettingProps {}

const schema = yup.object().shape({
  userFirstName: yup
    .string()
    .min(1, "Tên cần ít nhất 1 kí tự")
    .max(26, "Tên tối đa 26 kí tự")
    .required("Tên không được để trống"),
  userLastName: yup
    .string()
    .min(1, "Họ cần ít nhất 1 kí tự")
    .max(26, "Họ tối đa 26 kí tự")
    .required("Họ không được để trống"),
  email: yup
    .string()
    .email()
    .min(8, "Tài khoản cần ít nhất 8 kí tự")
    .max(50, "Tài khoản tối đa 50 kí tự")
    .required("Tài khoản không được để trống"),
  phone: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Số điện thoại gồm 10 số và bắt đầu từ 0"
    )
    .required("Số điện thoại không được để trống"),
  address: yup
    .string()
    .min(10, "Địa chỉ cần ít nhất 10 kí tự")
    .max(300, "Địa chỉ tối đa 300 kí tự")
    .required("Địa chỉ không được để trống"),
});

export default function AccountSetting(props: IAccountSettingProps) {
  const credentialId = useAppSelector((state) => state.auth.userId);
  const { data: responseAccount, isLoading: isLoadingAccount } =
    useGetAccountById(credentialId);
  const { mutate: updateImageAccount, error } = useUpdateImageAccount();
  const [isEditAccount, setIsEditAccount] = React.useState(false);
  const { mutate: updateProfile } = useUpdateProfile();
  const maxNumber = 69;
  const [images, setImages] = React.useState<ImageListType>([
    { data_url: responseAccount?.data.image },
  ]);
  const [isDisable, setIsDisable] = React.useState(true);

  const handleEditAccount = () => {
    setIsEditAccount(true);
    setIsDisable(false);
  };

  const defaultValues: AccountByIdDtos = {
    id: "",
    image: "",
    userFirstName: "",
    userLastName: "",
    name: "",
    email: "",
    roleName: "",
    phone: 0,
    address: "",
    userStatus: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountByIdDtos>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(responseAccount?.data);
    setImages([{ data_url: responseAccount?.data.image }]);
  }, [responseAccount]);

  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };

  const onUploadImage = (image: string) => {
    if (images !== null && images[0].data_url !== responseAccount?.data.image) {
      const file = images[0].file;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const submitData = {
            id: credentialId,
            image: url,
          };
          updateImageAccount(submitData);
        });
      });
    } else {
      const submitData = {
        id: credentialId,
        image: images[0].data_url,
      };
      updateImageAccount(submitData);
    }
  };

  const onSubmit: SubmitHandler<AccountByIdDtos> = (data) => {
    onUploadImage(data.image);
    const tmpData = {
      id: data.id,
      firstName: data.userFirstName,
      lastName: data.userLastName,
      address: data.address,
      phone: data.phone.toString(),
      roleName: data.roleName,
      email: data.email,
      image: data.image,
    };
    updateProfile(tmpData);
    setIsEditAccount(false);
    setIsDisable(true);
  };
  return (
    <>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4"></h4>
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <h4 className="card-header">Thông tin cá nhân</h4>
                {/* Account */}
                <div className="card-body">
                  {!isLoadingAccount && responseAccount && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="d-flex align-items-start align-items-sm-center gap-4">
                        {images && (
                          <ImageUploading
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                          >
                            {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                            }) => (
                              // write your building UI
                              <div className="upload__image-wrapper">
                                {imageList?.map((image, index) => (
                                  <img
                                    alt="user-avatar"
                                    key={index}
                                    src={image["data_url"]}
                                    height={100}
                                    width={100}
                                    className="me-2 border border-secondary rounded-3 "
                                    {...register("image")}
                                  />
                                ))}
                                {isEditAccount && (
                                  <button
                                    className="btn btn-primary me-2  ms-2 mt-5"
                                    style={
                                      isDragging ? { color: "red" } : undefined
                                    }
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    type="button"
                                  >
                                    Tải lên
                                  </button>
                                )}
                                {/* <button
                                  onClick={() => onUploadImage("")}
                                  className="btn btn-primary me-2  ms-2 mt-5"
                                >
                                  Lưu
                                </button> */}
                              </div>
                            )}
                          </ImageUploading>
                        )}
                      </div>
                      <hr className="my-0 mt-3 mb-3" />
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label htmlFor="firstName" className="form-label">
                            Id
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="firstName"
                            disabled
                            defaultValue={responseAccount.data.id}
                            {...register("id")}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="firstName" className="form-label">
                            Tên
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="firstName"
                            defaultValue={responseAccount.data.userFirstName}
                            disabled={isDisable}
                            {...register("userFirstName")}
                          />
                          {errors.userFirstName && (
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
                              {errors.userFirstName.message}
                            </span>
                          )}
                        </div>

                        <div className="mb-3 col-md-6">
                          <label htmlFor="lastName" className="form-label">
                            Họ
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="lastName"
                            disabled={isDisable}
                            defaultValue={responseAccount.data.userLastName}
                            {...register("userLastName")}
                          />
                          {errors.userLastName && (
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
                              {errors.userLastName.message}
                            </span>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="email" className="form-label">
                            E-mail
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="email"
                            defaultValue={responseAccount.data.email}
                            disabled
                            {...register("email")}
                          />
                          {errors.email && (
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
                              {errors.email.message}
                            </span>
                          )}
                        </div>

                        <div className="mb-3 col-md-6">
                          <label className="form-label" htmlFor="phoneNumber">
                            Số điện thoại
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="phoneNumber"
                              className="form-control"
                              defaultValue={responseAccount.data.phone}
                              disabled={isDisable}
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
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="address" className="form-label">
                            Địa chỉ
                          </label>
                          <textarea
                            className="form-control"
                            id="address"
                            rows={3}
                            disabled={isDisable}
                            defaultValue={responseAccount.data.address}
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
                          <label htmlFor="state" className="form-label">
                            Vị trí
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="state"
                            defaultValue={responseAccount.data.roleName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        {isEditAccount && (
                          <button
                            type="submit"
                            className="btn btn-primary me-2"
                          >
                            lưu thay đổi
                          </button>
                        )}
                        {isEditAccount === false && (
                          <button
                            type="reset"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              handleEditAccount();
                            }}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>

        {/* / Content */}
        {/* Footer */}

        {/* / Footer */}
        <div className="content-backdrop fade" />
      </div>
      {/* Content wrapper */}

      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
AccountSetting.Layout = MainLayout;
