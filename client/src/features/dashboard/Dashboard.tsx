import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  FileText,
  Flame,
  Globe,
  Play,
  TrendingUp,
} from "lucide-react";
import { dashboardData } from "./dashboard-data";
import styles from "./Dashboard.module.css";
import type { Competency, StatItem } from "./types";

const statIconMap = {
  flame: Flame,
  file: FileText,
  book: BookOpen,
  chart: BarChart3,
} as const;

const statColorClass = {
  orange: styles.statIconWrapOrange,
  blue: styles.statIconWrapBlue,
  purple: styles.statIconWrapPurple,
  green: styles.statIconWrapGreen,
} as const;

const progressColorClass = {
  green: styles.progressGreen,
  blue: styles.progressBlue,
  orange: styles.progressOrange,
  purple: styles.progressPurple,
} as const;

function StatCard({ stat }: { stat: StatItem }) {
  const Icon = statIconMap[stat.icon];

  return (
    <article className={styles.statCard}>
      <div
        className={`${styles.statIconWrap} ${statColorClass[stat.color]}`}
      >
        <Icon size={22} strokeWidth={2} />
      </div>
      <div>
        <div className={styles.statValue}>{stat.value}</div>
        <div className={styles.statLabel}>{stat.label}</div>
      </div>
    </article>
  );
}

function competencyBadgeClass(comp: Competency) {
  if (comp.status === "Активно") return styles.competencyBadgeActive;
  if (comp.status === "Требует внимания") return styles.competencyBadgeAttention;
  return "";
}

const Dashboard = () => {
  const { user, stats, recommendations, events, competencies, dailyPlan } =
    dashboardData;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.greetingBlock}>
          <h1 className={styles.greeting}>
            Добро пожаловать, {user.name}
          </h1>
          <p className={styles.date}>{user.greetingDate}</p>
        </div>
        <button type="button" className={styles.planButton}>
          <CalendarDays size={18} strokeWidth={2} />
          Мой план
        </button>
      </header>

      <section className={styles.statsRow} aria-label="Статистика">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <div className={styles.contentGrid}>
        <div className={styles.leftColumn}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Рекомендовано для вас</h2>
              <button type="button" className={styles.sectionLink}>
                Все материалы
                <ChevronRight size={16} />
              </button>
            </div>
            <div className={styles.recommendationsList}>
              {recommendations.map((item) => (
                <article key={item.id} className={styles.recommendationCard}>
                  <div className={styles.recIconWrap}>
                    {item.typeIcon === "play" ? (
                      <Play size={20} fill="currentColor" strokeWidth={0} />
                    ) : (
                      <BookOpen size={20} strokeWidth={2} />
                    )}
                  </div>
                  <div className={styles.recBody}>
                    <span className={styles.recTag}>{item.type}</span>
                    <h3 className={styles.recTitle}>{item.title}</h3>
                    <p className={styles.recMeta}>
                      {item.duration} • {item.category}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Предстоящие мероприятия</h2>
              <button type="button" className={styles.sectionLink}>
                Science Hub
                <ChevronRight size={16} />
              </button>
            </div>
            <div className={styles.eventsList}>
              {events.map((event) => (
                <article key={event.id} className={styles.eventCard}>
                  <div className={styles.eventIconWrap}>
                    <Globe size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.eventBody}>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.eventMeta}>
                      {event.location} • {event.date}
                    </p>
                    <span
                      className={`${styles.statusBadge} ${
                        event.statusVariant === "green"
                          ? styles.statusGreen
                          : styles.statusBlue
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.rightColumn}>
          <section className={styles.section}>
            <div className={styles.competencyHeader}>
              <h2 className={styles.sectionTitle}>Карта компетенций</h2>
              <TrendingUp
                className={styles.trendIcon}
                size={18}
                strokeWidth={2}
              />
            </div>
            <div className={styles.competenciesList}>
              {competencies.map((comp) => (
                <div key={comp.id} className={styles.competencyItem}>
                  <div className={styles.competencyTop}>
                    <span className={styles.competencyName}>{comp.name}</span>
                    <span className={styles.competencyProgress}>
                      {comp.progress}%
                    </span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div
                      className={`${styles.progressFill} ${progressColorClass[comp.color]}`}
                      style={{ width: `${comp.progress}%` }}
                    />
                  </div>
                  <span
                    className={`${styles.competencyBadge} ${competencyBadgeClass(comp)}`}
                  >
                    {comp.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <button type="button" className={styles.dailyPlanCard}>
            <div className={styles.dailyPlanIcon}>
              <CalendarDays size={20} strokeWidth={2} />
            </div>
            <div className={styles.dailyPlanText}>
              <div className={styles.dailyPlanTitle}>{dailyPlan.title}</div>
              <div className={styles.dailyPlanSubtitle}>
                {dailyPlan.subtitle}
              </div>
            </div>
            <ChevronRight
              className={styles.dailyPlanArrow}
              size={20}
              strokeWidth={2}
            />
          </button>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;
