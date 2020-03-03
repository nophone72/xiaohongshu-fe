/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import pinyin from 'tiny-pinyin';

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
  if (num === undefined || Number.isNaN(num)) {
    return '--';
  } if (num <= 9999) {
    return num;
  }
  return `${Math.floor(num / 1000) / 10}万`;
}

export function emojComment(content = '') {
  return content.replace(/\[(.{1,3})R\]/g, (match, name) => {
    const emoj = pinyin.convertToPinyin(name).toLowerCase();
    const url = `https://ci.xiaohongshu.com/xy_emo_r_${emoj}.png?v=2`;
    return `<img src=${url} class="emoj" />`;
  });
}
