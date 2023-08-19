import {AfterViewInit, Component} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {PlayerAnswer} from "../../models/player-answer.model";
import {QuizDetail} from "../../models/quiz-details/quiz-detail.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-quiz-result',
    templateUrl: './quiz-result.component.html',
    styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements AfterViewInit {

    public playerSelectedAnswers: PlayerAnswer[];
    public quizDetails: QuizDetail[];
    public finalScore: number;
    public scoreColor: string;

    constructor(private readonly categoryService: CategoryService,
                private router: Router) {
        // when refresh result overview navigate to home page
        if (this.categoryService.playerSelectedAnswers == undefined || this.categoryService.quizDetails == undefined) {
            this.navigateToQuizMakerPage();
        }
        this.playerSelectedAnswers = this.categoryService.playerSelectedAnswers;
        this.quizDetails = this.categoryService.quizDetails;
        this.getFinalScore();
        this.getScoreColor();
    }

    ngAfterViewInit(): void {
        this.highlightWrongChosenAnswers();
    }

    private highlightWrongChosenAnswers(): void {
        this.playerSelectedAnswers.map((selectedAnswer: PlayerAnswer): void => {
            let questionIdClass: string = '.question_' + selectedAnswer.questionId;
            let AnswerIdClass: string = '.answer_' + selectedAnswer.answerId;
            (selectedAnswer.isCorrect)
                ? document.querySelector(questionIdClass + AnswerIdClass).classList.add("green")
                : document.querySelector(questionIdClass + AnswerIdClass).classList.add("red");
        })
    }

    navigateToQuizMakerPage(): void {
        this.router.navigate(['/']);
    };

    private getFinalScore(): void {
        this.finalScore = this.playerSelectedAnswers.filter((answer: PlayerAnswer) => answer.isCorrect).length
    };

    private getScoreColor(): void {
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
