import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
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
