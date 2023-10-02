import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-loadingbar',
  templateUrl: './loadingbar.component.html',
  styleUrls: ['./loadingbar.component.css']
})
export class LoadingbarComponent {
  @Input() percent: Number = 0
  @Input() label: String = 'Loading'
  @Input() color: String = 'loading-primary'
  @Input() type: String = 'line'
}
