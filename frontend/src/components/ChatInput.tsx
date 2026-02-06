import { Box, Textarea, Button } from "@chakra-ui/react";
import { useState, type KeyboardEvent } from "react";
import type { ChatInputProps } from "../types";

export function ChatInput({ onSubmit, isDisabled }: ChatInputProps) {
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = (): void => {
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box w="100%">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your prompt here..."
        rows={4}
        resize="vertical"
        mb={3}
      />
      <Button
        colorPalette="blue"
        onClick={handleSubmit}
        disabled={isDisabled || !prompt.trim()}
        loading={isDisabled}
        loadingText="Streaming..."
        w="100%"
      >
        Send to Both Models
      </Button>
    </Box>
  );
}
