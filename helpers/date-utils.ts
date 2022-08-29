import moment from "moment";
export const dateFormat = (inputDate: Date | string) => {
  const executedDate = new Date(
    new Date(inputDate).getTime() + 7 * 60 * 60 * 1000
  );
  //parse the input date
  return moment(executedDate).format("HH:mm DD-MM-YYYY");
};
