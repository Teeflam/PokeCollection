import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	email = 'admin@admin.fr';
	password = '123456789a';
	errorMessage = '';
	error: { name: string; message: string } = { name: '', message: '' };

	constructor(public authService: AuthService, private router: Router) {}

	signUp(): void {
		if (this.validateForm(this.email, this.password)) {
			this.authService
				.signUpWithEmail(this.email, this.password)
				.then(() => {
					void this.router.navigate(['/']);
				})
				.catch((_error) => {
					this.error = _error;
				});
		}
	}

	login(): void {
		if (this.validateForm(this.email, this.password)) {
			this.authService
				.loginWithEmail(this.email, this.password)
				.then(() => void this.router.navigate(['/']))
				.catch((_error) => {
					this.error = _error;
					void this.router.navigate(['/login']);
				});
		}
	}

	/**
	 *
	 * @param email
	 * @param password
	 * @returns bool
	 */
	validateForm(email: string, password: string): boolean {
		if (password.length < 6) {
			alert('too short');
			return false;
		}
		return true;
	}
}
