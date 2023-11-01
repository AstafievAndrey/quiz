export enum RouteEndpointEnum {
  MAIN = "/",
  LOGIN = "/api/auth/signin",
  LOGOUT = "/api/auth/signout",
  QUIZ = "/quiz",
}

export const RouteEndpoint: Record<RouteEndpointEnum, string> = {
  [RouteEndpointEnum.MAIN]: "Главная",
  [RouteEndpointEnum.LOGIN]: "Войти",
  [RouteEndpointEnum.LOGOUT]: "Выйти",
  [RouteEndpointEnum.QUIZ]: "Страница тестирования",
};
