import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdidprofileformComponent } from './edidprofileform.component';

describe('EdidprofileformComponent', () => {
  let component: EdidprofileformComponent;
  let fixture: ComponentFixture<EdidprofileformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdidprofileformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdidprofileformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
