import moment from "moment";

export const getDaysInMonth = (month, year, dateFormat) =>
  new Array(31)
    .fill("")
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter(v => v.getMonth() === month - 1).map(v => moment(v).format(dateFormat));
