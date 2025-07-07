import { Component } from '@angular/core';
import axios from 'axios';
import { TokenService } from '../../token.service';
import { getProfile } from '../../utils/usersApis';
import { EdidprofileformComponent } from '../../forms/edidprofileform/edidprofileform.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css',
  imports: [EdidprofileformComponent, CommonModule],
})
export class MyprofileComponent {
  user: any = null;
  isLoading = true;
  error = '';
  isEditModalOpen = false;

  constructor(private tokenService: TokenService) {

  }

  async ngOnInit() {
    try {
      const token = this.tokenService.getToken();
      const tokenPayLoad = this.tokenService.getTokenPayload();
      const response = await axios.get(`${getProfile}/${tokenPayLoad.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = response.data.user;
      console.log("the user profile details ", response.data.user)
    } catch (err: any) {
      this.error = 'Failed to load profile';
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  openEditModal() {
    this.isEditModalOpen = true;
  }
}
