import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractordashboardComponent } from './contractordashboard.component';

describe('ContractordashboardComponent', () => {
  let component: ContractordashboardComponent;
  let fixture: ComponentFixture<ContractordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractordashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
