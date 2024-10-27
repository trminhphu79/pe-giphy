import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeCollectionsComponent } from './pe-collections.component';

describe('PeCollectionsComponent', () => {
  let component: PeCollectionsComponent;
  let fixture: ComponentFixture<PeCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeCollectionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
