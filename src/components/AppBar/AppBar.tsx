"use client";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import AdbIcon from "@mui/icons-material/Adb";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  IconButton,
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import { StyledLogoText } from "./styled";

const DISPLAY = { xs: "none", md: "flex" };
export const AppBar: FC = () => {
  const { data, status } = useSession();
  const { push } = useRouter();

  const logout = () => {
    signOut();
  };

  const login = () => {
    push("/login");
  };

  const handleLink = () => {
    push("/");
  };

  return (
    <>
      <MuiAppBar>
        <Container>
          <Toolbar disableGutters>
            <AdbIcon onClick={handleLink} sx={{ mr: 1, cursor: "pointer" }} />
            <StyledLogoText onClick={handleLink} variant="h6" noWrap>
              LOGO
            </StyledLogoText>
            <Typography flexGrow={1} align="right" sx={{ mr: 1 }}>
              {data?.user?.userName}
            </Typography>
            {status === "authenticated" && (
              <IconButton color="inherit" onClick={logout}>
                <LogoutIcon />
              </IconButton>
            )}
            {status === "unauthenticated" && (
              <Button onClick={login} color="inherit">
                Войти
              </Button>
            )}
          </Toolbar>
        </Container>
      </MuiAppBar>
      <Toolbar />
    </>
  );
};
