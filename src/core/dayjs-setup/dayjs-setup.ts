import dayjs from "dayjs";
import "dayjs/locale/de";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.locale("de");

export default dayjs;
