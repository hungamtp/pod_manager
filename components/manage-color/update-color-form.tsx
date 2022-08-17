/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { UpdateColorDto } from "@/services/colors/dto/update-colors-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateColor from "hooks/colors/use-create-colors";
import useDeleteColor from "hooks/colors/use-delete-colors";
import useUpdateColor from "hooks/colors/use-update-colors";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IUpdateColorFormProps {
  handleCloseDialog: () => void;
  id: string;
}

export default function UpdateColorForm(props: IUpdateColorFormProps) {
  const { handleCloseDialog, id } = props;

  const { mutate: deleteColor, error } = useDeleteColor(handleCloseDialog);

  const handleDelete = () => {
    deleteColor(id);
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <p className="d-flex justify-content-center fs-3 mb-5">
              Bạn có muốn xóa màu này không?
            </p>

            <div className="d-flex justify-content-center">
              <div className="col-sm-10 d-flex justify-content-around">
                <button
                  className="btn btn-danger"
                  color="primary"
                  type="submit"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Xoá
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
          </div>
        </div>
      </div>
    </>
  );
}
