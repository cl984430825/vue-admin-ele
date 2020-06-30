// 标准时间格式转换; date: 要转换的时间、format: 要转换成的格式
function transitionDate(date, format){
	let newDate = new Date(date)
	let year = newDate.getFullYear()
	let month = newDate.getMonth() + 1
  let day = newDate.getDate()
	let hours = newDate.getHours()
	let Minutes = newDate.getMinutes()
	let seconds = newDate.getSeconds()
	if(format == 'YYYY-MM'){
    return year+'-'+(month<10?'0'+month:month)
  }else if(format == 'YYYY-MM-DD'){
    return year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)
  }else if(format == 'YYYY-MM-DD HH:MM:SS'){
    return year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)+' '+(hours<10?'0'+hours:hours)+':'+(Minutes<10?'0'+Minutes:Minutes)+':'+(seconds<10?'0'+seconds:seconds)
  }
}
export default {
  transitionDate
};
