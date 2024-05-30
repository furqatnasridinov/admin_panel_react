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