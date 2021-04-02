import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Poke from '../models/Poke';
import { AuthService } from '../services/Auth/auth.service';
import { DataService } from '../services/Data/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
	pokemonList: Poke[] = [];
	userID: string | undefined;
	userIDSubscription: Subscription;

	constructor(
		private dataService: DataService,
		private authService: AuthService
	) {
		this.userID = this.authService.currentUserId;
		this.userIDSubscription = this.authService.userIDObservable.subscribe(
			(userID) => {
				this.userID = userID;
			}
		);
	}

	ngOnInit(): void {
		for (let i = 1; i < 6; i++) {
			this.dataService
				.getMoreData(i.toString())
				.then((uniqResponse: Poke) => {
					this.pokemonList.push(uniqResponse);
				});
		}
	}

	ngOnDestroy(): void {
		this.userIDSubscription.unsubscribe();
	}
}
