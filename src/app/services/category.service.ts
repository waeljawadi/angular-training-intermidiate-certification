import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categories} from "../models/categories.model";
import {RawQuizDetails} from "../models/quiz-details/raw-quiz-details.model";
import {PlayerAnswer} from "../models/player-answer.model";
import {QuizDetail} from "../models/quiz-details/quiz-detail.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private httpClient: HttpClient) {
    }

    private OPEN_DB_URL: string = "https://opentdb.com";
    private CATEGORIES_API_URL: string = "api_category.php";
    public playerSelectedAnswers: PlayerAnswer[];
    public quizDetails: QuizDetail[];

    getTriviaCategories(): Observable<Categories> {
        return this.httpClient.get<Categories>(this.OPEN_DB_URL + "/" + this.CATEGORIES_API_URL);
    }

    getQuizDetailsByCategoryAndDifficulty(categoryId: string, difficultyLevel: string): Observable<RawQuizDetails> {
        const api: string = this.quizApiCreator(categoryId, difficultyLevel);
        return this.httpClient.get<RawQuizDetails>(api);
    }

    private quizApiCreator(categoryId: string, difficultyLevel: string): string {
        const category: string = "&category=" + categoryId;
        const difficulty: string = "&difficulty=" + difficultyLevel.toLowerCase();
        return this.OPEN_DB_URL + "/api.php?" + "amount=5" + category + difficulty + "&type=multiple";
    }
}
