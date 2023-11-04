import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadGridComponent } from './read-grid.component';

describe('ReadGridComponent', () => {
  let component: ReadGridComponent;
  let fixture: ComponentFixture<ReadGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadGridComponent]
    });
    fixture = TestBed.createComponent(ReadGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
