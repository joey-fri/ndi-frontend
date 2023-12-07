import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ndi-frontend';
  selectedLanguage: any = localStorage.getItem('selectedLanguage');
  defaultLanguage = 'en';

  constructor(
    private translate: TranslateService
  ) {
    this.setLanguage();
  }

  setLanguage() {
    if (this.selectedLanguage) {
      this.translate.use(this.selectedLanguage);
    } else {
      this.translate.use(this.defaultLanguage);
      localStorage.setItem('selectedLanguage', this.defaultLanguage);
    }
  }


}
