import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeActionTabsComponent } from './pe-action-tabs/pe-action-tabs.component';

describe('PeActionTabsComponent', () => {
  let component: PeActionTabsComponent;
  let fixture: ComponentFixture<PeActionTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeActionTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeActionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
