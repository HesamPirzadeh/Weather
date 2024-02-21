

const DAYS = [
    "sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];


const weekDays = (data) => {
   
    return DAYS[new Date(data * 1000).getDay()];
  };
  
  export {weekDays}