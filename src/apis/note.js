import axios from 'axios';
import { baseURL } from './constants';

export async function getNote(id) {
  const { data } = await axios({
    baseURL,
    url: `note/${id}`,
    method: 'GET',
  });

  return data;
}

export async function getUser(id) {
  const { data } = await axios({
    baseURL,
    url: `user/${id}`,
    method: 'GET',
  });

  return data;
}
