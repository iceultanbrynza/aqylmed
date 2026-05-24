import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import type { Message } from "../types";
import { BOOK_FILTERS } from "../types";
import PromptInput from "./PromptInput";
import styles from "./ChatView.module.css";

interface ChatViewProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  selectedFilterId: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onFilterChange: (filterId: string) => void;
}

const ChatView = ({
  messages,
  input,
  isLoading,
  selectedFilterId,
  onInputChange,
  onSend,
  onFilterChange,
}: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? styles.messageUser
                : styles.messageAssistant
            }
          >
            <div
              className={
                message.role === "user"
                  ? styles.bubbleUser
                  : styles.bubbleAssistant
              }
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className={styles.messageAssistant}>
            <div className={styles.loadingBubble}>
              <Loader2 size={18} className={styles.spinner} />
              <span>Thinking…</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.footer}>
        <div className={styles.filterRow}>
          <label htmlFor="chat-book-filter" className={styles.filterLabel}>
            Source
          </label>
          <select
            id="chat-book-filter"
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

        <PromptInput
          value={input}
          onChange={onInputChange}
          onSubmit={onSend}
          isLoading={isLoading}
          placeholder="Ask a follow-up question…"
        />
      </div>
    </div>
  );
};

export default ChatView;
