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

function isValidUrl(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i')
  return !!pattern.test(str);
}

function validateFields(form) {
  const inputs = form.getElementsByTagName('input');
  const selects = form.getElementsByTagName('select');
  const textareas = form.getElementsByTagName('textarea');

  const checklist = [...inputs, ...selects, ...textareas];
  let ret = true
  let el = [];
  let isValid = false;

  for (let i = 0; i < checklist.length; i += 1) {
    el = checklist[i]
    isValid = el.checkValidity();

    if (el.required) {
      if (isValid) {
        el.classList.remove('invalid-border')
      } else {
        el.classList.add('invalid-border')
        ret = false
      }
    } else {
      el.classList.remove('invalid-border')
    }

    // if (!isValid) {
    //   el.classList.add('invalid-border')
    //   ret = false
    // } else {
    //   el.classList.remove('invalid-border')
    // }
  }

  return ret
}

export {
  IsEmpty,
  IsArrayEmpty,
  IsObjEmpty,
  formatDateYYYYMMDD,
  removeKeyFromObject,
  isValidUrl,
  addDays,
  validateFields
}
