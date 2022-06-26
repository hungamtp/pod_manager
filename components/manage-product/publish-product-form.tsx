import usePublishProduct from "hooks/products/use-publish-product";
import * as React from "react";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export interface IPublishProductProps {
  handleClosePublishDialog: () => void;
  idProduct: number;
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

  const onPublish = (id: number) => {
    publishProduct(id);
  };
  const [openErrorPublishDialog, setOpenErrorPublishDialog] =
    React.useState(false);
  return (
    <div className="d-flex justify-content-center">
      {error?.name == "AxiosError" && (
        <Dialog
          open={openErrorPublishDialog}
          onClose={handleCloseErrPublish}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">
            {
              "sản phẩm chưa có Factory hoặc sizes & colors nên không thể Publish?"
            }
          </DialogTitle>
          <DialogContent>
            <div className="d-flex justify-content-center">
              <div className="col-sm-10 d-flex justify-content-around">
                {console.log("loi ne")}
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseErrPublish}
                  autoFocus
                >
                  CANCEL
                </button>
              </div>
            </div>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      )}
      <div className="col-sm-10 d-flex justify-content-around">
        <button
          className="btn btn-primary"
          color="primary"
          onClick={() => {
            onPublish(idProduct);
          }}
        >
          YES
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleClosePublishDialog}
          autoFocus
          type="button"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
