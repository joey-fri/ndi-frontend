import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  selectedAnswer: string = '';

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    console.log(`Réponse sélectionnée : ${answer}`);
    // Vous pouvez ajouter d'autres actions ici, comme la mise à jour de l'interface utilisateur
  }
}
