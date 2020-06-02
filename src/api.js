import TripEventAdapter from './models/EventAdapter.js';

const ServerUrl = {
  POINTS: `https://11.ecmascript.pages.academy/big-trip/points`,
  OFFERS: `https://11.ecmascript.pages.academy/big-trip/offers`,
  DESTINATIONS: `https://11.ecmascript.pages.academy/big-trip/destinations`
};

const Method = {
  GET: `GET`,
  PUT: `PUT`,
};

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getData() {
    return Promise.all([
      this.getTripEvents(),
      this.getOffers(),
      this.getDestinations(),
    ])
       .then((response) => {
         const [tripEvents, offers, destinations] = response;
         return {
           tripEvents,
           offers,
           destinations,
         };
       });
  }

  getTripEvents() {
    return this._loadData({
      url: ServerUrl.POINTS
    })
       .then((response) => response.json())
       .then(TripEventAdapter.parseTripEvents);
  }

  getOffers() {
    return this._loadData({
      url: ServerUrl.OFFERS
    })
       .then((response) => response.json());
  }

  getDestinations() {
    return this._loadData({
      url: ServerUrl.DESTINATIONS
    })
       .then((response) => response.json());
  }

  updateTripEvent(id, data) {
    return this._loadData({
      url: `${ServerUrl.POINTS}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
    })
       .then(this._checkStatus)
       .then((response) => response.json())
       .then(TripEventAdapter.parseTripEvent);
  }

  _loadData({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(url, {
      method,
      body,
      headers
    })
       .then(this._checkStatus)
       .catch((error) => {
         throw error;
       });
  }


  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
