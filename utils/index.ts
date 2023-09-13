import { CarProps, FilterProps } from "@/types";

const apiKey: string = process.env.CAR_API_KEY + "";
const imageApiKey: string = process.env.IMAGE_API_KEY + "";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};


export async function fetchCars(filter: FilterProps) {
  const url = new URL('https://api.api-ninjas.com/v1/cars');
  url.searchParams.append('make', filter.manufacturer);
  url.searchParams.append('model', filter.model);
  url.searchParams.append('fuel_type', filter.fuel);
  url.searchParams.append('year', `${filter.year}`);
  url.searchParams.append('limit', `${filter.limit}`);

  const response = await fetch(`${url}`, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });

	const result = await response.json();

  return result;
}

export const generateCardImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { make, year, model } = car;
  url.searchParams.append('customer', imageApiKey);
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathName;
}