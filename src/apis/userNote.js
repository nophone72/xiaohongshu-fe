import axios from 'axios';
import { baseURL } from './constants';

// eslint-disable-next-line import/prefer-default-export
export async function getUserNote(id, params) {
  const { data } = await axios({
    method: 'GET',
    baseURL,
    url: `user/${id}/note`,
    params,

  });

  return data;
}
