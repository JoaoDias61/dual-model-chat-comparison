import { useState, useRef, useCallback } from "react";
import type { UseStreamChatReturn } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export function useStreamChat(): UseStreamChatReturn {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const abortStream = useCallback((): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const startStream = useCallback(
    async (prompt: string, model: string): Promise<void> => {
      setText("");
      setError(null);
      setIsLoading(true);

      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, model }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const err = await response
            .json()
            .catch(() => ({ detail: "Request failed" }));
          throw new Error(err.detail || `HTTP ${response.status}`);
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);

              if (data === "[DONE]") {
                break;
              }

              if (data.startsWith("[ERROR]")) {
                throw new Error(data.slice(8));
              }

              setText((prev) => prev + data);
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    []
  );

  return { text, isLoading, error, startStream, abortStream };
}
