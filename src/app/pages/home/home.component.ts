import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedLanguage: any = localStorage.getItem('selectedLanguage');

  constructor(
    private translate: TranslateService,
  ) {}

  onLanguageChange(){
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }
}
