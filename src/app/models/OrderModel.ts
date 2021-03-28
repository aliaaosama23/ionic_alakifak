export class OrderModel {
   orderdata={
    payment_method: "",
    payment_method_title: "",
    set_paid: true,
    billing: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: "",
      phone: ""
    },
    shipping: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: ""
    },
    line_items: [
      {
        product_id:0,
        quantity: 0
      }
    ],
    shipping_lines: [
      {
        method_id: "",
        method_title: "",
        total: ""
      }
    ],
    coupon_lines:{
        id:0,
        code:"",
        discount:0
    }
   } 
construcor(){

}

}