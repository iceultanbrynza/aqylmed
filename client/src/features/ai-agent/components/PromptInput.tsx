import { ArrowUp, Loader2 } from "lucide-react";
import styles from "./PromptInput.module.css";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
}

const PromptInput = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = "Ask a question…",
}: PromptInputProps) => {
  const canSubmit = value.trim().length > 0 && !isLoading;

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSubmit) onSubmit();
    }
  }

  return (
    <div className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={isLoading}
      />
      <button
        type="button"
        className={styles.sendButton}
        onClick={onSubmit}
        disabled={!canSubmit}
        aria-label="Send message"
      >
        {isLoading ? (
          <Loader2 size={18} className={styles.spinner} />
        ) : (
          <ArrowUp size={18} />
        )}
      </button>
    </div>
  );
};

export default PromptInput;
