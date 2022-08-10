import { storage } from "@/firebase/firebase";
import { UpdateCategoryDto } from "@/services/categories/dto/update-categories-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useUpdateCategory from "hooks/categories/use-update-categories";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as yup from "yup";

export interface IUpdateCategoryFormProps {
  handleCloseDialog: () => void;
  category: UpdateCategoryDto;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Thể loại cần ít nhất 1 kí tự")
    .max(26, "Thể loại tối đa 50 kí tự")
    .required("Thể loại không được để trống"),
});

export default function UpdateCategoryForm(props: IUpdateCategoryFormProps) {
  const { handleCloseDialog, category } = props;

  const [images, setImages] = React.useState<ImageListType>([
    { data_url: category.image },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  const defaultValues: UpdateCategoryDto = {
    id: "",
    name: "",
    image: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCategoryDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(category);
  }, [category]);

  const { mutate: updateCategory, isLoading: isLoadingUpdateCategory } =
    useUpdateCategory(handleCloseDialog);

  React.useEffect(() => {
    if (isLoadingUpdateCategory === false) {
      setIsLoading(false);
    }
  }, [isLoadingUpdateCategory]);

  const maxNumber = 69;
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };
  const onUploadImage = (data: { name: string; image: string }) => {
    setIsLoading(true);
    if (images !== null && images[0].data_url !== category.image) {
      const file = images[0].file;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const submitData = {
            ...data,
            id: category.id,
            image: url,
          } as UpdateCategoryDto;
          updateCategory(submitData);
        });
      });
    } else {
      const submitData = {
        ...data,
        id: category.id,
        image: images[0].data_url,
      } as UpdateCategoryDto;
      updateCategory(submitData);
    }
  };

  const onSubmit: SubmitHandler<UpdateCategoryDto> = (data) => {
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
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Tên Category
                </label>

                <div className="col-sm-7">
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      placeholder="Hoodies"
                      aria-label="Hoodies"
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
                  className="col-sm-3 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Hình mô tả
                </label>
                <div className="col-sm-7">
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
                          <div key={index} className="image-item">
                            <img src={image["data_url"]} alt="" width="100" />
                          </div>
                        ))}
                        <button
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                          type="button"
                          className="btn btn-info"
                        >
                          <FileUploadIcon /> Tải ảnh lên
                        </button>
                      </div>
                    )}
                  </ImageUploading>
                  {errors.image && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.image.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around mt-3">
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
                    Thay đổi
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
