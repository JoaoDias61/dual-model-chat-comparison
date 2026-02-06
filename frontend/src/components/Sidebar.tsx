import { Box, VStack, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavItem } from "../types";

const NAV_ITEMS: NavItem[] = [
  { label: "Chat", path: "/" },
  { label: "Evaluations", path: "/evaluations" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      as="nav"
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w="240px"
      bg="blue.800"
      color="white"
      p={4}
      display="flex"
      flexDirection="column"
    >
      <Text fontSize="lg" fontWeight="bold" mb={8} px={3}>
        RapidCanvas
      </Text>

      <VStack gap={1} align="stretch">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Box
              key={item.path}
              as="button"
              onClick={() => navigate(item.path)}
              px={3}
              py={2}
              borderRadius="md"
              bg={isActive ? "blue.600" : "transparent"}
              color={isActive ? "white" : "blue.100"}
              _hover={{ bg: isActive ? "blue.600" : "blue.700" }}
              textAlign="left"
              fontWeight={isActive ? "semibold" : "normal"}
              cursor="pointer"
              border="none"
              w="100%"
            >
              <Text fontSize="sm">{item.label}</Text>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
