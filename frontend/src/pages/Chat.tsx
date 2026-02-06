import { useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { ChatInput } from "../components/ChatInput";
import { ResponsePanel } from "../components/ResponsePanel";
import { useStreamChat } from "../hooks/useStreamChat";

export function Chat() {
  const gpt35 = useStreamChat();
  const gpt4o = useStreamChat();
  const [question, setQuestion] = useState<string>("");

  const handleSubmit = (prompt: string): void => {
    gpt35.abortStream();
    gpt4o.abortStream();

    setQuestion(prompt);
    gpt35.startStream(prompt, "gpt-3.5-turbo");
    gpt4o.startStream(prompt, "gpt-4o");
  };

  const isAnyLoading = gpt35.isLoading || gpt4o.isLoading;

  return (
    <Box>
      <Heading mb={6}>Dual Model Chat Comparison</Heading>
      <VStack gap={6}>
        <ChatInput onSubmit={handleSubmit} isDisabled={isAnyLoading} />
        <ResponsePanel gpt35={gpt35} gpt4o={gpt4o} question={question} />
      </VStack>
    </Box>
  );
}
