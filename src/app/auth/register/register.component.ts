import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { registerUser } from '../../utils/usersApis';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      console.log("Form Submitted:", this.registerForm.value);

      try {
        const formData = this.registerForm.value;

        const response = await axios.post(registerUser, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          contactNumber: formData.contactNumber,
          address: "",
          pinCode: "",
          profileImage: ""
        });

        console.log("Registered Successfully:", response.data);

      } catch (err) {
        console.error("Registration Failed:", err);
      }

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
