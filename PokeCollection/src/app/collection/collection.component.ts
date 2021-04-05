import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import Poke from '../models/Poke';
import { DataService } from '../services/Data/data.service';

@Component({
	selector: 'app-collection',
	templateUrl: './collection.component.html',
	styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
	// declare attribut
	@Input() pokemonList = [] as string[];
	pokeGen: Poke[][] = [];
	condInd: number = 0;

	constructor(private dataService: DataService) {}

	ngOnChanges(changes: SimpleChanges) {
		this.getSortedPokemon(changes['pokemonList'].currentValue.length);
	}

	ngOnInit(): void {
		this.pokeGen = this.dataService.sortPokemonByGene(this.pokemonList);
	}

	tabChange(index: number): void {
		this.condInd = index;
	}

	// get list of pokemon sorted
	getSortedPokemon(length: number): void {
		this.pokeGen = this.dataService.sortPokemonByGene(this.pokemonList);
	}
}
