import { DesignState } from "@/models/designState";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

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
  createDate: string;
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
  orderDetailsSupportDtos: {
    orderDetailsId: string;
    color: string;
    size: string;
    quantity: number;
  }[];
  productId: string;
  status: string;
}

export interface getOrdersDetailResponse extends ISuccessHttpResponse {
  data: OrdersDetailDtos;
}
