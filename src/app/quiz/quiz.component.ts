import { Component, Output, EventEmitter } from '@angular/core';
import { Question } from '../interface/question';
import { Result } from '../interface/result';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  @Output() finalResult = new EventEmitter();

  public questions: Array<any>;
  public selected = {} as Question;
  public result = {} as Result;
  
  public index : number;
  public answer : string;

  constructor(){
    this.questions = [];
    this.reset();
  }

  showQuestion(index:number):void{
    this.selected = this.questions[index];
  }

  nextQuestion():void{
    if(this.answer == '')return;
    this.checkAnswer();
    this.index++;
    if(this.questions.length > this.index){
      this.answer = '';
      this.showQuestion(this.index);
    }else{
      this.finishQuiz();
    }
  }

  checkAnswer(){
    let isAnswer = this.questions[this.index].correct_answers[this.answer];
    (isAnswer === 'true') ? this.result.correct++ : this.result.wrong++;
  }

  finishQuiz(){
    this.result.total = this.questions.length;
    this.result.correctPercentage = (this.result.correct / this.result.total) * 100;
    this.result.wrongPercentage = (this.result.wrong / this.result.total) * 100;
    
    this.finalResult.emit(this.result);

  }

  reset() : void{
    this.answer = '';
    this.index = 0;
    this.result = {
      total : 0,
      correct : 0,
      wrong : 0,
      correctPercentage : 0,
      wrongPercentage : 0
    }
  }

}
