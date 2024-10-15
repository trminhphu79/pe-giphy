import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeSearchComponent } from './pe-search.component';

describe('PeSearchComponent', () => {
  let component: PeSearchComponent;
  let fixture: ComponentFixture<PeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
