import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface OrdersDetailDtos {
  orderId: string;
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
      top: string;
      width: string;
      height: string;
      widthRate: number;
      heightRate: string;
    };
    designInfos: [];
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
