import usePublishProduct from "hooks/products/use-publish-product";
import * as React from "react";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
export interface IPublishProductProps {
  handleClosePublishDialog: () => void;
  idProduct: string;
}

export default function PublishProduct(props: IPublishProductProps) {
  const { handleClosePublishDialog, idProduct } = props;

  const handleOpenErrPublish = () => {
    setOpenErrorPublishDialog(true);
  };
  const handleCloseErrPublish = () => {
    setOpenErrorPublishDialog(false);
  };

  const { mutate: publishProduct, error } = usePublishProduct(
    handleClosePublishDialog
  );

  const onPublish = (id: string) => {
    publishProduct(id);
  };
  const [openErrorPublishDialog, setOpenErrorPublishDialog] =
    React.useState(false);

  return (
    <div className="d-flex justify-content-center">
      <div className="col-sm-10 d-flex justify-content-around">
        <button
          className="btn btn-primary"
          color="primary"
          onClick={() => {
            onPublish(idProduct);
          }}
        >
          Có
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleClosePublishDialog}
          autoFocus
          type="button"
        >
          Không
        </button>
      </div>
    </div>
  );
}
