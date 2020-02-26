/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export function setTime(time) {
  const stringTime = typeof (time) === 'number' ? time * 1000 : time;
  let day = '';
  const Time = dayjs(stringTime);
  const diffrence = dayjs().diff(Time, 'day');

  if (diffrence === 1) {
    day = '昨天';
  } else if (diffrence === 0) {
    day = '今天';
  } else {
    day = Time.format('YYYY-MM-DD');
  }
  return `${day} ${Time.format('HH:mm')}`;
}

export function changeNum(num) {
  if (num === undefined || num.isNaN) {
    return '';
  } if (num <= 9999) {
    return num;
  }
  return `${Math.floor(num / 1000) / 10}万`;
}
