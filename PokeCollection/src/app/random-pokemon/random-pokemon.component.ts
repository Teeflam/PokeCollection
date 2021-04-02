import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { CollectionService } from '../services/Collection/collection.service';
import { DailyService } from '../services/Daily/daily.service';
import { DataService } from '../services/data.service';

@Component({
	selector: 'app-random-pokemon',
	templateUrl: './random-pokemon.component.html',
	styleUrls: ['./random-pokemon.component.css'],
})
export class RandomPokemonComponent implements OnInit, OnDestroy {
	pokemonList = [] as number[];
	lastDate!: string;
	actualDate!: string;
	actualPoke: any;

	authUpdateSub: any;

	constructor(
		private db: CollectionService,
		private authService: AuthService,
		private dataService: DataService,
		private daily: DailyService
	) {
		this.actualDate = new Date().toLocaleDateString();
		this.lastDate = this.actualDate;
	}

	ngOnInit() {
		this.authUpdateSub = this.authService.authStateUpdate.subscribe(() => {
			this.getPokemonList();
			this.getLastDateOfUser();
		});
	}

	ngOnDestroy() {
		this.authUpdateSub.unsubscribe();
	}

	sendPokemon(pokemonID: number): void {
		var id = this.authService.currentUserId;
		if (id != null && id.length > 0) {
			this.db.sendToSpecific(id, pokemonID);
			this.daily.addDate(id);
		} else {
			console.log('not connected');
		}
	}

	getPokemonList() {
		this.db
			.getPokemon(this.authService.currentUserId)
			.subscribe((collection) => {
				this.pokemonList = [];
				for (var i = 0; i < collection.length; i++) {
					this.pokemonList.push(collection[i]);
				}
			});
	}

	getRandomId() {
		var number = Math.floor(Math.random() * 802 + 1);
		this.dataService
			.getMoreData(String(number))
			.subscribe((uniqResponse: any) => {
				this.actualPoke = uniqResponse;
			});
		return number;
	}

	getLastDateOfUser() {
		this.daily
			.getDate(this.authService.currentUserId)
			.subscribe((lastDate) => (this.lastDate = lastDate));
		console.log(this.lastDate);
	}

	compareDate(): boolean {
		if (this.lastDate === this.actualDate) return false;
		else {
			return true;
		}
	}
}
