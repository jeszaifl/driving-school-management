function IsEmpty(str) {
  return str === undefined || str === null || str === '';
}

function IsArrayEmpty(arr) {
  let ret = true;

  if (Array.isArray(arr)) ret = arr.length === 0;

  return ret
}

function IsObjEmpty(obj) {
  return obj === null || obj === undefined || Object.keys(obj).length === 0;
}

function formatDateYYYYMMDD(date) {
  const d = new Date(date);
  let month = `${(d.getMonth() + 1)}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
}

function removeKeyFromObject(obj, arrayOfKey) {
  const objToFilter = obj
  arrayOfKey.forEach((element) => {
    delete objToFilter[element];
  });
  return objToFilter
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export {
  IsEmpty,
  IsArrayEmpty,
  IsObjEmpty,
  formatDateYYYYMMDD,
  removeKeyFromObject,
  addDays
}
