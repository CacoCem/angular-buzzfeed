import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizzes.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  title:string = ""
  quizSelected:any
  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  isFinished:boolean = false

  resultClass:string = "";



  ngOnInit(): void {
    if(quizz_questions){
      this.quizSelected = quizz_questions.quizzes[0]
      this.isFinished = false
      this.title = this.quizSelected.title
      this.questions = this.quizSelected.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length
      
      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
      
    }
  }

  playerChoice(value:string){
    this.answers.push(value)
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex+=1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.isFinished = true;
      this.answerSelected = this.quizSelected.results[finalAnswer as keyof typeof this.quizSelected.results]
      this.setResultClass(finalAnswer);
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length > 
        arr.filter(item => item === current).length
      ){
        return previous        
      }else{
        return current
      }
    })
    console.log(result)
    return result
  }

  setResultClass(result: string) {
    switch (result) {
      case 'G':
        this.resultClass = 'result-g';
        break;
      case 'R':
        this.resultClass = 'result-r';
        break;
      case 'S':
        this.resultClass = 'result-s';
        break;
      case 'H':
        this.resultClass = 'result-h';
        break;
      case 'A':
        this.resultClass = 'result-imperio';
        break;
      case 'B':
        this.resultClass = 'result-rebelde'
        break;
      case 'X':
        this.resultClass = 'result-heroi'
        break;
      default:
        this.resultClass = '';
        break;
    }
  }

  trocarQuiz(i:number){
    this.isFinished = false
    this.quizSelected = quizz_questions.quizzes[i]
    this.title = this.quizSelected.title

    this.questionIndex = 0

    this.questions = this.quizSelected.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionMaxIndex = this.questions.length
  }

  fazerNovamente() {
    this.isFinished = false
    this.title = this.quizSelected.title
    this.questionIndex = 0
    this.questions = this.quizSelected.questions
    this.questionSelected = this.questions[this.questionIndex]
    this.questionMaxIndex = this.questions.length
    this.answers = [];
    this.answerSelected = "";
  }
}