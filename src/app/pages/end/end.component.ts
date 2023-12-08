import { Component } from '@angular/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})

export class EndComponent {
  score = 1;

  removeQuestions() {
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem('Question_' + i);
    }
  }
}


