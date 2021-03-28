import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderpreviewPage } from './orderpreview.page';

describe('OrderpreviewPage', () => {
  let component: OrderpreviewPage;
  let fixture: ComponentFixture<OrderpreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderpreviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderpreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
