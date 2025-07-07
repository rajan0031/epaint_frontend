import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecontractorComponent } from './createcontractor.component';

describe('CreatecontractorComponent', () => {
  let component: CreatecontractorComponent;
  let fixture: ComponentFixture<CreatecontractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatecontractorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
