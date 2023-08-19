import {AfterViewInit, Component} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {PlayerAnswerModel} from "../../models/player-answer.model";
import {QuizDetail} from "../../models/quiz-details/quiz-detail.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-quiz-result',
    templateUrl: './quiz-result.component.html',
    styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements AfterViewInit {

    public playerSelectedAnswers: PlayerAnswerModel[];
    public quizDetails: QuizDetail[];
    public finalScore: number;
    public scoreColor: string;

    constructor(private readonly categoryService: CategoryService,
                private router: Router) {
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
                ? document.querySelector(questionIdClass + AnswerIdClass).classList.add("green")
                : document.querySelector(questionIdClass + AnswerIdClass).classList.add("red");
        })
    }

    navigateToQuizMakerPage = () => this.router.navigate(['/']);

    private getFinalScore = () => this.finalScore = this.playerSelectedAnswers.filter(answer => answer.isCorrect).length;

    private getScoreColor() {
        switch (this.finalScore) {
            case 0:
            case 1:
                this.scoreColor = "red";
                break;
            case 2:
            case 3:
                this.scoreColor = "yellow";
                break;
            case 4:
            case 5:
                this.scoreColor = "green";
                break;
        }
    }



}
