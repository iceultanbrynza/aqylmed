import styles from "./Sidebar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Book,
  FlaskConical,
  FolderOpen,
  Sparkles,
} from "lucide-react";

const NAV_LINKS = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  { id: "plan", label: "Plan", path: "/calendar", icon: CalendarDays },
  { id: "library", label: "Library", path: "/bookmarks", icon: Book },
  {
    id: "science-hub",
    label: "Science Hub",
    path: "/science-hub",
    icon: FlaskConical,
  },
  { id: "subjects", label: "Subjects", path: "/subjects", icon: FolderOpen },
  { id: "ai-agent", label: "AI Agent", path: "/ai-agent", icon: Sparkles },
];

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <h1 className={styles.sidebarTitle}>Aqyl Med</h1>
        <div className={styles.sidebarSubtitle}>
          <span>Assosiations</span>
          <div className={styles.delimeterCircle}></div>
          <span>ESTD 2026</span>
        </div>
      </div>

      <div className={styles.navLinksContainer}>
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.id}
              to={link.path}
              className={
                activeTab === link.id ? styles.activeLink : styles.navLink
              }
              onClick={() => setActiveTab(link.id)}
            >
              <Icon className={styles.navIcon} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
