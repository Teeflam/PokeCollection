import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  uid = '';
  email = '';
  password = '';
  errorMessage = '';
  error: { name: string; message: string } = { name: '', message: '' };

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Sign up
   */

  SignUp(): void {
    if (this.validateForm(this.email, this.password)) {
      this.authService
        .signUpWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch((_error) => {
          this.error = _error;
          this.router.navigate(['/login']);
        });
    }
  }

  /**
   * Login
   *
   */
  Login(): void {
    if (this.validateForm(this.email, this.password)) {
      this.authService
        .loginWithEmail(this.email, this.password)
        .then(() => {
          this.uid = this.authService.currentUser;
          this.router.navigate(['/']);
        })
        .catch((_error) => {
          this.error = _error;
          this.router.navigate(['/']);
        });
    }
  }
  //^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$ regex for email
  validateForm(email: string, password: string): boolean {
    if (password.length < 6) {
      console.log('too short');
      return false;
    }
    return true;
  }

  // supprime apres
  SignOut(): void {
    console.log(this.authService.currentUser);
    this.authService.signOut();
    console.log(this.authService.currentUser);
  }
}
