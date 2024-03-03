export function convertDate(unixTimestamp:number){
    // Example Unix timestamp and timezone offset from the API response
  
  // Convert Unix timestamp to milliseconds (JavaScript Date uses milliseconds)
  const date: Date = new Date(unixTimestamp * 1000);
  
  // Adjust for the timezone offset
  // JavaScript's Date object timezone offset is in minutes and returns the difference in minutes between UTC and the local time,
  // so we convert the API's timezone offset from seconds to minutes and invert it to match JavaScript's convention.
  const localDate: Date = new Date(date.getTime());
  
  // Formatting the date and time
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // "long" for the full name of the day, "short" for the abbreviated name.
    hour: '2-digit', // "2-digit" for a two-digit numerical value.
    minute: '2-digit', // "2-digit" for a two-digit numerical value.
    hour12: false // false to use the 24-hour clock.
  };
  
  // Use Intl.DateTimeFormat for a formatted string based on the user's locale and options for displaying date and time parts
  const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(localDate);
  
  
  return formattedDate
  }