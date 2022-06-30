/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import { storage } from "@/firebase/firebase";
import { AccountByIdDtos } from "@/services/accounts/dto/get-accounts-by-id-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useGetAccountById from "hooks/accounts/use-get-accounts-by-id";
import useUpdateImageAccount from "hooks/accounts/use-update-image";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as yup from "yup";

export interface IAccountSettingProps {}

const schema = yup.object().shape({
  userFirstName: yup
    .string()
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  userLastName: yup
    .string()
    .min(1, "Last Name cần ít nhất 1 kí tự")
    .max(26, "Last Name tối đa 50 kí tự")
    .required("Last Name không được để trống"),
});

export default function AccountSetting(props: IAccountSettingProps) {
  const credentialId = useAppSelector((state) => state.auth.userId);
  const { data: responseAccount, isLoading: isLoadingAccount } =
    useGetAccountById(Number(credentialId));
  const { mutate: updateImageAccount, error } = useUpdateImageAccount();
  const maxNumber = 69;
  const [images, setImages] = React.useState<ImageListType>([
    { data_url: responseAccount?.data.image },
  ]);

  const defaultValues: AccountByIdDtos = {
    id: 0,
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

  const onUploadImage = (data: { name: string; image: string }) => {
    if (images !== null) {
      const file = images[0].file;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const submitData = {
            id: Number(credentialId),
            image: url,
          };
          updateImageAccount(submitData);
        });
      });
    }
  };

  const onSubmit: SubmitHandler<AccountByIdDtos> = (data) => {
    onUploadImage(data);
  };
  return (
    <>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Account Settings /</span>{" "}
            Account
          </h4>
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <h5 className="card-header">Profile Details</h5>
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
                                <button
                                  className="btn btn-primary me-2 mb-4 ms-2"
                                  style={
                                    isDragging ? { color: "red" } : undefined
                                  }
                                  onClick={onImageUpload}
                                  {...dragProps}
                                  type="button"
                                >
                                  Thêm ảnh
                                </button>
                                &nbsp;
                                <button
                                  className="btn btn-outline-secondary account-image-reset mb-4"
                                  type="button"
                                  onClick={onImageRemoveAll}
                                >
                                  Xóa ảnh
                                </button>
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
                            First Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="firstName"
                            defaultValue={responseAccount.data.userFirstName}
                            {...register("userFirstName")}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="lastName" className="form-label">
                            Last Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="lastName"
                            value={responseAccount.data.userLastName}
                            {...register("userLastName")}
                          />
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
                        </div>

                        <div className="mb-3 col-md-6">
                          <label className="form-label" htmlFor="phoneNumber">
                            Phone Number
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="phoneNumber"
                              className="form-control"
                              defaultValue={responseAccount.data.phone}
                              {...register("phone")}
                            />
                          </div>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="address" className="form-label">
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Address"
                            defaultValue={responseAccount.data.address}
                            {...register("address")}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="state" className="form-label">
                            Role Name
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
                        <button type="submit" className="btn btn-primary me-2">
                          Save changes
                        </button>
                        <button
                          type="reset"
                          className="btn btn-outline-secondary"
                        >
                          Cancel
                        </button>
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
