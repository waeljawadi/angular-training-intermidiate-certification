import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categories} from "../models/categories.model";
import {RawQuizDetails} from "../models/quiz-details/raw-quiz-details.model";
import {PlayerAnswerModel} from "../models/player-answer.model";
import {QuizDetail} from "../models/quiz-details/quiz-detail.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private httpClient: HttpClient) {
    }

    private OPEN_DB_URL = "https://opentdb.com";
    private CATEGORIES_API_URL = "api_category.php";
    public playerSelectedAnswers: PlayerAnswerModel[];
    public quizDetails: QuizDetail[];

    getTriviaCategories(): Observable<Categories> {
        return this.httpClient.get<Categories>(this.OPEN_DB_URL + "/" + this.CATEGORIES_API_URL);
    }

    getQuizDetailsByCategoryAndDifficulty(categoryId: string, difficultyLevel: string): Observable<RawQuizDetails> {
        const api = this.quizDetailsApiComposer(categoryId, difficultyLevel);
        return this.httpClient.get<RawQuizDetails>(api);
    }

    private quizDetailsApiComposer(categoryId: string, difficultyLevel: string): string {
        const prefix: string = "/api.php?";
        const amount: string = "amount=5";
        const category: string = "&category=" + categoryId;
        const difficulty: string = "&difficulty=" + difficultyLevel?.toLowerCase();
        const type: string = "&type=multiple";
        return this.OPEN_DB_URL + prefix + amount + category + difficulty + type;
    }

}
