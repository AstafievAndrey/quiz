export enum RouteEndpointEnum {
  MAIN = "/",
  LOGIN = "/login",
  QUIZ = "/quiz",
}

export const RouteEndpoint: Record<RouteEndpointEnum, string> = {
  [RouteEndpointEnum.MAIN]: "Главная",
  [RouteEndpointEnum.LOGIN]: "Логин",
  [RouteEndpointEnum.QUIZ]: "Страница тестирования",
};
