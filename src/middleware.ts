import { RouteEndpointEnum } from "./lib/enums/RouteEndpointEnum";

export { default } from "next-auth/middleware";
export const config = {
  matcher: [RouteEndpointEnum.QUIZ],
};
