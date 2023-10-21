import { QuizActive } from "@/lib/types/QuizActive";
import { QuizResult } from "@/lib/types/QuizResult";
import { makeAutoObservable } from "mobx";
import { Session } from "next-auth";

class Quiz {
  private results: QuizResult[] = [];
  private active: QuizActive | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  init(user: Session["user"]) {
    const data = localStorage.getItem(user.userName);
  }

  getResults() {
    return this.results;
  }

  getActive() {
    return this.active;
  }
}

const quizStore = new Quiz();

export default quizStore;
