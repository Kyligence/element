import dateUtil from 'kyligence-ui/src/utils/date';
import { t } from 'kyligence-ui/src/locale';

const weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const getI18nSettings = () => {
  return {
    dayNamesShort: weeks.map(week => t(`el.datepicker.weeks.${ week }`)),
    dayNames: weeks.map(week => t(`el.datepicker.weeks.${ week }`)),
    monthNamesShort: months.map(month => t(`el.datepicker.months.${ month }`)),
    monthNames: months.map((month, index) => t(`el.datepicker.month${ index + 1 }`)),
    amPm: ['am', 'pm']
  };
};

const newArray = function(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

export const toDate = function(date) {
  return isDate(date) ? new Date(date) : null;
};

export const isDate = function(date) {
  if (date === null || date === undefined) return false;
  if (isNaN(new Date(date).getTime())) return false;
  return true;
};

export const isDateObject = function(val) {
  return val instanceof Date;
};

export const formatDate = function(date, format) {
  date = toDate(date);
  if (!date) return '';
  return dateUtil.format(date, format || 'yyyy-MM-dd', getI18nSettings());
};

export const parseDate = function(string, format) {
  return dateUtil.parse(string, format || 'yyyy-MM-dd', getI18nSettings());
};

export const getDayCountOfMonth = function(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

export const getDayCountOfYear = function(year) {
  const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  return isLeapYear ? 366 : 365;
};

export const getFirstDayOfMonth = function(date) {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

// see: https://stackoverflow.com/questions/3674539/incrementing-a-date-in-javascript
// {prev, next} Date should work for Daylight Saving Time
// Adding 24 * 60 * 60 * 1000 does not work in the above scenario
export const prevDate = function(date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};

export const nextDate = function(date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

export const getStartDateOfMonth = function(year, month) {
  const result = new Date(year, month, 1);
  const day = result.getDay();

  if (day === 0) {
    return prevDate(result, 7);
  } else {
    return prevDate(result, day);
  }
};

export const getWeekNumber = function(src) {
  const date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

export const getRangeHours = function(ranges) {
  const hours = [];
  let disabledHours = [];

  (ranges || []).forEach(range => {
    const value = range.map(date => date.getHours());

    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });

  if (disabledHours.length) {
    for (let i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1;
    }
  } else {
    for (let i = 0; i < 24; i++) {
      hours[i] = false;
    }
  }

  return hours;
};

export const range = function(n) {
  // see https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
  return Array.apply(null, {length: n}).map((_, n) => n);
};

export const modifyDate = function(date, y, m, d) {
  return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};

export const modifyTime = function(date, h, m, s) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, s, date.getMilliseconds());
};

export const modifyWithTimeString = (date, time) => {
  if (date == null || !time) {
    return date;
  }
  time = parseDate(time, 'HH:mm:ss');
  return modifyTime(date, time.getHours(), time.getMinutes(), time.getSeconds());
};
export const clearTime = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const clearMilliseconds = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
};

export const limitTimeRange = function(date, ranges, format = 'HH:mm:ss') {
  // TODO: refactory a more elegant solution
  if (ranges.length === 0) return date;
  const normalizeDate = date => dateUtil.parse(dateUtil.format(date, format), format);
  const ndate = normalizeDate(date);
  const nranges = ranges.map(range => range.map(normalizeDate));
  if (nranges.some(nrange => ndate >= nrange[0] && ndate <= nrange[1])) return date;

  let minDate = nranges[0][0];
  let maxDate = nranges[0][0];

  nranges.forEach(nrange => {
    minDate = new Date(Math.min(nrange[0], minDate));
    maxDate = new Date(Math.max(nrange[1], minDate));
  });

  const ret = ndate < minDate ? minDate : maxDate;
  // preserve Year/Month/Date
  return modifyDate(
    ret,
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
};

export const timeWithinRange = function(date, selectableRange, format) {
  const limitedDate = limitTimeRange(date, selectableRange, format);
  return limitedDate.getTime() === date.getTime();
};

export const changeYearMonthAndClampDate = function(date, year, month) {
  // clamp date to the number of days in `year`, `month`
  // eg: (2010-1-31, 2010, 2) => 2010-2-28
  const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
  return modifyDate(date, year, month, monthDate);
};

export const prevMonth = function(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 0
    ? changeYearMonthAndClampDate(date, year - 1, 11)
    : changeYearMonthAndClampDate(date, year, month - 1);
};

export const nextMonth = function(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 11
    ? changeYearMonthAndClampDate(date, year + 1, 0)
    : changeYearMonthAndClampDate(date, year, month + 1);
};

export const prevYear = function(date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year - amount, month);
};

export const nextYear = function(date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year + amount, month);
};

export const setDate = function(date = new Date(), type, value) {
  date = new Date(date.getTime());
  switch (type) {
    case 'year':
      date.setFullYear(value);
      return date;
    case 'month':
      date.setMonth(value - 1);
      return date;
    case 'date':
      date.setDate(value);
      return date;
    case 'hours':
      date.setHours(value);
      return date;
    case 'minutes':
      date.setMinutes(value);
      return date;
    case 'seconds':
      date.setSeconds(value);
      return date;
  };
};

export const parseDateInput = function(value = '') {
  return {
    year: value.slice(0, 4).length === 4 && +value.slice(0, 4),
    month: value.slice(5, 7).length === 2 && +value.slice(5, 7),
    date: value.slice(8, 10).length === 2 && +value.slice(8, 10),
    hours: value.slice(11, 13).length === 2 && +value.slice(11, 13),
    minutes: value.slice(14, 16).length === 2 && +value.slice(14, 16),
    seconds: value.slice(17, 19).length === 2 && +value.slice(17, 19)
  };
};
export const autoCompleteDateSplit = function(type, value = '') {
  const dateSplitIdxs = [4, 7];
  const timeSplitIdxs = [13, 16];
  const dateTimeSplitIdxs = [10];
  const splitChars = ['-', ' ', ':'];
  const regx = /^(\d{1,4})(\d{1,2})(\d{1,2})$/;
  value = value.replace(/^\s+|\s+$/, '');
  const autoCompleteIdxs = [
    ...(['date', 'datetime'].includes(type) ? dateSplitIdxs : []),
    ...(type === 'datetime' ? dateTimeSplitIdxs : []),
    ...(type === 'datetime' ? timeSplitIdxs : [])
  ];
  const isEndWithSplit = splitChars.includes(value[value.length - 1]);

  // 用户输入是否以分隔符结束
  if (isEndWithSplit) {
    const valueWithoutEndSplit = value.slice(0, value.length - 1);
    const valueItems = valueWithoutEndSplit.split(/\-|\:|\s/g);
    const lastValueItem = +valueItems[valueItems.length - 1];
    if (lastValueItem < 10) {
      let lastSplitCharIdx = -1;

      splitChars.forEach(splitChar => {
        const lastIdx = valueWithoutEndSplit.lastIndexOf(splitChar);
        lastIdx > lastSplitCharIdx && (lastSplitCharIdx = lastIdx);
      });
      // 分隔符结束的个位数自动补0
      value = `${value.slice(0, lastSplitCharIdx + 1)}0${lastValueItem}`;
    }
  } else if (value.length === 8 && regx.test(value)) {
    return value.replace(regx, (_, $0, $1, $2) => {
      return `${$0}-${$1}-${$2}`;
    });
  }

  // 自动补齐分隔符
  const currentIdx = autoCompleteIdxs.indexOf(value.length);
  if (!~currentIdx) {
    return value;
  } else if (currentIdx < 2) {
    return `${value}-`;
  } else if (currentIdx === 2) {
    return `${value} 00:00:00`;
  } else if (currentIdx > 2) {
    return `${value}:`;
  }
};

export function getCurrntParentByClass(el, className) {
  let currentEl = el;
  let result = null;

  do {
    if (currentEl.className && ~currentEl.className.split(' ').indexOf(className)) {
      result = currentEl;
    } else {
      currentEl = currentEl.parentNode;
    }
  } while (currentEl.parentNode && !result);

  return result;
}

