import {RawQuiz, RawQuizDetails} from "../models/quiz-details/raw-quiz-details.model";
import {Answer, QuizDetail} from "../models/quiz-details/quiz-detail.model";
import {Builder} from "builder-pattern";

export class RawQuizDetailsMapper {
    public toQuizDetails(rawQuizDetails: RawQuizDetails): QuizDetail[] {
        let quizDetails: QuizDetail[] = [];
        rawQuizDetails.results?.map((rawQuizDetail: RawQuiz, index: number): void => {
            const quizDetail: QuizDetail = this.toQuizDetail(rawQuizDetail, index);
            quizDetails.push(quizDetail);
        });
        return quizDetails;
    }

    private toQuizDetail(rawQuizDetail: RawQuiz, index: number): QuizDetail {
        const answers: Answer[] = this.enrichAndCombineAnswers(rawQuizDetail);
        return Builder<QuizDetail>()
            .id(index)
            .question(rawQuizDetail.question)
            .answers(this.randomizeAnswersPosition(answers))
            .build();
    }

    private enrichAndCombineAnswers(rawQuizDetail: RawQuiz): Answer[] {
        const incorrectAnswers: Answer[] = rawQuizDetail.incorrect_answers.map((incorrect: string, index: number) => {
            return Builder<Answer>()
                .id(index)
                .answer(incorrect)
                .isCorrect(false)
                .build();
        });
        const correctAnswer: Answer = Builder<Answer>()
            .id(incorrectAnswers.length)
            .answer(rawQuizDetail.correct_answer!)
            .isCorrect(true)
            .build();
        return incorrectAnswers.concat(correctAnswer);
    }

    private randomizeAnswersPosition(answers: Answer[]): Answer[] {
        return answers.map((value: Answer) => ({value, sort: Math.random()}))
            .sort((current: { value: Answer, sort: number }, next:{ value: Answer, sort: number }) => current.sort - next.sort)
            .map(({value}) => value);
    }
}
