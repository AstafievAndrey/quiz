import { FC } from "react";
import { Metadata } from "next";
import { HomeContainer } from "@/containers";

export const metadata: Metadata = {
  title: "Главная",
};

const Home: FC = async () => {
  return <HomeContainer />;
};

export default Home;
