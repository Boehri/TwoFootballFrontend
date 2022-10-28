import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialNavbarComponent } from './material-navbar.component';

describe('MaterialNavbarComponent', () => {
  let component: MaterialNavbarComponent;
  let fixture: ComponentFixture<MaterialNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
