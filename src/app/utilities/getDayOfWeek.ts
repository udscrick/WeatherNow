

export const getDayOfWeek = (unixTimestamp:number) => {

const date = new Date(unixTimestamp * 1000);

const dayOfWeek = date.getDay();

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

return days[dayOfWeek];


}

