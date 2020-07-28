import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftStatsComponent } from './minecraft-stats.component';

describe('MinecraftStatsComponent', () => {
  let component: MinecraftStatsComponent;
  let fixture: ComponentFixture<MinecraftStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinecraftStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinecraftStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
