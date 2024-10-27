import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeAuthorInfoComponent } from './pe-author-info.component';

describe('PeAuthorInfoComponent', () => {
  let component: PeAuthorInfoComponent;
  let fixture: ComponentFixture<PeAuthorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeAuthorInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeAuthorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
