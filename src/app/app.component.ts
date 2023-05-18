import { Component, ViewChild } from '@angular/core';
import { QuizService } from './services/quiz.service';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public questionsLimit : number;
  public difficulty : string;

  public showMainMenu : boolean;
  public showQuizScreen : boolean;
  public showResultScreen : boolean;

  public spinner : boolean;

  @ViewChild('quiz',{static:true}) quiz! : QuizComponent;
  @ViewChild('result',{static:true}) result! : ResultComponent;

  constructor(private quizService:QuizService){
    this.questionsLimit = 10;
    this.difficulty = "Easy"
    this.showMainMenu = true;
  }

  quizQuestions(): void{
    this.toggleSpinner();
    this.quizService.getQuizQuestions(this.difficulty,this.questionsLimit)
    .subscribe((response)=>{
      this.quiz.questions = response;
      this.quiz.reset();
      this.quiz.showQuestion(0);
      this.showMainMenu = false;
      this.showQuizScreen = true;
      this.toggleSpinner();
    });
  }

  finalResult(result:any):void{
    this.result.finalResult = result;
    this.showQuizScreen = false;
    this.showResultScreen = true;
  }

  showMainMenuScreen(event:any):void{
    this.showResultScreen = false;
    this.showMainMenu = true;
  }

  toggleSpinner(){
    this.spinner = !this.spinner;
  }

}
