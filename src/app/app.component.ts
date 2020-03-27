import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-project-front';

  public localStorageItem(key: string): string {
    return localStorage.getItem(key);
  }
}
