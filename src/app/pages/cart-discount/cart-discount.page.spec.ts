import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartDiscountPage } from './cart-discount.page';

describe('CartDiscountPage', () => {
  let component: CartDiscountPage;
  let fixture: ComponentFixture<CartDiscountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartDiscountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartDiscountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
