import axios from 'axios';
import { baseURL } from './constants';

export default async function getNote(id) {
  const { data } = await axios({
    baseURL,
    url: `note/${id}`,
    method: 'GET',
  });

  return data;
}
