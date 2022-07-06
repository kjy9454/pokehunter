import {Dimensions, Keyboard, Platform} from 'react-native';
import moment from 'moment-timezone';
import 'moment/locale/ko';
// import consts from '../libs/consts';
export const isIos = Platform.OS === 'ios';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export function formatBalanceFloat(v, a) {
  if (String(v) === '' || v === null || v === undefined || String(v) === '0') {
    return '0';
  } else if (v === parseInt(v)) {
    return v.toString();
  } else {
    return parseFloat(v).toFixed(a || 3);
  }
}
export const formatTime = (time, format) => {
  let s = time;
  if (!time) {
    return '';
  } else {
    try {
      time = moment(time);
    } catch (error) {
      return '';
    }
  }
  time = time.tz('Asia/Seoul');
  if (s && s.includes('000Z')) {
    time = time.utc();
  }
  switch (format) {
    case 'ymd':
      return time.format('YYYYMMDD');
    case 'date':
      return time.format('YYYY-MM-DD');
    case 'date-time':
      return time.format('YYYY-MM-DD HH:mm');
    default:
      return time.format(format);
  }
};
export function isAfter(date) {
  if (date) {
    return moment()
      .tz('Asia/Seoul')
      .isAfter(
        moment(
          moment.tz(date, 'Asia/Seoul').format('YYYY-MM-DD') + ' 23:59:59',
          'YYYY-MM-DD HH:mm:ss',
        ),
      );
  } else {
    return false;
  }
}
export function formatId(x) {
  return x.toString().length === 1
    ? '00' + x.toString()
    : x.toString().length === 2
    ? '0' + x.toString()
    : x.toString();
}
export function formatNumber3digit(x) {
  return (x === 0 ? '0' : x || '')
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatPhone(num, type) {
  if (!num) {
    num = '';
  }
  var formatNum = '';

  if (num.length == 11) {
    if (type == 0) {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
    } else {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
  } else if (num.length == 8) {
    formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
  } else {
    if (num.indexOf('02') == 0) {
      if (type == 0) {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
      } else {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
      }
    } else {
      if (type == 0) {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
      } else {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
    }
  }

  return formatNum;
}

export const calculateTimer = second => {
  if (!second) {
    return '00:00';
  }

  if (typeof second === 'string') {
    second = parseInt(second);
  }
  const minute = Math.floor(second / 60);
  const second2 = Math.floor(second % 60);

  let mstr = '';
  let sstr = '';
  if (minute < 10) {
    mstr = '0' + minute;
  } else {
    mstr = minute.toString();
  }
  if (second2 < 10) {
    sstr = '0' + second2;
  } else {
    sstr = second2.toString();
  }

  return mstr + ':' + sstr;
};

export const dismissKeyboard = () => {
  Keyboard.dismiss();
};
export const isPhone = phone => {
  return /[01](0|1|6|7|8|9)(\d{4}|\d{3})\d{4}$/g.test(phone);
};
