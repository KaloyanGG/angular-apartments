import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChooserComponent } from './home-chooser.component';

describe('HomeChooserComponent', () => {
  let component: HomeChooserComponent;
  let fixture: ComponentFixture<HomeChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
