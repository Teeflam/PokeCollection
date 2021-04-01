import { Component, Input, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent{
  @Input() pokemonList = [] as string[];

  pokeGen: any[] = [];

  condInd: number = 0;

  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.doSomething(changes['pokemonList'].currentValue.length);
  }
  ngOnInit(): void {
    this.pokeGen = this.dataService.sortPokemonByGene(this.pokemonList);
  }

  tabChange(index: number) {
    this.condInd = index;
  }
  doSomething(length: number) {
    this.pokeGen = this.dataService.sortPokemonByGene(this.pokemonList);
  }
}
