import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellInfoComponent } from './shell-info.component';

describe('ShellInfoComponent', () => {
  let component: ShellInfoComponent;
  let fixture: ComponentFixture<ShellInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
