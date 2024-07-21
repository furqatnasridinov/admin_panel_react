export function getMaxLines(duration) {
    switch (duration) {
        case 60:
            return 1;
            break;
        case 70:
            return 2;
            break;
        case 80:
            return 3;
            break;
        case 80:
            return 3;
            break;
    }
}

export function getColorOfActivity({activityName}) {
    var color = "black";
    switch (activityName) {
      case "Йога":
        color = "rgba(119, 170, 249, 1)"
        break;
      case "Бассейн":
        color = "rgba(236, 191, 117, 1)";
        break;
      case "Медитации":
        color = "red";
        break;
      case "Спортзал":
        color = "brown";
        break;
      case "Секция бокса":
        color = "rgba(62, 134, 245, 1)";
        break;
      case "Кардио-тренировки":
        color = "green";
        break;
      case "Массаж":
        color = "rgba(89, 86, 248, 1)";
        break;
      case "Силовые тренировки":
        color = "rgba(144, 76, 213, 1)";
        break;
      case "Смешанные единоборства":
        color = "rgba(154, 73, 201, 1)";
        break;
    }
    return color;
}

export function getMonthName(month) {
    switch (month) {
        case 1:
        case "January":
            return "Январь";
        case 2:
        case "February":
            return "Февраль";
        case 3:
        case "March":
            return "Март";
        case 4:
        case "April":
            return "Апрель";
        case 5:
        case "May":
            return "Май";
        case 6:
        case "June":
            return "Июнь";
        case 7:
        case "July":
            return "Июль";
        case 8:
        case "August":
            return "Август";
        case 9:
        case "September":
            return "Сентябрь";
        case 10:
        case "October":
            return "Октябрь";
        case 11:
        case "November":
            return "Ноябрь";
        case 12:
        case "December": 
            return "Декабрь";
        default:
            return "";
    }
}

export function getMonthMaxDays() {
  // we are getting prev month because we are using 0 based month index
  const month = new Date().getMonth() /* + 1 */;
    switch (month) {
        case 1:
            return 31;
            break;
        case 2:
            return 28;
            break;
        case 3:
            return 31;
            break;
        case 4:
            return 30;
            break;
        case 5:
            return 31;
            break;
        case 6:
            return 30;
            break;
        case 7:
            return 31;
            break;
        case 8:
            return 31;
            break;
        case 9:
            return 30;
            break;
        case 10:
            return 31;
            break;
        case 11:
            return 30;
            break;
        case 12:
            return 31;
            break;
    }
}

export function getDayAndMonth(day) {
   // from 1 to 1 Июня
   const todayInt = new Date().getDate();
   if (day > todayInt) {
       return `${day} ${getMonthName(new Date().getMonth())}`;
   }else{
      return `${day} ${getMonthName(new Date().getMonth() + 1)}`;
   }
}

export function getAllKeysForYearperiod() {
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns month index starting from 0
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 13; i++) {
        const month = (currentMonth - i - 1 + 12) % 12 + 1; // calculate the month for each key
        const year = currentYear - ((month > currentMonth || i == 0) ? 1 : 0); // subtract 1 from the year if the month is greater than the current month
        years.unshift(`${month}.${year}`); // add the key to the start of the array
    }
    return years;
}

export function reorderObjectByDate(obj){
    //{April 2024 : "1", August 2023 : "12", December 2023 : "4", February 2024 : "12",}
    // to
    // {August 2023 : "12", December 2023 : "4", February 2024 : "12", April 2024 : "1"}
    const ordered = {};
    Object.keys(obj)
        .sort((a, b) => new Date(a) - new Date(b)) // convert keys to Date objects for sorting
        .forEach(function(key) {
            ordered[key] = obj[key];
        });
    return ordered;
}

export function getMonthWord(date) {
    if (date) {
        // from April 2024 to Апрель and if it is the current month $currenday $month
        try {
            const dateObj = new Date(date);
            const today = new Date();
            const todayMonth = today.getMonth();
            const todayYear = today.getFullYear();
            const month = dateObj.getMonth();
            const year = dateObj.getFullYear();
            if (todayMonth === month && todayYear === year) {
                return `${today.getDate()} ${getMonthName(month + 1)}`;
            }
            return `${getMonthName(month + 1)}`;
        } catch (error) {
            throw new Error(`getMonthWord ${error}`);
        }
    }
}

export function getAllKeysForMonthperiod() {
    // if today is 5.6.2024 then from 4.5.2024 to 5.6.2024
    const currentDate = new Date();
    const days = [];
    for (let i = 0; i <= getMonthMaxDays(); i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i);
        const day = date.getDate();
        const month = date.getMonth() + 1; // getMonth() returns month index starting from 0
        const year = date.getFullYear();
        days.unshift(`${day}.${month}.${year}`);
    }
    return days;
}

export function getDayAndMonth2(date){
    // from 1.6.2024 to 1 June
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const parts = date.split('.');
    const day = parts[0];
    const monthIndex = parts[1] - 1; // getMonth() returns month index starting from 0
    const monthName = monthNames[monthIndex];
    return `${day} ${monthName}`;
}

export function reorderObjectByDate2(obj){
    //{1 June  : "1", 10 May : "12", 2 June  : "4",}
    // to
    // {10 May : "12", 2 June  : "4", 1 June  : "1"}
    const ordered = {};
    Object.keys(obj)
        .sort((a, b) => new Date(a) - new Date(b)) // convert keys to Date objects for sorting
        .forEach(function(key) {
            ordered[key] = obj[key];
        });
    return ordered;
}

export function getTranslatedDayAndMonth(date) {
    // from 1 June to 1 Июня
    const parts = date.split(' ');
    const day = parts[0];
    const month = parts[1];
    return `${day} ${getMonthName(month)}`;
}



export function getAllKeysForWeekperiod() {
    // if today is 5.6.2024 then from 29.5.2024 to 5.6.2024, 8 days (from Monday to Monday)
    const currentDate = new Date();
    const days = [];
    for (let i = 0; i <= 7; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i);
        const day = date.getDate();
        const month = date.getMonth() + 1; // getMonth() returns month index starting from 0
        const year = date.getFullYear();
        days.unshift(`${day}.${month}.${year}`);
    }
    return days;
}

export function getAllKeysForDayPeriod(){
    // from 00:00 to 23:00 => [0:00, 1:00, 2:00, ... 23:00]
    const hours = [];
    for (let i = 0; i <= 23; i++) {
        hours.push(`${i}:00`);
    }
    return hours;
}


export function getBirthdayFormatted(date){
    // from 18.11.2003 to 2003-11-18
    const parts = date.split('.');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`;
}

export const getBirthdayFormatted2 = (date) => {
    // from 2003-11-18 to 18.11.2003
    if (date) {
        const parts = date.split('-');
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
        return `${day}.${month}.${year}`;
    }
}


export function getGenderTranslated(gender) {
    if (gender) {
        if (gender === "MALE") {
            return "Мужской";
        }else{
            return "Женский";
        }
    }
}

export function translateGender(gender){
    if (gender) {
        if (gender === "Мужской") {
            return "MALE";
        }else{
            return "FEMALE";
        }
    }
}

export function removeHours(date){
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}


export function getApiLikeWeekDays(weekdays){
    // from [1, 2, 3, 4] to [MONDAY, TUESDAY, WEDNESDAY, THURSDAY]
    const days = [];
    weekdays.forEach(day => {
        switch (day) {
            case 1:
                days.push("MONDAY");
                break;
            case 2:
                days.push("TUESDAY");
                break;
            case 3:
                days.push("WEDNESDAY");
                break;
            case 4:
                days.push("THURSDAY");
                break;
            case 5:
                days.push("FRIDAY");
                break;
            case 6:
                days.push("SATURDAY");
                break;
            case 7:
                days.push("SUNDAY");
                break;
        }
    });
    return days;
}