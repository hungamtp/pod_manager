import usePublishProduct from "hooks/products/use-publish-product";
import useUnPublishProduct from "hooks/products/use-un-publish-products";
import * as React from "react";

export interface IUnPublishProductProps {
  handleClosePublishDialog: () => void;
  idProduct: string;
}

export default function UnPublishProduct(props: IUnPublishProductProps) {
  const { handleClosePublishDialog, idProduct } = props;

  const { mutate: unPublishProduct, error } = useUnPublishProduct(
    handleClosePublishDialog
  );
  const onPublish = (id: string) => {
    unPublishProduct(id);
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
