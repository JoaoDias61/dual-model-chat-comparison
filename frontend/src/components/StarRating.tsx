import { HStack, Box } from "@chakra-ui/react";
import type { StarRatingProps } from "../types";

export function StarRating({ rating, onRate, disabled }: StarRatingProps) {
  return (
    <HStack gap={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          as="button"
          onClick={() => !disabled && onRate(star)}
          fontSize="xl"
          cursor={disabled ? "default" : "pointer"}
          color={star <= rating ? "yellow.400" : "gray.300"}
          _hover={!disabled ? { color: "yellow.500" } : {}}
          bg="transparent"
          border="none"
          p={0}
        >
          ★
        </Box>
      ))}
    </HStack>
  );
}
