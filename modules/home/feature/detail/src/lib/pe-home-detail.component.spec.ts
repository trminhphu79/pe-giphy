import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeHomeDetailComponent } from './pe-home-detail/pe-home-detail.component';

describe('PeHomeDetailComponent', () => {
  let component: PeHomeDetailComponent;
  let fixture: ComponentFixture<PeHomeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeHomeDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeHomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
