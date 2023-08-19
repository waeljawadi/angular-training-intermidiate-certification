import {Answer, QuizDetail} from "../models/quiz-details/quiz-detail.model";

export class SpecialCharsUtils {

    static fixSpecialChars(quizDetails: QuizDetail[]): void {
        quizDetails.map((quizDetail: QuizDetail): void => {
            quizDetail.question = this.replaceAllOccurrencesInString(quizDetail.question);
            quizDetail.answers.map((answer: Answer): void => {
                answer.answer = this.replaceAllOccurrencesInString(answer.answer);
            })
        });
    }

    static replaceAllOccurrencesInString(stringToFormat: string): string {
        return stringToFormat
            .replaceAll("&amp;", "&")
            .replaceAll("&quot;", '"')
            .replaceAll("&#039;", "'")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">");
    }

}
