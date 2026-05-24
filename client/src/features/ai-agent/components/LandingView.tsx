import { Sparkles } from "lucide-react";
import { BOOK_FILTERS } from "../types";
import PromptInput from "./PromptInput";
import styles from "./LandingView.module.css";

interface LandingViewProps {
  input: string;
  isLoading: boolean;
  selectedFilterId: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onFilterChange: (filterId: string) => void;
}

const LandingView = ({
  input,
  isLoading,
  selectedFilterId,
  onInputChange,
  onSend,
  onFilterChange,
}: LandingViewProps) => {
  return (
    <div className={styles.landing}>
      <div className={styles.hero}>
        <div className={styles.iconWrap}>
          <Sparkles size={28} color="var(--med-green)" />
        </div>
        <h1 className={styles.title}>AQYL AI</h1>
        <p className={styles.subtitle}>
          Ask questions about your medical textbooks and get instant answers.
        </p>

        <div className={styles.filterGroup}>
          <label htmlFor="book-filter" className={styles.filterLabel}>
            Source
          </label>
          <select
            id="book-filter"
            className={styles.filterSelect}
            value={selectedFilterId}
            onChange={(e) => onFilterChange(e.target.value)}
            disabled={isLoading}
          >
            {BOOK_FILTERS.map((book) => (
              <option key={book.id} value={book.id}>
                {book.book_title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.inputArea}>
        <PromptInput
          value={input}
          onChange={onInputChange}
          onSubmit={onSend}
          isLoading={isLoading}
          placeholder="What would you like to know?"
        />
      </div>
    </div>
  );
};

export default LandingView;
