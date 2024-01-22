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

export const roles = [
  {
    id: 1,
    name: "Может просматривать статистику своего заведения",
    available: true,
  },
  {
    id: 2,
    name: "Может редактировать список активностей и вносить в них изменения (Фото, описание, особенности)",
    available: true,
  },
  { id: 3, name: "Может редактировать расписание", available: true },
  {
    id: 4,
    name: "Имеет доступ к проверке пропуска у посетителей (Нужно, чтобы проверять и пропускать на входе посетителя, пришедшего от MyFit)",
    available: true,
  },
  {
    id: 5,
    name: "Не может добавлять или редактировать сотрудников.",
    available: false,
  },
  {
    id: 6,
    name: "Не может редактировать основную информацию о заведении (Название, лого, описание, адрес, контакты)",
    available: false,
  },
];

export const allRoles = [
  {
    id: 1,
    code: "ROLE_ADMIN",
    name: "Администратор",
  },
  {
    id: 2,
    code: "ROLE_USER",
    name: "Пользователь",
  },
  {
    id: 3,
    code: "ROLE_DIRECTOR",
    name: "Директор",
  },
  {
    id: 4,
    code: "ROLE_MANAGER",
    name: "Менеджер",
  },
  {
    id: 5,
    code: "ROLE_WORKER",
    name: "Работник",
  },
];
