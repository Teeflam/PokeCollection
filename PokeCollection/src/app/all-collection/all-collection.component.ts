import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { CollectionService } from '../services/Collection/collection.service';

@Component({
	selector: 'app-all-collection',
	templateUrl: './all-collection.component.html',
})
export class AllCollectionComponent implements OnInit, OnDestroy {
	pokemonList = [] as string[];
	authUpdateSub: any;

	constructor(
		private db: CollectionService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.getPokemonList();
		this.authUpdateSub = this.authService.authStateUpdate.subscribe(() => {
			this.getPokemonList();
		});
	}

	ngOnDestroy(): void {
		this.authUpdateSub.unsubscribe();
	}

	getPokemonList(): void {
		this.db
			.getPokemon(this.authService.currentUserId)
			.subscribe((collection) => {
				this.pokemonList = [];
				for (var i = 0; i < collection.length; i++) {
					this.pokemonList.push(collection[i]);
				}
			});
	}
}
