import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import axios from 'axios';
import { loginUser } from '../../utils/usersApis';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    const navigationDetails = this.router.getCurrentNavigation();
    const userDetails = navigationDetails?.extras?.state?.['prop'];

    if (userDetails) {
      this.loginForm.patchValue({
        email: userDetails.email,
        password: userDetails.password
      });
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        const { email, password } = this.loginForm.value;

        const response = await axios.post(loginUser, { email, password });

        this.showToast("Login successful ✅");

        this.router.navigate(['/']);
      } catch (err) {
        console.error("Login Failed:", err);
        let message = "Login failed ❌";
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          message = err.response.data.message;
        }
        this.showToast(message);
      } finally {
        this.isLoading = false;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'end' // end = right
    });
  }

}
