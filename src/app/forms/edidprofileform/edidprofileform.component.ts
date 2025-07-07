import { Component, EventEmitter, Input, Output } from '@angular/core';
import axios from 'axios';
import { TokenService } from '../../token.service';
import { editProfile } from '../../utils/usersApis';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edidprofileform',
  imports: [FormsModule, CommonModule],
  templateUrl: './edidprofileform.component.html',
  styleUrl: './edidprofileform.component.css',
  standalone: true,
})
export class EdidprofileformComponent {
  @Input() userData: any;
  @Output() close = new EventEmitter<void>();

  name = '';
  email = '';
  contactNumber = '';
  address = '';
  pinCode = '';
  profileImage = '';
  role = 3;

  selectedFile: File | null = null;
  isUploading = false;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    if (this.userData) {
      const u = this.userData;
      this.name = u.name;
      this.email = u.email;
      this.contactNumber = u.contactNumber;
      this.address = u.address;
      this.pinCode = u.pinCode;
      this.profileImage = u.profileImage;
      this.role = u.role;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadImage() {
    if (!this.selectedFile) return;

    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', 'upload_preset'); // Replace with your Cloudinary upload preset

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dfynuj63c/image/upload', formData);
      this.profileImage = res.data.secure_url;
      console.log("the response from the cloudnary is ", res);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image.');
    } finally {
      this.isUploading = false;
    }
  }

  async updateProfile() {
    try {
      const token = this.tokenService.getToken();
      const updatedData = {
        name: this.name,
        email: this.email,
        contactNumber: this.contactNumber,
        address: this.address,
        pinCode: this.pinCode,
        profileImage: this.profileImage,
        role: this.role,
      };

      await axios.put(`${editProfile}/${this.userData.id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.userData.name = this.name;
      this.userData.email = this.email;
      this.userData.contactNumber = this.contactNumber;
      this.userData.address = this.address;
      this.userData.pinCode = this.pinCode;
      this.userData.profileImage = this.profileImage;
      this.userData.role = this.role;

      alert('Profile updated successfully!');
      this.close.emit();
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile!');
    }
  }

  closeModal() {
    this.close.emit();
  }
}
