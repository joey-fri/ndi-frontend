import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  label: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedLanguage: string;
  languages: Language[] = [
    { code: 'fr', label: 'Français' }, // French
    { code: 'en', label: 'English' },  // English
    { code: 'es', label: 'Español' },  // Spanish
    { code: 'de', label: 'Deutsch' },  // German
    { code: 'ru', label: 'Русский' },  // Russian
    { code: 'ar', label: 'العربية' },  // Arabic
    { code: 'zh', label: '中文' },      // Chinese
    { code: 'ja', label: '日本語' }     // Japanese
  ];

  constructor(private translate: TranslateService) {
    this.selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    this.removeQuestions();
  }

  onLanguageChange() {
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  private removeQuestions() {
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem(`Question_${i}`);
    }
  }
}
