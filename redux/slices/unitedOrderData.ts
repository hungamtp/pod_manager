import { OrderFactoryDto } from "@/services/factories/dto/get-all-orders-factory";
import { createSlice } from "@reduxjs/toolkit";

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống

const initialState: {
  orderId: string;
  designId: string;
  productName: string;
  designName: string;
  designPrice: number;
  credentialId: string;
  orderDetailsList: OrderFactoryDto[];
  orderStatus: string;
} = {
  orderId: "",
  designId: "",
  productName: "",
  designName: "",
  designPrice: 0,
  credentialId: "",
  orderDetailsList: [],
  orderStatus: "",
};

export const unitedData = createSlice({
  name: "unitedData",
  initialState,
  reducers: {
    addUnitedData: (state, action) => {
      return action.payload;
    },
    setOrderStatus: (state, action) => {
      return { ...state, orderStatus: action.payload };
    },
    setOrderDetailsList: (state, action) => {
      return { ...state, orderDetailsList: action.payload };
    },
    clearData: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUnitedData, clearData, setOrderStatus, setOrderDetailsList } =
  unitedData.actions;

export default unitedData.reducer;
