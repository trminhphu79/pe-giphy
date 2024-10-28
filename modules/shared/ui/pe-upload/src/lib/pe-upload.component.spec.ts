import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeUploadComponent } from './pe-upload.component';

describe('PeUploadComponent', () => {
  let component: PeUploadComponent;
  let fixture: ComponentFixture<PeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
