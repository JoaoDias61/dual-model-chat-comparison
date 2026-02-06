import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import type { FeedbackResponse, StarDisplayProps } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

function StarDisplay({ rating }: StarDisplayProps) {
  return (
    <HStack gap={0}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text
          key={star}
          color={star <= rating ? "yellow.400" : "gray.300"}
          fontSize="md"
        >
          ★
        </Text>
      ))}
    </HStack>
  );
}

export function Evaluations() {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/feedbacks`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load feedbacks");
        return res.json();
      })
      .then(setFeedbacks)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Heading mb={6}>Evaluations</Heading>

      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}

      {!loading && feedbacks.length === 0 && (
        <Text color="gray.500">No evaluations yet.</Text>
      )}

      <VStack gap={4} align="stretch">
        {feedbacks.map((fb) => (
          <Box
            key={fb.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg="gray.50"
          >
            <HStack justify="space-between" mb={2}>
              <Badge colorPalette="blue">{fb.model}</Badge>
              <HStack gap={3}>
                <StarDisplay rating={fb.rating} />
                <Text fontSize="xs" color="gray.500">
                  {new Date(fb.created_at).toLocaleString()}
                </Text>
              </HStack>
            </HStack>

            <Text fontWeight="bold" fontSize="sm" mb={1}>
              Question:
            </Text>
            <Box
              bg="white"
              p={2}
              borderRadius="md"
              mb={2}
              fontSize="sm"
              whiteSpace="pre-wrap"
            >
              {fb.question}
            </Box>

            <Text fontWeight="bold" fontSize="sm" mb={1}>
              Response:
            </Text>
            <Box
              bg="white"
              p={2}
              borderRadius="md"
              fontSize="sm"
              fontFamily="mono"
              whiteSpace="pre-wrap"
              maxH="200px"
              overflowY="auto"
            >
              {fb.response}
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
