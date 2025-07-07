import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TokenService } from '../../token.service';
import { AdmindashboardComponent } from '../../admin/components/admindashboard/admindashboard.component';
import { ContractordashboardComponent } from '../../contractor/components/contractordashboard/contractordashboard.component';
import { UserdashboardComponent } from '../../users/components/userdashboard/userdashboard.component';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterModule, AdmindashboardComponent, ContractordashboardComponent, UserdashboardComponent],
  standalone: true,
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isLoggedIn = false;
  role: number = 0;

  private tokenWatcher: any;

  constructor(private tokenService: TokenService, private router: Router) {
    const payload = this.tokenService.getTokenPayload();
    console.log(payload);
    if (payload) {
      this.role = +payload.role;
    }
  }

  ngOnInit(): void {
    this.tokenWatcher = setInterval(() => {
      this.isLoggedIn = this.tokenService.isLoggedIn();
      const payload = this.tokenService.getTokenPayload();
      if (payload) {
        this.role = +payload.role;
      }
    }, 500);
  }

  ngOnDestroy(): void {
    clearInterval(this.tokenWatcher);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.tokenService.clearToken();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  goToDashboard(): void {
    if (this.role === 1) {
      this.router.navigate(['/admindashboard']);
    } else if (this.role === 2) {
      this.router.navigate(['/contractordashboard']);
    } else if (this.role === 3) {
      this.router.navigate(['/userdashboard']);
    }
  }
}
