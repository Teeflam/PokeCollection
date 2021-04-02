import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/Auth/auth.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnDestroy {
	userID: string | undefined;
	userIDSubscription: Subscription;

	constructor(private router: Router, private authService: AuthService) {
		this.userID = this.authService.currentUserId;
		this.userIDSubscription = this.authService.userIDObservable.subscribe(
			(userID) => {
				this.userID = userID;
			}
		);
	}

	ngOnDestroy() {
		this.userIDSubscription.unsubscribe();
	}

	async logout() {
		await this.authService.signOut();
		await this.router.navigateByUrl('/');
	}
}
