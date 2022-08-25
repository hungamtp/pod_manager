import { DesignState } from "@/models/designState";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface SupportOrderDetail {
  orderDetailsId: string;
  color: string;
  colorImage: string;
  size: string;
  quantity: string;
  status: string;
  createdDate: Date;
  reasonByFactory: string;
  reasonByUser: string;
}
export interface OrdersDetailDtos {
  orderId: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  address: string;
  previewImages: {
    image: string;
    position: string;
    color: string;
  }[];
  createDate: Date;
  bluePrintDtos: {
    frameImage: string;
    position: string;
    placeholder: {
      top: number;
      width: number;
      height: number;
      widthRate: number;
      heightRate: number;
    };
    designInfos: DesignState[];
  }[];
  cancelReasonByFactory: string;
  cancelReasonByUser: string;
  canceled: boolean;
  orderDetailsSupportDtos: SupportOrderDetail[];
  productId: string;
  status: string;
  statuses: string[];
}

export interface getOrdersDetailResponse extends ISuccessHttpResponse {
  data: OrdersDetailDtos;
}
