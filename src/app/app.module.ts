import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizMakerComponent,
    QuizResultComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
