import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkStatisticsComponent } from './network-statistics.component';

describe('NetworkStatisticsComponent', () => {
  let component: NetworkStatisticsComponent;
  let fixture: ComponentFixture<NetworkStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
