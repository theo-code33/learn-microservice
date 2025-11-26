export type AddressResult = {
  city: string;
  zipcode: string;
  fulltext: string;
  x: number;
  y: number;
};
export type GeopfResponse = {
  results: AddressResult[];
};
