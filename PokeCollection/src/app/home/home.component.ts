import { Component } from '@angular/core';
import Poke from '../models/Poke';
import { DataService } from '../services/Data/data.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})

export class HomeComponent{
	
	pokemonList: Poke[] = [];

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		for (let i = 1; i < 6; i++) {
			this.dataService
			.getMoreData(i.toString())
			.then((uniqResponse: Poke) => {
				this.pokemonList.push(uniqResponse);
			});
		}
	}
}
