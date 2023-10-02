import { Component } from '@angular/core'
import { SearchService } from './shared/search.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poketotv';

  constructor(public SearchService: SearchService) {}
}