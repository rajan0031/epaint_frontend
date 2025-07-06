import { Component } from '@angular/core';
import { NavComponent } from '../components/nav/nav.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NavComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
