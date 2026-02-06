import { useState } from "react";
import { Box, Text, Heading, Spinner, Button, HStack } from "@chakra-ui/react";
import { StarRating } from "./StarRating";
import type { ResponseBoxProps } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export function ResponseBox({
  title,
  model,
  text,
  isLoading,
  error,
  question,
}: ResponseBoxProps) {
  const [rating, setRating] = useState<number>(0);
  const [saved, setSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const canSave = text && !isLoading && !error && rating > 0 && !saved;

  const handleSave = async (): Promise<void> => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, response: text, model, rating }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
    } catch {
      setSaved(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      flex="1"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      minH="200px"
      bg={error ? "red.50" : "gray.50"}
      display="flex"
      flexDirection="column"
    >
      <Heading size="sm" mb={2}>
        {title}
      </Heading>

      {isLoading && !text && <Spinner size="sm" />}

      {error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Box whiteSpace="pre-wrap" fontFamily="mono" fontSize="sm" flex="1">
          {text}
          {isLoading && text && (
            <Box
              as="span"
              display="inline-block"
              w="2px"
              h="1em"
              bg="blue.500"
              ml="1px"
            />
          )}
        </Box>
      )}

      {text && !isLoading && !error && (
        <Box mt={3} pt={3} borderTopWidth="1px">
          <Text fontSize="sm" mb={1}>
            Rate this response:
          </Text>
          <HStack justify="space-between">
            <StarRating rating={rating} onRate={setRating} disabled={saved} />
            <Button
              size="sm"
              colorPalette={saved ? "green" : "blue"}
              onClick={handleSave}
              disabled={!canSave}
              loading={saving}
            >
              {saved ? "Saved" : "Save"}
            </Button>
          </HStack>
        </Box>
      )}
    </Box>
  );
}
