function getToday(){
  var now = new Date();
  var y = now.getFullYear();
  var m =now.getMonth();
  var d = now.getDate();
  var today = y+'/'+m+'/'+d;
  return today;
}
function getFullYear(){
  var now = new Date();
  var y = now.getFullYear();
  return y;
}
function dateDiff(sDate1,sDate2){
  sDate1 = sDate1.replace(/-/g,'/');
  sDate2 = sDate2.replace(/-/g,'/');
  var oDate1 = new Date(sDate1);
  var oDate2 = new Date(sDate2);
  var iDays = parseInt((oDate2-oDate1)/1000/3600/24);
  return iDays;
}
function getNextBirthday(b_day){
  var today = getToday();
  var y = getFullYear();
  var n = dateDiff(today,y+'-'+b_day);
  //今年生日过了
  if(n<0){
    y++;
    n = dateDiff(today,y+'-'+b_day);
  }
  return n;
}
module.exports={
  getToday:getToday,
  getFullYear:getFullYear,
  dateDiff:dateDiff,
  getNextBirthday:getNextBirthday
}