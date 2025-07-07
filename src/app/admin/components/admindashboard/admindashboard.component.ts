import { Component } from '@angular/core';
import { CreatecontractorComponent } from '../../forms/createcontractor/createcontractor.component';
import { MyprofileComponent } from '../../../components/myprofile/myprofile.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CreatecontractorComponent, MyprofileComponent, CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  activeView: 'create' | 'profile' = 'create'; // default to create

  showCreateContractor() {
    this.activeView = 'create';
  }

  showMyProfile() {
    this.activeView = 'profile';
  }
}
