export type Location = {
  city: string;
  country: string;
};

export type RatingType = {
  value: number;
  type: "self" | "star";
};

export type Inclusions = string[];

export type Total = {
  amount: number;
  currency: "AUD"|"EUR";
};

export type Stay = {
  checkIn: string;
  checkout: string;
  adults: number;
  children: number;
  infants: number;
};

export type Price = {
  total: Total;
  stay: Stay;
};

export type HotelData = {
  id: string;
  heroImage: string;
  name: string;
  location: Location;
  rating: RatingType;
  inclusions: Inclusions;
  price: Price;
  sleep: number;
};

export type HotelDataList = HotelData[];