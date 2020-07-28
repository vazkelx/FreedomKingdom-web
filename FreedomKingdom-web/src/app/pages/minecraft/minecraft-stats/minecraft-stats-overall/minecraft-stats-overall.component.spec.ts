import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftStatsOverallComponent } from './minecraft-stats-overall.component';

describe('MinecraftStatsOverallComponent', () => {
  let component: MinecraftStatsOverallComponent;
  let fixture: ComponentFixture<MinecraftStatsOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinecraftStatsOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinecraftStatsOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
