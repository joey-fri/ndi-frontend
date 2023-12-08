import { Component, OnInit } from '@angular/core';
import { NdiBackendService } from 'src/app/services/ndi-backend/ndi-backend.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})

export class EndComponent implements OnInit {
  questions: any[] = [];
  score : number = 0;
  constructor(private ndiBackendService: NdiBackendService,
    private translate: TranslateService, private router: Router) { }

    selectedLanguage: string = localStorage.getItem('selectedLanguage') || 'FR';

  async ngOnInit() {
    this.ndiBackendService.getQuestions(this.selectedLanguage).subscribe((data) => {
      this.questions = data;
      this.getScore();
    });

  }

  getScore(){
    let res = 0;
    for(let i = 1; i <= 5; i++){
      let nb_inf = 0
      let ourScore = parseInt(localStorage.getItem('Question_' + (i)) as string);
      console.log(this.questions);

      for(let j = 1 ; j <= 3 ; j++)
      {
        const score = this.questions[i]['Score_' + (j)];
        if (score > ourScore)
          nb_inf++;
      }
      if (nb_inf == 1){
        res = res + 1;
      }
      if (nb_inf == 0){
        res = res + 2;
      }
    }
    console.log(res);
    this.score = res;
  }

  removeQuestions() {
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem('Question_' + i);
    }
  }
}


