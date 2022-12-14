import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface ProductByIdDtos {
  id: string;
  name: string;
  description: string;
  productImages: { image: string }[];
  categoryName: string;
  productTags: { tag: { name: string } }[];
  priceByFactories: {
    price: string;
    material: string;
    factory: {
      name: string;
      location: string;
    };
  }[];
  public: Boolean;
  deleted: Boolean;
}

export interface getProductByIdDtos extends ISuccessHttpResponse {
  data: ProductByIdDtos;
}
