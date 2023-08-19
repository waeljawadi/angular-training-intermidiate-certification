import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizResultComponent} from "./components/quiz-result/quiz-result.component";
import {QuizMakerComponent} from "./components/quiz-maker/quiz-maker.component";

const routes: Routes = [
    {path: 'result-overview', component: QuizResultComponent},
    {path: '', component: QuizMakerComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
