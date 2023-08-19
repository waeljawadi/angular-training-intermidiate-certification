import {AfterViewInit, Component} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {PlayerAnswerModel} from "../../models/player-answer.model";
import {QuizDetail} from "../../models/quiz-details/quiz-detail.model";

@Component({
    selector: 'app-quiz-result',
    templateUrl: './quiz-result.component.html',
    styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements AfterViewInit {

    public playerSelectedAnswers!: PlayerAnswerModel[];
    public quizDetails: QuizDetail[];
    public finalScore: number;
    public scoreColor: string;

    constructor(private readonly categoryService: CategoryService) {
        this.playerSelectedAnswers = this.categoryService.playerSelectedAnswers;
        this.quizDetails = this.categoryService.quizDetails;
       // console.log('this.playerSelectedAnswers', this.playerSelectedAnswers);
      //  console.log('this.quizDetails', this.quizDetails);
        this.getFinalScore();
        this.getScoreColor();
    }

    ngAfterViewInit(): void {
        this.highlightWrongChosenAnswers();
    }

    private highlightWrongChosenAnswers() {
        this.playerSelectedAnswers.map(selectedAnswer => {
            let questionIdClass = '.question_' + selectedAnswer.questionId;
            let AnswerIdClass = '.answer_' + selectedAnswer.answerId;
            (selectedAnswer.isCorrect)
                ? document.querySelector(questionIdClass + AnswerIdClass)?.classList.add("green")
                : document.querySelector(questionIdClass + AnswerIdClass)?.classList.add("red");
        })
    }

    private getFinalScore = () => this.finalScore = this.playerSelectedAnswers.filter(answer => answer.isCorrect).length;

    private getScoreColor() {
        if (this.finalScore < 2) {
            this.scoreColor = "red";
        } else if (this.finalScore >= 2 && this.finalScore <= 3) {
            this.scoreColor = "yellow";
        } else {
            this.scoreColor = "green";
        }
    }

}
