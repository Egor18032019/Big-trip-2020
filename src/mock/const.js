/**
 * кол-во дней
 */
const ALLDAY = 5;

const POINT_TOWN = [`Amsterdam`, `Geneva`, `Ekaterinburg`, `Moskow`];

const styleOffers = {
  "Rent a car": `luggage`,
  "Order Uber": `comfort`,
  "Поймать попопутку": `meal`,
  "Rent a vagon": `luggage`,
  "Order traindriver": `comfort`,
  "Выйти покурить": `meal`,
  "Rent a Ship": `luggage`,
  "Order Ship": `comfort`,
  "Пропиратить шхуну": `meal`,
  "add luggage": `luggage`,
  "add meal": `comfort`,
  "Choose seats": `meal`,
  "Швеский стол": `luggage`,
  "Больше мясо": `comfort`,
  "Choose table": `meal`,
};

const POINT_TYPE = {
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

/**
 * массив предложений
 */
const DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
/**
 * массив картинок
 */
const DESCRIPTION_IMG = [
  `  <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">`,
  `  <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">`,
  `  <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">`,
  `  <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">`,
  `  <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">`
];

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const EventPointMap = {
  'Taxi': `🚕 TAXI`,
  'Bus': `🚌 BUS`,
  'Train': `🚂 TRAIN`,
  'Ship': `🛳 SHIP`,
  'Transport': `🚊 TRANSPORT`,
  'Drive': `🚗 DRIVE`,
  'Flight': `✈️ FLIGHT`,
  'Check-in': `🏨 CHECK-IN`,
  'Sightseeing': `🏛 SIGHTSEEING`,
  'Restaurant': `🍴 RESTAURANT`,
};

const HelpersForTimeinMs = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000,
};

const TRANSPORT_TYPE = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];

export {
  ALLDAY,
  POINT_TOWN,
  POINT_TYPE,
  DESCRIPTION,
  DESCRIPTION_IMG,
  styleOffers,
  FilterType,
  EventPointMap,
  HelpersForTimeinMs,
  TRANSPORT_TYPE,
};
