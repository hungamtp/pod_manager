/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { storage } from "@/firebase/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import KeyIcon from "@mui/icons-material/Key";
import { SelectChangeEvent } from "@mui/material/Select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useCreateFactoryAccount from "hooks/factories/use-create-factory-account";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export interface ICreateFactoryFormProps {
  handleCloseDialog: () => void;
}

type FormCreateFactoryAccount = {
  name: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  tradeDiscount: number;
};
const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(1, "Tên nhà in cần ít nhất 1 kí tự")
    .max(50, "Tên nhà in tối đa 50 kí tự")
    .required("Tên nhà in không được để trống"),
  password: yup
    .string()
    .trim()
    .min(8, "Mật khẩu cần ít nhất 8 kí tự")
    .max(26, "Mật khẩu tối đa 26 kí tự")
    .required("Mật khẩu không được để trống"),
  email: yup
    .string()
    .trim()
    .email()
    .min(8, "Tài khoản cần ít nhất 8 kí tự")
    .max(50, "Tài khoản tối đa 50 kí tự")
    .required("Tài khoản không được để trống"),
  phone: yup
    .string()
    .trim()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Số điện thoại gồm 10 số và bắt đầu từ 0"
    )
    .required("Số điện thoại không được để trống"),
  address: yup
    .string()
    .trim()
    .min(10, "Địa chỉ cần ít nhất 10 kí tự")
    .max(255, "Địa chỉ tối đa 255 kí tự")
    .required("Địa chỉ không được để trống"),
  tradeDiscount: yup
    .number()
    .typeError("Vui lòng nhập số")
    .min(5, "Chiết khấu cần ít nhất 5 %")
    .max(30, "Chiết khấu tối đa 30 %")
    .required("Chiết khấu không được để trống"),
});

export default function CreateFactoryForm(props: ICreateFactoryFormProps) {
  const { handleCloseDialog } = props;
  const [role, setRole] = React.useState("USER");
  const { mutate: addFactoryAcount, isLoading: isLoadingCreateFactoryAccount } =
    useCreateFactoryAccount(handleCloseDialog);
  const [images, setImages] = React.useState<ImageListType>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isImgNull, setIsImgNull] = React.useState(false);
  const [seePassword, setSeePassword] = React.useState("password");
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  const defaultValues: FormCreateFactoryAccount = {
    logo: "",
    name: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    tradeDiscount: 0,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCreateFactoryAccount>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (isLoadingCreateFactoryAccount === false) {
      setIsLoading(false);
    }
  }, [isLoadingCreateFactoryAccount]);

  const maxNumber = 69;
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };
  const onUploadImage = (data: FormCreateFactoryAccount) => {
    setIsLoading(true);
    if (images !== null && images.length > 0) {
      setIsImgNull(false);
      const file = images[0].file;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const submitData = { ...data, logo: url };
          addFactoryAcount(submitData);
        });
      });
    } else {
      setIsLoading(false);
      setIsImgNull(true);
    }
  };

  const handleSeePassword = () => {
    if (seePassword === "password") {
      setSeePassword("text");
    } else {
      setSeePassword("password");
    }
  };

  const onSubmit: SubmitHandler<FormCreateFactoryAccount> = (data) => {
    // addFactoryAcount(data);
    onUploadImage(data);
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-fullname"
                >
                  Tên nhà in
                </label>

                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-fullname2"
                      className="input-group-text"
                    >
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="A company"
                      id="basic-icon-default-fullname"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-company"
                >
                  Mật khẩu
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-company2"
                      className="input-group-text"
                    >
                      <KeyIcon fontSize="small" />
                    </span>
                    <input
                      type={seePassword}
                      id="basic-icon-default-company"
                      className="form-control"
                      placeholder="********"
                      aria-label="********"
                      aria-describedby="basic-icon-default-company2"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      id="basic-icon-default-company2"
                      className="input-group-text"
                    >
                      {seePassword === "text" ? (
                        <VisibilityOffIcon
                          onClick={() => {
                            handleSeePassword();
                          }}
                          fontSize="small"
                        />
                      ) : (
                        <VisibilityIcon
                          onClick={() => {
                            handleSeePassword();
                          }}
                          fontSize="small"
                        />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-email"
                >
                  Email
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <span className="input-group-text">
                      <i className="bx bx-envelope" />
                    </span>
                    <input
                      type="text"
                      id="basic-icon-default-email"
                      className="form-control"
                      placeholder="acompany@gmail.com"
                      aria-describedby="basic-icon-default-email2"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-phone"
                >
                  Số điện thoại
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-phone2"
                      className="input-group-text"
                    >
                      <i className="bx bx-phone" />
                    </span>
                    <input
                      type="text"
                      id="basic-icon-default-phone"
                      className="form-control phone-mask"
                      placeholder="0938478347"
                      aria-describedby="basic-icon-default-phone2"
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-message"
                >
                  Địa chỉ
                </label>
                <div className="col-sm-9">
                  <div className="input-group input-group-merge">
                    <span
                      id="basic-icon-default-message2"
                      className="input-group-text"
                    >
                      <i className="bx bx-comment" />
                    </span>
                    <textarea
                      id="basic-icon-default-message"
                      className="form-control"
                      placeholder="Quan 9, TP. Ho Chi Minh"
                      aria-describedby="basic-icon-default-message2"
                      {...register("address")}
                    />
                  </div>
                  {errors.address && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.address.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-message"
                >
                  Chiết khấu (%)
                </label>
                <div className="col-sm-3">
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
                      id="basic-icon-default-message"
                      className="form-control"
                      aria-describedby="basic-icon-default-message2"
                      {...register("tradeDiscount")}
                    />
                    <span
                      id="basic-icon-default-message2"
                      className="input-group-text"
                    >
                      %
                    </span>
                  </div>
                </div>
                {errors.tradeDiscount && (
                  <span
                    id="error-pwd-message"
                    className="col-sm-5 text-danger "
                  >
                    {errors.tradeDiscount.message}
                  </span>
                )}
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label text-capitalize fs-6"
                  htmlFor="basic-icon-default-fullname"
                >
                  Logo
                </label>
                <div className="col-sm-9">
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
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image["data_url"]} alt="" width="100" />
                          </div>
                        ))}
                        <button
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={() => {
                            onImageUpload();
                            setIsImgNull(false);
                          }}
                          {...dragProps}
                          type="button"
                          className="btn btn-info"
                        >
                          <FileUploadIcon /> Tải ảnh lên
                        </button>
                      </div>
                    )}
                  </ImageUploading>
                  {isImgNull && (
                    <span id="error-pwd-message" className="text-danger">
                      {"Hình không được để trống"}
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <div className="col-sm-9 d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    {isLoading === true && (
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Tạo mới
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
                    type="button"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
