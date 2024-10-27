import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeImageLoaderComponent } from './pe-image-loader.component';

describe('PeImageLoaderComponent', () => {
  let component: PeImageLoaderComponent;
  let fixture: ComponentFixture<PeImageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeImageLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeImageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
