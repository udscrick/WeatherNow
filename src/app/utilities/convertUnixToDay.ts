export function convertDate(unixTimestamp:number,offset?: number){
  const date: Date = new Date(unixTimestamp * 1000);
  
  const localDate: Date = offset?new Date(date.getTime()+ offset * 1000):new Date(date.getTime())
  
  // Formatting the date and time
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // "long" for the full name of the day, "short" for the abbreviated name.
    hour: '2-digit', // "2-digit" for a two-digit numerical value.
    minute: '2-digit', // "2-digit" for a two-digit numerical value.
    hour12: false ,// false to use the 24-hour clock.
    timeZone: 'UTC'
  };
  
  const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(localDate);
  
  
  return formattedDate
  }