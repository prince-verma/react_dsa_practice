function getTime(timeStr: { match: (arg0: RegExp) => [any, any, any, any]; }): Date{
    const [_, hourStr, minuteStr, meridian] = timeStr.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
    let hours = parseInt(hourStr);
    const minutes = parseInt(minuteStr);

    if (meridian.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    } else if (meridian.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    const date = new Date()
    date.setHours(hours, minutes, 0, 0);
    return date;
}

function getTimeDiff(time1: Date, time2: Date){
  return time2.getTime() - time1.getTime()
}
function pad(num: number){return num.toString().padStart(2, '0');}

function getTimeString(timeInMs: number){
   const totalMinutes = Math.floor(timeInMs / (60 * 1000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${pad(hours)}:${pad(minutes)}`;
}

function MostFreeTime(strArr: any[]) { 
  const timeArr = strArr.map((item: { split: (arg0: string) => [any, any]; }) => {
    let [startTime, endTime] = item.split('-')
    return [getTime(startTime), getTime(endTime)]
  }).sort((a: Date[], b: Date[]) => a[0].getTime()-b[0].getTime())

  let maxTimeDiff = -Infinity
  for(let i=1; i< timeArr.length; i++){
    const timeDiff = getTimeDiff(timeArr[i-1][1], timeArr[i][0])
    if(timeDiff > maxTimeDiff){
      maxTimeDiff = timeDiff
    }
  }

  return getTimeString(maxTimeDiff)
}


// Example usage:
// const input = [
//   "10:00AM-11:00AM",
//   "01:00PM-02:00PM",
//   "03:00PM-04:00PM",
//   "12:00PM-01:00PM"
// ];
// console.log(MostFreeTime(input));
