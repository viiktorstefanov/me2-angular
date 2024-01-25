import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesDetailsComponent } from './experiences-details.component';

describe('ExperiencesDetailsComponent', () => {
  let component: ExperiencesDetailsComponent;
  let fixture: ComponentFixture<ExperiencesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperiencesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperiencesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
