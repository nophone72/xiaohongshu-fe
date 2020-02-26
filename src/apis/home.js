/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { baseURL } from './constants';

export async function getHomeFeed(params) {
  const { data } = await axios({
    method: 'GET',
    baseURL,
    url: 'home/homefeed/notes',
    params,
  });

  return data;
}
