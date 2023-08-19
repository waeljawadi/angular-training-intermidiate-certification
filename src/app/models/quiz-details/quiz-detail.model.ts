export class QuizDetail {
    id: number;
    question: string;
    answers: Answer[];
}

export class Answer {
    id: number;
    answer: string;
    isCorrect: boolean;
}
