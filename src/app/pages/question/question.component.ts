import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NdiBackendService } from 'src/app/services/ndi-backend/ndi-backend.service';
import {GraphComponent} from "../../components/graph/graph.component";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @ViewChild(GraphComponent) graph: GraphComponent | undefined;

  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswer: number | null = null;
  isAnyAnswerSelected: boolean = false;
  end: string = this.translate.instant(`QUESTION.END`);
  next: string = this.translate.instant(`QUESTION.NEXT`);
  selectedLanguage: string = localStorage.getItem('selectedLanguage') || 'FR';

  constructor(private ndiBackendService: NdiBackendService,
    private translate: TranslateService, private router: Router) { }

  async ngOnInit() {
    await this.ndiBackendService.getQuestions(this.selectedLanguage).subscribe((data) => {
      this.questions = data;
    });

  }

  selectAnswer(index: number) {
    // Vérifier si une réponse a déjà été sélectionnée
    if (this.isAnyAnswerSelected) {
      return; // Ne rien faire si une réponse a déjà été sélectionnée
    }

    this.selectedAnswer = index;
    this.isAnyAnswerSelected = true;
    const score = this.questions[this.currentQuestionIndex]['Score_' + (index + 1)];
    localStorage.setItem('Question_' + (this.currentQuestionIndex + 1), score.toString());
    this.graph?.handleUpdate();
    console.log(`Réponse sélectionnée : ${this.questions[this.currentQuestionIndex]['Answer_' + (index + 1)]}`);
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      // Passage à la question suivante
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.isAnyAnswerSelected = false;
    } else {
      // Redirection vers '/end' car c'est la dernière question
      this.router.navigate(['/end']);
    }
  }
}
