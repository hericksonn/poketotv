import { Component } from '@angular/core'
import { SearchService } from '../shared/search.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  id: String | null = null
  image: String = ''
  info: any = {
    name: 'name',
    types: [
      { slot: 0, type: {name: '-'} },
      { slot: 0, type: {name: '-'} },
      { slot: 0, type: {name: '-'} },
    ],
    stats: [
      {base_stat: 10, stat: {name: 'a'}},
      {base_stat: 20, stat: {name: 'b'}},
      {base_stat: 30, stat: {name: 'c'}},
      {base_stat: 40, stat: {name: 'd'}},
      {base_stat: 50, stat: {name: 'e'}},
      {base_stat: 60, stat: {name: 'f'}}
    ]
  }

  constructor(public SearchService: SearchService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.image = this.SearchService.endpoints.pokemon.replace('[ID]',this.id);

    this.SearchService.getPokemon(this.id).subscribe(pokemon => {
      this.info = pokemon
      this.SearchService.setLoading(false)
    })
  }

  back() {
    this.SearchService.setLoading(true)
    setTimeout(() => this.router.navigate(['']),100)
  }
}