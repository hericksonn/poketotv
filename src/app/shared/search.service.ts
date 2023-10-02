import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Subject } from 'rxjs'

import Search from './search.interface'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  endpoints: any = {
    start: 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
    info: 'https://pokeapi.co/api/v2/pokemon/[ID]/',
    sprite: '/assets/images/pokemon/[ID].png',
    pokemon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/[ID].png'
  }
  search: String = ''
  items: Search[] = []
  actual: Search[] = []
  loadingObserver: Subject<Boolean> = new Subject<Boolean>();
  loading: Boolean = true

  constructor(private httpClient: HttpClient) {
    this.loadingObserver.subscribe(value => {
        this.loading = value
    });
  }

  getAllPokemons(): Observable<any> { return this.httpClient.get(this.endpoints.start) }
  getPokemon(id: String | null): Observable<any> { return this.httpClient.get(this.endpoints.info.replace('[ID]',id)) }
  getItems() { return this.items }
  setItems(arr: Search[]) { this.items = arr }
  setActual(arr: Search[]) { this.actual = arr }
  getSearch() { return this.search }
  setLoading(load: Boolean) { this.loadingObserver.next(load) }
}