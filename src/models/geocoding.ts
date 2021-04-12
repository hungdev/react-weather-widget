export interface IGeocoding {
  name?: string;
  local_names: LocalNames;
  lat: string;
  lon: string;
  country?: string;
}

export interface LocalNames {
  [key: string]: string | number | undefined;
}
