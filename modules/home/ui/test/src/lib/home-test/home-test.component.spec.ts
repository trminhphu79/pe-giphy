import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTestComponent } from './home-test.component';

describe('HomeTestComponent', () => {
  let component: HomeTestComponent;
  let fixture: ComponentFixture<HomeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
