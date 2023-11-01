import { useEffect, useState } from "react";
import { QuizActive, QuizResult } from "@/lib/types";

const INIT = {
  currentQuestion: 0,
  errorCount: 0,
  questionCount: 0,
  answerCount: 0,
};

export const useQuizLocalStorage = (
  userName: string | null,
  init: boolean = false
) => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [active, setActive] = useState<QuizActive | null>(null);

  useEffect(() => {
    if (userName) {
      try {
        const data = localStorage.getItem(userName);
        if (data) {
          const localInfo = JSON.parse(data);
          setActive(localInfo?.active ?? (init ? INIT : null));
          setResults(localInfo?.results ?? []);
        } else {
          setActive(init ? INIT : null);
          setLocalStorage({
            active: init ? INIT : null,
            results,
          });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [userName]);

  const setLocalStorage = (data: {
    active: QuizActive | null;
    results: QuizResult[];
  }) => {
    if (userName) {
      localStorage.setItem(userName, JSON.stringify(data));
    }
  };

  const handleActive = (active: QuizActive | null) => {
    setActive(active);
    setLocalStorage({ active, results });
  };

  const handleAddResult = (active: QuizActive) => {
    setResults((old) => {
      const results = [
        ...old,
        {
          date: new Date().toISOString(),
          ...active,
        },
      ];
      setLocalStorage({ active: null, results });
      return results;
    });
    setActive(null);
  };

  return {
    handleAddResult,
    handleActive,
    results,
    active,
    loading,
  };
};
