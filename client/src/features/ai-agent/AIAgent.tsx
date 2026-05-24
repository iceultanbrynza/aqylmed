import styles from "./AIAgent.module.css";
import { useState } from "react";
import { Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@mantine/core";
import { fetchAIResponse, getApiErrorMessage } from "./services/ai-api-client";
import {
  BOOK_FILTERS,
  toApiFilters,
  type Message,
} from "./types";
import LandingView from "./components/LandingView";
import ChatView from "./components/ChatView";

const AIAgent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilterId, setSelectedFilterId] = useState(BOOK_FILTERS[0].id);

  const hasConversation = messages.length > 0 || isLoading;

  const selectedBook =
    BOOK_FILTERS.find((book) => book.id === selectedFilterId) ??
    BOOK_FILTERS[0];

  async function handleSendMessage() {
    const userText = input.trim();
    if (!userText || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsLoading(true);

    try {
      const data = await fetchAIResponse(
        userText,
        toApiFilters(selectedBook),
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: getApiErrorMessage(error),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewChat() {
    setMessages([]);
    setInput("");
    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <div className={styles.AIChatlogoContainer}>
          <div className={styles.AIChatlogo}>
            <Sparkles size={16} color="var(--med-green)" />
          </div>
          <h3 className={styles.AIAgentTitle}>AQYL AI</h3>
        </div>

        {hasConversation && (
          <Button
            className={styles.newChatButton}
            variant="transparent"
            color="var(--text-main)"
            size="xs"
            leftSection={<RefreshCcw size={16} />}
            onClick={handleNewChat}
          >
            New chat
          </Button>
        )}
      </header>

      <div className={styles.content}>
        {hasConversation ? (
          <ChatView
            messages={messages}
            input={input}
            isLoading={isLoading}
            selectedFilterId={selectedFilterId}
            onInputChange={setInput}
            onSend={handleSendMessage}
            onFilterChange={setSelectedFilterId}
          />
        ) : (
          <LandingView
            input={input}
            isLoading={isLoading}
            selectedFilterId={selectedFilterId}
            onInputChange={setInput}
            onSend={handleSendMessage}
            onFilterChange={setSelectedFilterId}
          />
        )}
      </div>
    </div>
  );
};

export default AIAgent;
