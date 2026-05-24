export type StatItem = {
  id: string;
  value: string;
  label: string;
  icon: "flame" | "file" | "book" | "chart";
  color: "orange" | "blue" | "purple" | "green";
};

export type Recommendation = {
  id: string;
  type: string;
  typeIcon: "play" | "book";
  title: string;
  duration: string;
  category: string;
};

export type EventItem = {
  id: string;
  title: string;
  location: string;
  date: string;
  status: string;
  statusVariant: "green" | "blue";
};

export type Competency = {
  id: string;
  name: string;
  progress: number;
  status: string;
  color: "green" | "blue" | "orange" | "purple";
};

export type DashboardData = {
  user: {
    name: string;
    specialization: string;
    greetingDate: string;
  };
  stats: StatItem[];
  recommendations: Recommendation[];
  events: EventItem[];
  competencies: Competency[];
  dailyPlan: {
    title: string;
    subtitle: string;
  };
};
