import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckoutCompletePage } from './checkout-complete.page';

describe('CheckoutCompletePage', () => {
  let component: CheckoutCompletePage;
  let fixture: ComponentFixture<CheckoutCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
