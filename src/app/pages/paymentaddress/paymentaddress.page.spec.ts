import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentaddressPage } from './paymentaddress.page';

describe('PaymentaddressPage', () => {
  let component: PaymentaddressPage;
  let fixture: ComponentFixture<PaymentaddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentaddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
