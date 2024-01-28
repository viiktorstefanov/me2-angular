import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesEditComponent } from './experiences-edit.component';

describe('ExperiencesEditComponent', () => {
  let component: ExperiencesEditComponent;
  let fixture: ComponentFixture<ExperiencesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperiencesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperiencesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
