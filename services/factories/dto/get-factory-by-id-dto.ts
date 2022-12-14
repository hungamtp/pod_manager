import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface FactoryByIdDtos {
  id: string;
  name: string;
  email: string;
  location: string;
  address: string;
  phone: string;
  image: string;
  tradeDiscount: number;
  productDtoList: ProductDto[];
  public: Boolean;
  delete: Boolean;
}

export interface sizeColorsDto {
  quantity: number;
  size: string;
  colorImage: string;
}
[];

export interface ProductDto {
  id: string;
  name: string;
  price: number;
  material: string;
  description: string;
  productImages: { image: string }[];
  categoryName: string;
  sizeColors: {
    quantity: number;
    size: string;
    colorImage: string;
  }[];
}

export interface FactoryInfo {
  id: string;
  name: string;
  email: string;
  location: string;
  address: string;
  phone: string;
  image: string;
  tradeDiscount: number;
}

export interface getFactoryByIdDtos extends ISuccessHttpResponse {
  data: FactoryByIdDtos;
}
