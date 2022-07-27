export interface DesignState {
  key: string;
  name: string;
  types: "image/png" | "image/jpg" | "image/jpeg" | "text";
  height: number;
  width: number;
  scales: number;
  rotate: number;
  leftPosition: number;
  topPosition: number;
  src: string;
  tmpSrc: string;
  font?: string;
  textColor?: string;
  DPI?: number;
}
