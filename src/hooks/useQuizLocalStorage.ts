import { QuizActive } from "@/lib/types/QuizActive";
import { QuizResult } from "@/lib/types/QuizResult";
import { useEffect, useState } from "react";

export const useQuizLocalStorage = (userName: string | null) => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [active, setActive] = useState<QuizActive | null>(null);

  useEffect(() => {
    if (userName) {
      try {
        const data = localStorage.getItem(userName);
        if (data) {
          const localInfo = JSON.parse(data);
          setActive(localInfo?.active ?? null);
          setResults(localInfo?.results ?? []);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [userName]);

  const handleActive = (active: QuizActive | null) => {
    setActive(active);
    userName &&
      localStorage.setItem(
        userName,
        JSON.stringify({
          active,
          results,
        })
      );
  };

  return {
    handleActive,
    results,
    active,
    loading,
  };
};
