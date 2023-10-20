import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

const NotFound: FC = () => {
  return <>страница не найдена</>;
};

export default NotFound;
