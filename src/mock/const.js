const POINT_PATH = 3;
const FIRST_DATE = 18;
const FINAL_DATE = +FIRST_DATE + POINT_PATH - 1;
const MONTH_DATE = `Mar`;
const PATH_DAYS = ` ${MONTH_DATE} ${FIRST_DATE} - ${FINAL_DATE}`;
const pointType = [
  `Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`,
  `Sightseeing`, `Restaurant`
];
const pointFinal = [`Amsterdam`, `Geneva`, `Chamonix`];
export {
  POINT_PATH,
  FIRST_DATE,
  MONTH_DATE,
  FINAL_DATE,
  PATH_DAYS,
  pointType,
  pointFinal,
};
