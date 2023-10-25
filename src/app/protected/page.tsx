import { FC } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protected",
};

const Home: FC = async () => {
  return <>Protected</>;
};

export default Home;
