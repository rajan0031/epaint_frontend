import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import axios from 'axios';
import { registerUser } from '../../../utils/usersApis';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createcontractor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './createcontractor.component.html',
  styleUrls: ['./createcontractor.component.css']
})
export class CreatecontractorComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      role: ['', Validators.required] // default to contractor
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      try {
        const formData = this.registerForm.value;
        console.log("the form data is ", formData)
        const response = await axios.post(registerUser, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          contactNumber: formData.contactNumber,
          address: "",
          pinCode: "",
          profileImage: "",
          role: parseInt(formData.role) // Send 2 or 3
        });

        console.log("the respo of the created contracter from the backend is ", response)
        this.snackBar.open("Contractor/User registered successfully ✅", 'X', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });

        this.router.navigate(["/login"], {
          state: { prop: formData }
        });

        this.registerForm.reset({ role: '2' }); // reset with default role
      } catch (err) {
        console.error("Registration Failed::", err);
        let errorMessage = "Registration failed ❌";
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }

        this.snackBar.open(errorMessage, 'X', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      } finally {
        this.isLoading = false;
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
