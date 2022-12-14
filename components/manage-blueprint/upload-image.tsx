import { storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export interface ITableProps {
  uploadBackgroundImage: (imageSrc: string, tmpSrc: string) => void;
  handleToggle: () => void;
}

export function UploadImage(props: ITableProps) {
  const { uploadBackgroundImage, handleToggle } = props;
  const dispatch = useAppDispatch();

  const maxNumber = 69;
  const [images, setImages] = React.useState<ImageListType>([]);
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    // data for submit
    handleToggle();
    setImages(imageList);
    onUploadImage(imageList);
  };

  const onUploadImage = (imageList: ImageListType) => {
    if (imageList !== null) {
      const file = imageList[0].file;
      const tmpSrc = imageList[0].data_url;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          uploadBackgroundImage(url, tmpSrc);
        });
      });
    }
  };

  return (
    <div className="App">
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
            <li
              onClick={onImageUpload}
              className="list-group-item px-4 py-5 mb-2  h6 btn btn-light d-flex-column justify-content-center align-items-center "
            >
              <FileDownloadIcon />
              <p className="h5 text-center">T???i h??nh n???n c???a khung</p>
            </li>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
