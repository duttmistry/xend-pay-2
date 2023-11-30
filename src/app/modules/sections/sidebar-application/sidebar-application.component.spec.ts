import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarApplicationComponent } from './sidebar-application.component';

describe('SidebarApplicationComponent', () => {
  let component: SidebarApplicationComponent;
  let fixture: ComponentFixture<SidebarApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarApplicationComponent]
    });
    fixture = TestBed.createComponent(SidebarApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
