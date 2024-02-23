import cristianTate from "../assets/images/american_psycho.jpg";
import gosling from "../assets/images/gosling.jpg";
import goggins from "../assets/images/goggins.jpg";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import image5 from "../assets/images/image5.png";
import image6 from "../assets/images/image6.png";
import image7 from "../assets/images/image7.png";
import image8 from "../assets/images/image8.png";

export const gyms = [
  {
    id: "1",
    gymName: "И-Талия",
    activitiesForMonth: "378",
    activitiesForWeek: "62",
    activitiesForDay: "14",
  },
  {
    id: "2",
    gymName: "GymBo",
    activitiesForMonth: "212",
    activitiesForWeek: "32",
    activitiesForDay: "7",
  },
  {
    id: "3",
    gymName: "Ленинград",
    activitiesForMonth: "1",
    activitiesForWeek: "1",
    activitiesForDay: "1",
  },
];

export const employees = [
  {
    id: "1",
    photo: cristianTate,
    name: "Виктор Пасечник",
    job: "Владелец",
    isThatYou: true,
  },
  {
    id: "2",
    photo: gosling,
    name: "Владислав Туйнов",
    job: "Старший менеджер",
    isThatYou: false,
  },
  {
    id: "3",
    photo: goggins,
    name: "Константин Барашенников",
    job: "Администратор",
    isThatYou: false,
  },
];

export const activities = [
  {
    id: 1,
    name: "Бокс",
    isActive: false,
  },
  {
    id: 2,
    name: "Смешанные единоборства",
    isActive: false,
  },
  {
    id: 3,
    name: "Баня",
    isActive: false,
  },
  {
    id: 4,
    name: "Силовые трениновки",
    isActive: false,
  },
  {
    id: 5,
    name: "Йога",
    isActive: false,
  },
];

export const features = [
  "Сменная обувь",
  "Спортивная одежда",
  "Справка о психическом состоянии",
];

export const activityPhotos = [
  {
    id: 1,
    image: image1,
  },
  {
    id: 2,
    image: image2,
  },
  {
    id: 3,
    image: image3,
  },
  {
    id: 4,
    image: image4,
  },
  {
    id: 5,
    image: image5,
  },
  {
    id: 6,
    image: image6,
  },
  {
    id: 7,
    image: image7,
  },
  {
    id: 8,
    image: image8,
  },
];

export const priveledges = [
  {
    id: 1,
    name: "Может просматривать статистику своего заведения",
  },
  {
    id: 2,
    name: "Может редактировать список активностей и вносить в них изменения (Фото, описание, особенности)",
  },
  { id: 3, name: "Может редактировать расписание" },
  {
    id: 4,
    name: "Имеет доступ к проверке пропуска у посетителей (Нужно, чтобы проверять и пропускать на входе посетителя, пришедшего от MyFit)",
  },
  {
    id: 5,
    name: "Может добавлять или редактировать сотрудников.",
  },
  {
    id: 6,
    name: "Может редактировать основную информацию о заведении (Название, лого, описание, адрес, контакты)",
  },
];

export const allRoles = [
  {
    id: 1,
    code: "ROLE_ADMIN",
    name: "Администратор",
    priveledges: [1, 2, 3, 4],
  },
  /* {
    id: 2,
    code: "ROLE_USER",
    name: "Пользователь",
    priveledges: [1],
  }, */
  {
    id: 3,
    code: "ROLE_DIRECTOR",
    name: "Директор",
    priveledges: [1, 2, 3, 4, 5, 6],
  },
  /* {
    id: 4,
    code: "ROLE_MANAGER",
    name: "Менеджер",
    priveledges: [1, 2, 3, 4],
  }, */
  {
    id: 5,
    code: "ROLE_WORKER",
    name: "Работник",
    priveledges: [1, 2, 3],
  },
];

export const DUMMY_LESSONS = [
  {
    id: 1,
    start: new Date("2024-02-10 15:00"),
    end: new Date("2024-02-10 17:00"),
    title: "Персональная тренировка c тренером сборной России",
  },
  {
    id: 2,
    start: new Date("2024-02-10 14:30"),
    end: new Date("2024-02-10 16:00"),
    title:
      "Персональная тренировка c заслуженным мастером спорта - Коваленко Виталием Геннадьевичем!",
  },
  {
    id: 3,
    start: new Date("2024-02-10 14:30"),
    end: new Date("2024-02-10 16:00"),
    title:
      "Персональная тренировка c заслуженным мастером спорта - Коваленко Виталием Геннадьевичем!",
  },
  {
    id: 4,
    start: new Date("2024-02-06 11:00"),
    end: new Date("2024-02-06 13:00"),
    title: "Персональная тренировка c тренером сборной России",
  },
  {
    id: 5,
    start: new Date("2024-02-09 10:30"),
    end: new Date("2024-02-09 14:00"),
    title:
      "Персональная тренировка c заслуженным мастером спорта - Коваленко Виталием Геннадьевичем!",
  },
];

export const times = [
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
  "22:15",
  "22:30",
  "22:45",
  "23:00",
  "23:15",
  "23:30",
  "23:45",
  "00:00",
  "00:15",
  "00:30",
  "00:45",
  "01:00",
  "01:15",
  "01:30",
  "01:45",
  "02:00",
  "02:15",
  "02:30",
  "02:45",
  "03:00",
  "03:15",
  "03:30",
  "03:45",
  "04:00",
  "04:15",
  "04:30",
  "04:45",
  "05:00",
  "05:15",
  "05:30",
  "05:45",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
];

export const WEEK_DAYS = [
  {
    id: 1,
    name: "Пн",
    isActive: false,
  },
  {
    id: 2,
    name: "Вт",
    isActive: false,
  },
  {
    id: 3,
    name: "Ср",
    isActive: false,
  },
  {
    id: 4,
    name: "Чт",
    isActive: false,
  },
  {
    id: 5,
    name: "Пт",
    isActive: false,
  },
  {
    id: 6,
    name: "Сб",
    isActive: false,
  },
  {
    id: 7,
    name: "Вс",
    isActive: false,
  },
];

export const HOURS = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

export const MINUTES = ["00", "10", "20", "30", "40", "50"];

export const DUMMY_CLIENTS = [
  {
    id: 1,
    name: "Иванов Иван",
    time: "10:00 - 13:00",
    day: "07.02 (Сегодня)",
    gym: "Ленинград",
    event: "Спортивный зал",
  },
  {
    id: 2,
    name: "Kizma Balls",
    time: "10:00 - 12:00",
    day: "08.02 (Завтра)",
    gym: "Ленинград",
    event: "Массаж",
  },
  {
    id: 3,
    name: "Алена Ивановна",
    time: "10:00 - 14:00",
    day: "09.02 (Пт)",
    gym: "Ленинград",
    event: "Бокс",
  },
];

export const RECENTLY_ATTENDENT = [
  {
    id: 1,
    name: "Иванов Иван",
    time: "10:00 - 13:00",
    event: "Смешанные единоборства",
    gym: "Ленинград",
  },
  {
    id: 2,
    name: "Евгений Петров",
    time: "10:00 - 12:00",
    event: "Спортивный зал",
    gym: "Ленинград",
  },
];

export const COME_LATER = [
  {
    id: 1,
    name: "Kizma Balls",
    time: "10:00 - 12:00",
    event: "Массаж",
    gym: "Ленинград",
  },
  {
    id: 2,
    name: "Алена Ивановна",
    time: "10:00 - 14:00",
    event: "Бокс",
    gym: "Ленинград",
  },
];

export const CANCELLATION_REASONS = [
  {
    id: 1,
    name: "Закончились места",
  },
  {
    id: 2,
    name: "Занятие перенесено на другое время или дату",
  },
  {
    id: 3,
    name: "Занятие отменилось",
  },
];
