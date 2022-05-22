export interface DesignState {
  key: "";
  name: "";
  type: "image/png" | "image/jpg" | "image/jpeg";
  height: number;
  width: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  left: number;
  top: number;
  src: string;
}
