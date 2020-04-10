const POINT_PATH = 3;
const FIRST_DATE = 18;
const FINAL_DATE = +FIRST_DATE + POINT_PATH - 1;
const MONTH_DATE = `Mar`;
const PATH_DAYS = ` ${MONTH_DATE} ${FIRST_DATE} - ${FINAL_DATE}`;
const pointFinal = [`Amsterdam`, `Geneva`, `Ekaterinburg`];

const pointType = {
  "Taxi": [{
    eventOfferTitle: `Rent a car`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Uber`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Поймать попопутку`,
    evenOfferPrice: `Поболтать`
  }],
  "Bus": [{
    eventOfferTitle: `Rent a car`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Uber`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Поймать попопутку`,
    evenOfferPrice: `Поболтать`
  }],
  "Train": [{
    eventOfferTitle: `Rent a vagon`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order traindriver`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Выйти покурить`,
    evenOfferPrice: `Поболтать`
  }],
  "Ship": [{
    eventOfferTitle: `Rent a Ship`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Ship`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Пропиратить шхуну`,
    evenOfferPrice: `Виселица`
  }],
  "Transport": [{
    eventOfferTitle: `Rent a car`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Uber`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Поймать попопутку`,
    evenOfferPrice: `Поболтать`
  }],
  "Drive": [{
    eventOfferTitle: `Rent a car`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Uber`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Поймать попопутку`,
    evenOfferPrice: `Поболтать`
  }],
  "Flight": [{
    eventOfferTitle: `add luggage`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `add meal`,
    evenOfferPrice: `  21`
  }, {
    eventOfferTitle: `Choose seats`,
    evenOfferPrice: `5 $ `
  }],
  "Check-in": [{
    eventOfferTitle: `add luggage`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `add meal`,
    evenOfferPrice: `  21`
  }, {
    eventOfferTitle: `Choose seats`,
    evenOfferPrice: `5 $ `
  }],
  "Sightseeing": [{
    eventOfferTitle: `add luggage`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `add meal`,
    evenOfferPrice: `  21`
  }, {
    eventOfferTitle: `Choose seats`,
    evenOfferPrice: `5 $ `
  }],
  "Restaurant": [{
    eventOfferTitle: `Швеский стол`,
    evenOfferPrice: `20`
  }, {
    eventOfferTitle: `Больше мясо`,
    evenOfferPrice: `21`
  }, {
    eventOfferTitle: `Choose table`,
    evenOfferPrice: `5`
  }],
};

export {
  POINT_PATH,
  FIRST_DATE,
  MONTH_DATE,
  FINAL_DATE,
  PATH_DAYS,
  pointType,
  pointFinal,
};
