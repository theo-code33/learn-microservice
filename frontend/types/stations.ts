type StationExtraInfo = {
  uid: string;
  renting: boolean;
  returning: boolean;
  last_updated: string;
  address: string;
  post_code: string;
  payment: string[];
  'payment-terminal': boolean;
  slots: number;
  normal_bikes: number;
  ebikes: number;
  has_ebikes: boolean;
  virtual: boolean;
};

export type Station = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  free_bikes: number;
  empty_slots: number;
  extra: StationExtraInfo;
};

export type Stations = Station[];