import type { DashboardData } from "./types";

export const dashboardData: DashboardData = {
  user: {
    name: "Dr. User",
    specialization: "Кардиология",
    greetingDate: "воскресенье, 24 мая 2026 г.",
  },
  stats: [
    {
      id: "streak",
      value: "7 дней",
      label: "Streak",
      icon: "flame",
      color: "orange",
    },
    {
      id: "tests",
      value: "12",
      label: "Тестов сдано",
      icon: "file",
      color: "blue",
    },
    {
      id: "lectures",
      value: "34",
      label: "Лекций просмотрено",
      icon: "book",
      color: "purple",
    },
    {
      id: "average",
      value: "87%",
      label: "Среднее по тестам",
      icon: "chart",
      color: "green",
    },
  ],
  recommendations: [
    {
      id: "rec-1",
      type: "Видеолекция",
      typeIcon: "play",
      title:
        "Острая сердечная недостаточность: диагностика и лечение",
      duration: "45 мин",
      category: "Кардиология",
    },
    {
      id: "rec-2",
      type: "Статья",
      typeIcon: "book",
      title:
        "Клинические протоколы лечения инфаркта миокарда 2025",
      duration: "15 мин",
      category: "МКБ I21",
    },
  ],
  events: [
    {
      id: "event-1",
      title:
        "Центрально-Азиатский форум «Гигиена и инфекционный контроль»",
      location: "Алматы",
      date: "14-15 мая 2026",
      status: "Регистрация открыта",
      statusVariant: "green",
    },
    {
      id: "event-2",
      title:
        "Симпозиум по зоонозным инфекциям (Бруцеллез и Туляремия)",
      location: "Стамбул",
      date: "18-20 октября 2026",
      status: "Подача тезисов",
      statusVariant: "blue",
    },
  ],
  competencies: [
    {
      id: "comp-1",
      name: "ОСНОВЫ АНАТОМИИ",
      progress: 80,
      status: "Активно",
      color: "green",
    },
    {
      id: "comp-2",
      name: "ГИСТОЛОГИЯ",
      progress: 65,
      status: "В процессе",
      color: "blue",
    },
    {
      id: "comp-3",
      name: "ЭПИДЕМИОЛОГИЯ",
      progress: 33,
      status: "Требует внимания",
      color: "orange",
    },
    {
      id: "comp-4",
      name: "ФАРМАКОЛОГИЯ",
      progress: 51,
      status: "В процессе",
      color: "purple",
    },
  ],
  dailyPlan: {
    title: "Твой план на сегодня",
    subtitle: "3 задачи • ~2 часа",
  },
};
