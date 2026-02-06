import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <Box display="flex" minH="100vh">
      <Sidebar />
      <Box as="main" ml="240px" flex={1} p={6} maxW="1200px">
        <Outlet />
      </Box>
    </Box>
  );
}
