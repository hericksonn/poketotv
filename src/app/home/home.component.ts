import { Component } from '@angular/core'
import { SearchService } from '../shared/search.service'
import Search from '../shared/search.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  value: string = ''
  curtain: Boolean = false
  private timer: any;

  constructor(public SearchService: SearchService, private router: Router) {
    if(!this.SearchService.getItems().length) {
      this.SearchService.getAllPokemons().subscribe(pokemons => {
        for(let pokemon of pokemons.results) {
          let split_url = pokemon.url.split('/');
          pokemon.id = split_url[ split_url.length -2 ];
        }
  
        this.SearchService.setItems(pokemons?.results || []);
        this.SearchService.setActual(pokemons?.results || []);
      });

      // Timeout só para mostrar o loading chique
      setTimeout(() => { this.SearchService.setLoading(false); },2500);
    } else {
      this.SearchService.setLoading(false);
    }
  }

  choosePokemon(item: Search) {
    this.curtain = true
    setTimeout(() => this.router.navigate(['detail/'+item.id]),451)
  }

  changeOutput() {    
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      let output: string = this.SearchService.getSearch()
        .toLowerCase()
        .replace(new RegExp(' ', 'g'), '-')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
      
      if(output.length) {
        let items: Search[] = this.SearchService.getItems().filter(x => x.name.indexOf(output)>-1)
        this.SearchService.setActual(items)
      } else {
        this.SearchService.setActual( this.SearchService.getItems() )
      }
    }, 500)

  }

  trackItem(index: number, item: Search) { return item.id }

  setTitleSize(name: string): string {
    if(name.length > 16) { return 'smaller' }
    if(name.length > 8) { return 'small' }
    return ''
  }
}
