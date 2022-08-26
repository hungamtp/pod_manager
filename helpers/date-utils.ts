import moment from "moment";
export const dateFormat = (inputDate: Date | string) => {
  //parse the input date
  return moment(inputDate).format("HH:mm | DD-MM-YYYY");
};
