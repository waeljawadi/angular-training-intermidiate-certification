import {Answer, QuizDetail} from "../models/quiz-details/quiz-detail.model";

export class SpecialCharsUtils {

    static fixSpecialChars(quizDetails: QuizDetail[]): void {
        quizDetails.map((quizDetail: QuizDetail): void => {
            quizDetail.question = this.decodeHtmlEntities(quizDetail.question);
            quizDetail.answers.map((answer: Answer): void => {
                answer.answer = this.decodeHtmlEntities(answer.answer);
            })
        });
    }

    static decodeHtmlEntities(text: string): string {
        let textarea = document.createElement("textarea");
        textarea.innerHTML = text;
        return textarea.value;
    }

}
