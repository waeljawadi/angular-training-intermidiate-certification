import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizResultComponent} from "./components/quiz-result/quiz-result.component";
import {QuizMakerComponent} from "./components/quiz-maker/quiz-maker.component";

const routes: Routes = [
    {path: '', component: QuizMakerComponent},
    {path: 'result-overview', component: QuizResultComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
