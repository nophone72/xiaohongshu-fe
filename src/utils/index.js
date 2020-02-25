/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export function setTime(time, isFromTime = true) {
  return isFromTime ? dayjs(time * 1000).from(dayjs()) : dayjs(time * 1000).format('YYYY-MM-DD HH:mm');
}

export function changeNum(num) {
  if (num === undefined || num.isNaN) {
    return '';
  } if (num <= 9999) {
    return num;
  }
  return `${Math.floor(num / 1000) / 10}万`;
}
