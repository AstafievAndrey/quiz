import { FC } from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "Главная",
};

const Home: FC = async () => {
  const session = await getServerSession(authOptions);

  return <>Home</>;
};

export default Home;
