import toolkit from "./index";
function CYB(val) {
  return (Number(val) / 100).toFixed(2);
}
function FIXED(num) {
  return Number(num).toFixed(2);
}
function TRANSDATE(date){
  return toolkit.transitionDate(date, "YYYY-MM-DD HH:MM:SS");
}

export default {
  CYB,
  FIXED,
  TRANSDATE
};
