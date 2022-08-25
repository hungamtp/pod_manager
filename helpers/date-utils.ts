export const dateFormat = (inputDate: Date) => {
  //parse the input date
  const dateWithoutSecond = new Date(inputDate);
  const date = dateWithoutSecond.toLocaleTimeString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateAndTime = date.split(",");
  const seperatedTime = dateAndTime[0].split("/");
  const realTimeData =
    seperatedTime[1] + "/" + seperatedTime[0] + "/" + seperatedTime[2];
  const realDate = realTimeData + ", " + dateAndTime[1];
  return realDate;
};
