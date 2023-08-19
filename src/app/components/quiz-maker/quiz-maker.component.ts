import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Categories} from "../../models/categories.model";
import {Category} from "../../models/category.model";
import {RawQuizDetails} from "../../models/quiz-details/raw-quiz-details.model";
import {QuizDetail} from "../../models/quiz-details/quiz-detail.model";
import {RawQuizDetailsMapper} from "../../mappers/raw-quiz-details.mapper";
import {PlayerAnswer} from "../../models/player-answer.model";
import {Builder} from "builder-pattern";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-quiz-maker',
    templateUrl: './quiz-maker.component.html',
    styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit, OnDestroy {

    public difficultyLevels: string[] = ["Easy", "Medium", "Hard"];
    public selectedCategoryId: string;
    public selectedDifficultyLevel: string;
    public quizDetails: QuizDetail[] = [];
    public categories: Category[] = [];
    public playerSelectedAnswers: PlayerAnswer[] = [];
    public subscriptionOne: Subscription;
    public subscriptionTwo: Subscription;
    public quizDetailsApiError: string;
    public categoryApiError: string;
    private rawQuizDetailsMapper: RawQuizDetailsMapper = new RawQuizDetailsMapper();

    constructor(private categoryService: CategoryService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getQuizDetails(): void {
        // When user generates a new Quiz then init vars
        this.playerSelectedAnswers = [];
        this.subscriptionOne = this.categoryService
            .getQuizDetailsByCategoryAndDifficulty(this.selectedCategoryId, this.selectedDifficultyLevel)
            .subscribe((response: RawQuizDetails): void => {
                this.quizDetails = this.rawQuizDetailsMapper.toQuizDetails(response);
            }, () => {
                this.quizDetailsApiError = "the Api for getting the Quiz is down please try later";
                console.warn("an error occurred please try later");
            });
    }

    playerChoiceDetails(questionId: number, answerId: number, isCorrect: boolean): void {
        // Check if a question was already answered
        const index: number = this.playerSelectedAnswers.findIndex((answer: PlayerAnswer): boolean => answer.questionId == questionId);
        const playerAnswer: PlayerAnswer = Builder<PlayerAnswer>()
            .answerId(answerId)
            .questionId(questionId)
            .isCorrect(isCorrect)
            .build();
        // If an already choice has been made then update it, else create new entry
        (index == -1) ? this.playerSelectedAnswers.push(playerAnswer) : this.playerSelectedAnswers[index].answerId = answerId;
        this.highlightSelectedChoice(questionId, answerId);
    }

    navigateToQuizResults(): void {
        // cache infos
        this.categoryService.playerSelectedAnswers = this.playerSelectedAnswers;
        this.categoryService.quizDetails = this.quizDetails;
        // navigate
        this.router.navigate(['/result-overview']);
    }

    private highlightSelectedChoice(questionId: number, answerId: number): void {
        let questionIdQuerySelector: string = '.question_' + questionId;
        let answerIdQuerySelector: string = '.answer_' + answerId;
        Array.from(document.querySelectorAll(questionIdQuerySelector)).forEach((querySelector: Element) => querySelector.classList.remove("green"));
        document.querySelector(questionIdQuerySelector + answerIdQuerySelector)?.classList.add("green");
    }

    private getCategories(): void {
        this.subscriptionTwo = this.categoryService
            .getTriviaCategories()
            .subscribe((response: Categories) => {
                this.categories = response.trivia_categories
            }, () => {
                this.categoryApiError = "the Api for getting the categories is down please try later";
                console.warn("an error occurred please try later");
            });
    }

    ngOnDestroy() {
        this.subscriptionOne.unsubscribe();
        this.subscriptionTwo.unsubscribe();
    }
}
