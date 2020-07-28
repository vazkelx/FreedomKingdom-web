import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftMapComponent } from './minecraft-map.component';

describe('MinecraftMapComponent', () => {
  let component: MinecraftMapComponent;
  let fixture: ComponentFixture<MinecraftMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinecraftMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinecraftMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
