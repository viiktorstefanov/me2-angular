import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesAddComponent } from './experiences-add.component';

describe('ExperiencesAddComponent', () => {
  let component: ExperiencesAddComponent;
  let fixture: ComponentFixture<ExperiencesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperiencesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperiencesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
