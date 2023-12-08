import { Component } from '@angular/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})

export class EndComponent {
  getScore(){
    let score = 0;
    for(let i = 1; i <= 5; i++){
      let ourScore = parseInt(localStorage.getItem('Question_' + (i)) as string);
      for(let j = 0 ; j < 3 ; j++)
      {
        score += parseInt(localStorage.getItem('Question_' + i) || '0');
      }
    }
    return score;
  }

  removeQuestions() {
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem('Question_' + i);
    }
  }
}


