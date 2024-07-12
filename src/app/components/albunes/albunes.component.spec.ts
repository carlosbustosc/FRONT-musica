import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbunesComponent } from './albunes.component';

describe('AlbunesComponent', () => {
  let component: AlbunesComponent;
  let fixture: ComponentFixture<AlbunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbunesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
