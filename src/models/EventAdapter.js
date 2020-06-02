import moment from 'moment';
import {
  HelpersForTimeinMs
} from '../mock/const.js';

const createTimeString = (value, signString) => {
  let timeString = ``;

  if (value > 0 && value < 10) {
    timeString = `0` + value + signString;
  }

  if (value >= 10) {
    timeString = value + signString;
  }

  return timeString;
};

const getCapitalizedString = (string) => {
  if (!string) {
    return string;
  }

  return string[0].toUpperCase() + string.slice(1);
};

const getTimeDifference = (start, end) => {
  const difference = end - start;
  const days = Math.trunc(difference / HelpersForTimeinMs.DAY);
  const hours = Math.trunc((difference % HelpersForTimeinMs.DAY) / HelpersForTimeinMs.HOUR);
  const minutes = Math.round((difference % HelpersForTimeinMs.HOUR) / HelpersForTimeinMs.MINUTE);

  let string;

  if (days > 0) {
    string = `${createTimeString(days, `D`)} ${createTimeString(hours, `H`)} ${createTimeString(minutes, `M`)}`;
  } else if (hours > 0) {
    string = `${createTimeString(hours, `H`)} ${createTimeString(minutes, `M`)}`;
  } else {
    string = `${createTimeString(minutes, `M`)}`;
  }
  return string;
};

export default class TripEventAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.eventPoint = getCapitalizedString(data[`type`]);
    this.eventPointTown = data[`destination`].name;
    this.eventTitle = this.eventPoint + ` ` + this.eventPointTown;
    // console.log(data);

    this.eventTimeStart = new Date(data[`date_from`]);
    this.eventTimeEnd = new Date(data[`date_to`]);
    this.favorite = Boolean(data[`is_favorite`]);
    this.eventPrice = data[`base_price`];
    this.eventOffers = data[`offers`];


    this.eventPointDestination = data[`destination`];
    this.eventPointDestination.pathDestination = [data[`destination`].description];
    this.eventPointDestination.destinationImg = data[`destination`].pictures;

    this.eventDuration = getTimeDifference(this.start, this.end);
    this.parsedStartDate = Date.parse(moment(this.start).startOf(`date`));
  }

  toRAW(data) {
    const RAWObj = {
      'id': data.id,
      'type': data.eventPoint.toLowerCase(),
      'date_from': moment.parseZone(data.eventTimeStart).utc().format(),
      'date_to': moment.parseZone(data.eventTimeEnd).utc().format(),
      'is_favorite': data.favorite,
      'base_price': data.eventPrice,
      'offers': data.eventOffers,
      'destination': data.eventPointDestination,
    };
    // console.log(RAWObj);

    return RAWObj;
  }

  static parseTripEvent(data) {
    return new TripEventAdapter(data);
  }

  static parseTripEvents(data) {
    return data.map(TripEventAdapter.parseTripEvent);
  }
}
