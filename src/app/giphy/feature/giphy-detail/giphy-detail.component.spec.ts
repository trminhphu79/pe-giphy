import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyDetailComponent } from './giphy-detail.component';

describe('GiphyDetailComponent', () => {
  let component: GiphyDetailComponent;
  let fixture: ComponentFixture<GiphyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiphyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiphyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
