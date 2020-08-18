/**
 * кол-во дней
 */
const ALLDAY = 5;

const POINT_TOWN = [`Amsterdam`, `Geneva`, `Ekaterinburg`, `Moskow`];

const POINT_TYPE = {
  "Taxi": [{
    title: `Drive slowly`,
    price: ` 130`
  }, {
    title: `Choose temperature`,
    price: ` 170`
  }, {
    title: `Choose the radio station`,
    price: `30`
  },
  {
    title: `Drive quickly, I'm in a hurry`,
    price: ` 100`
  },
  ],
  "Bus": [{
    title: `Infotainment system `,
    price: ` 50`
  }, {
    title: `Order meal `,
    price: ` 100`
  }, {
    title: `Choose seats`,
    price: `190`
  }],
  "Train": [{
    title: `Rent a vagon`,
    price: ` 200`
  }, {
    title: `Order traindriver`,
    price: ` 20`
  }, {
    title: `Выйти покурить`,
    price: `Поболтать`
  }],
  "Ship": [{
    title: `Upgrade to business class`,
    price: ` 150`
  }, {
    title: `Choose seats`,
    price: ` 40`
  }, {
    title: `Business lounge`,
    price: `40`
  }],
  "Transport": [{
    title: `Rent a car`,
    price: ` 200`
  }, {
    title: `Order Uber`,
    price: ` 20`
  }, {
    title: `Поймать попопутку`,
    price: `Поболтать`
  }],
  "Drive": [{
    title: `Choose temperature`,
    price: ` 170`
  }, {
    title: `Choose business class`,
    price: ` 180`
  }, {
    title: `Choose comfort class`,
    price: `110`
  }],
  "Flight": [{
    title: `Choose meal`,
    price: ` 120`
  }, {
    title: `Business lounge`,
    price: `  160`
  }, {
    title: `Choose seats`,
    price: `90 $ `
  },
  {
    title: `Upgrade to business class`,
    price: `120`
  },
  {
    title: `Add luggage`,
    price: `170`
  }
  ],
  "Check-in": [{
    title: `Choose the time of check-in`,
    price: ` 70`
  }, {
    title: `Choose the time of check-out`,
    price: ` 190`
  },
  {
    title: `Add breakfast`,
    price: `  110`
  }, {
    title: `Laundry`,
    price: `140 $ `
  },
  {
    title: `Order a meal from the restaurant`,
    price: `  30`
  }
  ],
  "Sightseeing": [{
    title: `add luggage`,
    price: ` 20`
  }, {
    title: `add meal`,
    price: `  21`
  }, {
    title: `Choose seats`,
    price: `5 $ `
  }],
  "Restaurant": [{
    title: `Choose live music`,
    price: `150`
  }, {
    title: `Choose VIP area`,
    price: `70`
  }, {
    title: `Choose table`,
    price: `5`
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
  FilterType,
  EventPointMap,
  HelpersForTimeinMs,
  TRANSPORT_TYPE,
};
