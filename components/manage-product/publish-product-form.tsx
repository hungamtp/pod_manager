import usePublishProduct from "hooks/products/use-publish-product";
import * as React from "react";

export interface IPublishProductProps {
  handleClosePublishDialog: () => void;
  idProduct: number;
}

export default function PublishProduct(props: IPublishProductProps) {
  const { handleClosePublishDialog, idProduct } = props;

  const { mutate: publishProduct, error } = usePublishProduct(
    handleClosePublishDialog
  );
  const onPublish = (id: number) => {
    publishProduct(id);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-sm-10 d-flex justify-content-around">
        <button
          className="btn btn-primary"
          color="primary"
          onClick={() => {
            onPublish(idProduct);
            handleClosePublishDialog;
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
