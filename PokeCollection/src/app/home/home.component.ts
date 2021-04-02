import { Component } from '@angular/core';
import Poke from '../models/Poke';
import { DataService } from '../services/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})

export class HomeComponent{
	
	pokemon! : Poke;

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.dataService
		.getMoreData("261")
		.then((uniqResponse: Poke) => {
			this.pokemon = uniqResponse;
		});
	}
}
