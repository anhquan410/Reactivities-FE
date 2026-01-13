import { Group } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "@/shared/components/MenuItemLink";
import { useAccount } from "@/libs/hooks/useAccount";
import UserMenu from "./UserMenu";
import CircularProgress from "@mui/material/CircularProgress";
import { useIsFetching } from "@tanstack/react-query";

export default function NavBar() {
  const { user } = useAccount();

  const isFetching = useIsFetching();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: "flex", gap: 2 }}
              >
                <Group fontSize="large" />
                <Typography
                  sx={{ position: "relative" }}
                  variant="h4"
                  fontWeight="bold"
                >
                  Reactivities
                </Typography>
                {isFetching > 0 && (
                  <CircularProgress
                    size={20}
                    thickness={7}
                    sx={{
                      color: "white",
                      position: "absolute",
                      top: "30%",
                      left: "105%",
                    }}
                  />
                )}
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex" }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
              <MenuItemLink to="/createActivity">Create Activity</MenuItemLink>
            </Box>
            <Box display="flex" alignContent="center">
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <MenuItemLink to="/login">Login</MenuItemLink>
                  <MenuItemLink to="/register">Register</MenuItemLink>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
