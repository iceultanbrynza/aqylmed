import axios from "axios";
import type { ApiFilter } from "../types";

const API_BASE = "/api/ai-agent";

export async function fetchAIResponse(query: string, filters: ApiFilter[]) {
  const response = await axios.post(
    `${API_BASE}/api/v1/agent`,
    { query, filters },
  );

  return response.data as { response: string };
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Unable to reach the AI service. Check your connection and try again.";
    }

    const detail = error.response.data?.detail;

    if (typeof detail === "string") {
      return sanitizeServerMessage(detail);
    }

    if (Array.isArray(detail)) {
      return "The request could not be processed. Please try again.";
    }

    if (error.response.status === 403) {
      return "Access denied. Please contact support.";
    }

    if (error.response.status === 404) {
      return "The AI service is unavailable right now.";
    }

    if (error.response.status >= 500) {
      return "The AI service encountered an error. Please try again later.";
    }

    return "Something went wrong. Please try again.";
  }

  return "Something went wrong. Please try again.";
}

function sanitizeServerMessage(message: string): string {
  if (/api.?key|secret|token|unauthorized|forbidden/i.test(message)) {
    return "Access denied. Please contact support.";
  }

  return message;
}
