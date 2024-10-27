import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeLoadingComponent } from './pe-loading.component';

describe('PeLoadingComponent', () => {
  let component: PeLoadingComponent;
  let fixture: ComponentFixture<PeLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
