import { FC } from "react";
import Link from "next/link";
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

import { RouteEndpoint, RouteEndpointEnum } from "@/lib/enums";
import { User } from "@/lib/types";

import { styleLogoText } from "./styled";

interface Props {
  user: User | null;
}
export const AppBar: FC<Props> = ({ user }) => {
  return (
    <>
      <MuiAppBar>
        <Container>
          <Toolbar disableGutters>
            <Link href={RouteEndpointEnum.MAIN}>
              <AdbIcon sx={{ mr: 1, cursor: "pointer" }} />
            </Link>
            <Link href={RouteEndpointEnum.MAIN}>
              <Typography style={styleLogoText} variant="h6" noWrap>
                LOGO
              </Typography>
            </Link>
            <Typography flexGrow={1} align="right" sx={{ mr: 1 }}>
              {user?.name}
            </Typography>
            {user === null ? (
              <Link href={RouteEndpointEnum.LOGIN}>
                <Button color="inherit">
                  {RouteEndpoint[RouteEndpointEnum.LOGIN]}
                </Button>
              </Link>
            ) : (
              <Link href={RouteEndpointEnum.LOGOUT}>
                <IconButton color="inherit">
                  <LogoutIcon />
                </IconButton>
              </Link>
            )}
          </Toolbar>
        </Container>
      </MuiAppBar>
      <Toolbar />
    </>
  );
};
