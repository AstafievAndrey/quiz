import { FC } from "react";
import { LoginContainer } from "@/containers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница авторизации",
};

const SignIn: FC = () => {
  return <LoginContainer />;
};

export default SignIn;
