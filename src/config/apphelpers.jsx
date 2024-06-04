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
            return "Январь";
            break;
        case 2:
            return "Февраль";
            break;
        case 3:
            return "Март";
            break;
        case 4:
            return "Апрель";
            break;
        case 5:
            return "Май";
            break;
        case 6:
            return "Июнь";
            break;
        case 7:
            return "Июль";
            break;
        case 8:
            return "Август";
            break;
        case 9:
            return "Сентябрь";
            break;
        case 10:
            return "Октябрь";
            break;
        case 11:
            return "Ноябрь";
            break;
        case 12:
            return "Декабрь";
            break;
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

export function getSortedKeys( arr ) {
  const todayInt = new Date().getDate();
  return arr.sort((a, b) => {
    if (a > todayInt && b > todayInt) {
      return a - b;
    }else{
      return b - a;
    }
  });
}