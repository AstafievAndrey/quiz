"use client";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { Authenticated, Unauthenticated } from "./components";

export const HomeContainer: FC = () => {
  const { status } = useSession();
  return (
    <>
      {status === "unauthenticated" && <Unauthenticated />}
      {status === "authenticated" && <Authenticated />}
    </>
  );
};
