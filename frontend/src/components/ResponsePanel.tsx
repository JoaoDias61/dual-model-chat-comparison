import { HStack } from "@chakra-ui/react";
import { ResponseBox } from "./ResponseBox";
import type { ResponsePanelProps } from "../types";

export function ResponsePanel({ gpt35, gpt4o, question }: ResponsePanelProps) {
  return (
    <HStack gap={4} align="stretch" w="100%">
      <ResponseBox
        title="GPT-3.5 Turbo"
        model="gpt-3.5-turbo"
        text={gpt35.text}
        isLoading={gpt35.isLoading}
        error={gpt35.error}
        question={question}
      />
      <ResponseBox
        title="GPT-4o"
        model="gpt-4o"
        text={gpt4o.text}
        isLoading={gpt4o.isLoading}
        error={gpt4o.error}
        question={question}
      />
    </HStack>
  );
}
