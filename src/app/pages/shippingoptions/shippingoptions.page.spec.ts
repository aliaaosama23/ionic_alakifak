import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShippingoptionsPage } from './shippingoptions.page';

describe('ShippingoptionsPage', () => {
  let component: ShippingoptionsPage;
  let fixture: ComponentFixture<ShippingoptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingoptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingoptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
