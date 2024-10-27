import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelsDetailComponent } from './channels-detail/channels-detail.component';

describe('ChannelsDetailComponent', () => {
  let component: ChannelsDetailComponent;
  let fixture: ComponentFixture<ChannelsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
