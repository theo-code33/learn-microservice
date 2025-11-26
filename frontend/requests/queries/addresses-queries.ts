import axios from 'axios';

enum PoiType {
  ADMINISTRATIVE = 'administratif',
}

enum AutoCompleteType {
  ADDRESS = 'StreetAddress',
  POI = 'PositionOfInterest',
}

type AutoCompletePayload = {
  text: string;
  terr?: string[];
  poiType?: PoiType;
  type: AutoCompleteType;
  maximumResponses: number;
};

export type AutoCompleteAddressesResult = {
  fulltext: string;
};

const addressesClient = axios.create({
  baseURL: 'https://data.geopf.fr/geocodage/completion',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAddresses = async (searchInput: string) => {
  const { text, terr, type, maximumResponses }: AutoCompletePayload = {
    text: searchInput,
    terr: ['DOMTOM', 'METROPOLE'],
    type: AutoCompleteType.ADDRESS,
    maximumResponses: 10,
  };

  const response = await addressesClient.get<{ results: AutoCompleteAddressesResult[] }>(
    `/?text=${text}&terr=${terr.join(',')}&type=${type}&maximumResponses=${maximumResponses}`,
  );

  return response.data.results;
};

export type AutoCompleteLocationsResult = {
  poiType: string[];
  fulltext: string;
};

export const fetchLocations = async (searchInput: string) => {
  const { text, terr, poiType, type, maximumResponses }: AutoCompletePayload = {
    text: searchInput,
    terr: ['DOMTOM', 'METROPOLE'],
    poiType: PoiType.ADMINISTRATIVE,
    type: AutoCompleteType.POI,
    maximumResponses: 10,
  };

  const response = await addressesClient.get<{ results: AutoCompleteLocationsResult[] }>(
    `/?text=${text}&terr=${terr.join(',')}&poiType=${poiType}&type=${type}&maximumResponses=${maximumResponses}`,
  );

  return response.data.results
    .filter((location) => location.poiType.includes('commune') || location.poiType.includes('département'))
    .map((location) => location.fulltext);
};

type AddressResult = {
  city: string;
  zipcode: string;
  fulltext: string;
  x: number;
  y: number;
};

export const getAddressInfo = async (address: string): Promise<AddressResult> => {
  try {
    const response = await addressesClient.get<{ results: AddressResult[] }>(
      `/?text=${address}&&terr=DOMTOM,METROPOLE&type=StreetAddress&maximumResponses=1`,
      { headers: { 'Content-Type': 'application/json' } },
    );

    return response.data.results[0];
  } catch (_err) {
    return Promise.reject('get-address-info-fail');
  }
};
