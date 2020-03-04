import axios from 'axios';
import { baseURL } from './constants';

/* eslint-disable import/prefer-default-export */
export async function getCategories() {
  const { data } = await axios({
    method: 'GET',
    baseURL,
    url: 'home/homefeed/categories',
  });

  return data;
}
