export const genDateNow = () => {
  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return date;
};

export const getTimeNow = () => {
  var today = new Date();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return time;
};

export const getFullDay = () => {
  return genDateNow() + ' ' + getTimeNow();
};

export const compareTwoTimeMore = (awal, akhir) => {
  var tglAwal = new Date(genDateNow() + ' ' + awal);
  var tglAkhir = new Date(genDateNow() + ' ' + akhir);
  var state = false;
  if (tglAkhir > tglAwal) {
    state = true;
  }
  return state;
};
