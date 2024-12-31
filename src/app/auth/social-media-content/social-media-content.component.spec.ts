import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaContentComponent } from './social-media-content.component';

describe('SocialMediaContentComponent', () => {
  let component: SocialMediaContentComponent;
  let fixture: ComponentFixture<SocialMediaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
