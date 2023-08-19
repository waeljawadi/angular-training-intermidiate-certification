import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Categories} from "../../models/categories.model";
import {Category} from "../../models/category.model";
import {RawQuizDetails} from "../../models/quiz-details/raw-quiz-details.model";
import {QuizDetail} from "../../models/quiz-details/quiz-detail.model";
import {RawQuizDetailsMapper} from "../../mappers/raw-quiz-details.mapper";
import {PlayerAnswerModel} from "../../models/player-answer.model";
import {Builder} from "builder-pattern";
import {Router} from "@angular/router";

@Component({
    selector: 'app-quiz-maker',
    templateUrl: './quiz-maker.component.html',
    styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit {

    public difficultyLevels: string[] = ["Easy", "Medium", "Hard"];
    public selectedCategoryId: string;
    public selectedDifficultyLevel: string;
    public quizDetails: QuizDetail[] = [];
    public categories: Category[] = [];
    public playerSelectedAnswers: PlayerAnswerModel[] = [];

    private rawQuizDetailsMapper: RawQuizDetailsMapper = new RawQuizDetailsMapper();

    constructor(private categoryService: CategoryService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getQuizDetails(): void {
        this.categoryService
            .getQuizDetailsByCategoryAndDifficulty(this.selectedCategoryId, this.selectedDifficultyLevel)
            .subscribe((response: RawQuizDetails) => {
                this.quizDetails = this.rawQuizDetailsMapper.toQuizDetails(response);
            });
    }

    isGenerateQuizButtonEnabled = (): boolean => !!(this.selectedCategoryId && this.selectedDifficultyLevel);

    playerChoiceDetails(questionId: number, answerId: number, isCorrect: boolean) {
        // Check if a question was already answered
        const index = this.playerSelectedAnswers.findIndex(answer => answer.questionId == questionId);
        const playerAnswer = Builder<PlayerAnswerModel>()
            .answerId(answerId)
            .questionId(questionId)
            .isCorrect(isCorrect)
            .build();
        // If an already choice has been made then update it, else create new entry
        (index == -1) ? this.playerSelectedAnswers.push(playerAnswer) : this.playerSelectedAnswers[index].answerId = answerId;
        this.highlightSelectedChoice(questionId, answerId);
    }

    navigateToQuizResults() {
        // cache infos
        this.categoryService.playerSelectedAnswers = this.playerSelectedAnswers;
        this.categoryService.quizDetails = this.quizDetails;
        // navigate
        this.router.navigate(['/result-overview']);
    }

    private highlightSelectedChoice(questionId: number, answerId: number) {
        let questionIdQuerySelector = '.question_' + questionId;
        let answerIdQuerySelector = '.answer_' + answerId;
        Array.from(document.querySelectorAll(questionIdQuerySelector)).forEach((querySelector) => querySelector.classList.remove("green"));
        document.querySelector(questionIdQuerySelector + answerIdQuerySelector)?.classList.add("green");
    }

    private getCategories(): void {
        this.categoryService
            .getTriviaCategories()
            .subscribe((response: Categories) => this.categories = response.trivia_categories);
    }
}
