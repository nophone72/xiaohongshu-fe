import axios from 'axios';
import { baseURL } from './constants';

// eslint-disable-next-line import/prefer-default-export
export async function getUserCollect(id, params) {
  const { data } = await axios({
    method: 'GET',
    baseURL,
    url: `user/${id}/collect`,
    params,
  });

  return data;
}
