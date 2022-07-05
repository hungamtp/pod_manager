import { storage } from "@/firebase/firebase";
import { UpdateProductBlueprintDto } from "@/services/products/dto/update-product-blueprint-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useUpdateCategory from "hooks/categories/use-update-categories";
import useUpdateProductBlueprint from "hooks/products/use-update-product-blueprint";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as yup from "yup";

export interface IUpdateProductBlueprintFormProps {
  handleCloseDialog: () => void;
  productBlueprint: UpdateProductBlueprintDto;
}

const schema = yup.object().shape({});

export default function UpdateProductBlueprintForm(
  props: IUpdateProductBlueprintFormProps
) {
  const { handleCloseDialog, productBlueprint } = props;

  const [images, setImages] = React.useState<ImageListType>([
    { data_url: productBlueprint.frameImage },
  ]);

  const defaultValues: UpdateProductBlueprintDto = {
    id: "",
    frameImage: "",
    position: "",
    placeHolderTop: 0,
    placeHolderHeight: 0,
    placeHolderWidth: 0,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProductBlueprintDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(productBlueprint);
  }, [productBlueprint]);

  const { mutate: updateProductBlueprint, error } =
    useUpdateProductBlueprint(handleCloseDialog);

  const maxNumber = 69;
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };
  const onUploadImage = (data: UpdateProductBlueprintDto) => {
    if (images !== null) {
      const file = images[0].file;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const submitData = {
            ...data,
            id: productBlueprint.id,
            frameImage: url,
          } as UpdateProductBlueprintDto;
          updateProductBlueprint(submitData);
        });
      });
    }
  };

  const onSubmit: SubmitHandler<UpdateProductBlueprintDto> = (data) => {
    onUploadImage(data);
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  PLACEHOLDER
                </label>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label ms-4"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Top
                  </label>

                  <div className="col-sm-9">
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control"
                        id="basic-icon-default-fullname"
                        aria-describedby="basic-icon-default-fullname2"
                        {...register("placeHolderTop")}
                      />
                    </div>
                    {errors.placeHolderTop && (
                      <span id="error-pwd-message" className="text-danger">
                        {errors.placeHolderTop.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label ms-4"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Height
                  </label>

                  <div className="col-sm-9">
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control"
                        id="basic-icon-default-fullname"
                        aria-describedby="basic-icon-default-fullname2"
                        {...register("placeHolderHeight")}
                      />
                    </div>
                    {errors.placeHolderHeight && (
                      <span id="error-pwd-message" className="text-danger">
                        {errors.placeHolderHeight.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label ms-4"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Width
                  </label>

                  <div className="col-sm-9">
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control"
                        id="basic-icon-default-fullname"
                        aria-describedby="basic-icon-default-fullname2"
                        {...register("placeHolderWidth")}
                      />
                    </div>
                    {errors.placeHolderWidth && (
                      <span id="error-pwd-message" className="text-danger">
                        {errors.placeHolderWidth.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Image
                </label>
                <div className="col-sm-10">
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
                          onClick={onImageUpload}
                          {...dragProps}
                          type="button"
                          className="btn btn-primary"
                        >
                          Update Image
                        </button>
                      </div>
                    )}
                  </ImageUploading>
                  {errors.frameImage && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.frameImage.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
                    type="button"
                  >
                    CANCEL
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
