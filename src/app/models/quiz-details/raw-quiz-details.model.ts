export class RawQuizDetails {
  results: RawQuiz[];
}

export class RawQuiz {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

