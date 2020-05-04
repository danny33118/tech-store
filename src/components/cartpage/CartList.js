import React from "react";
import { ProductConsumer } from "../../context/context";
import CartItem from "./CartItem";

export default function CartList() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <ProductConsumer>
            {(value) => {
              const { cart, increment, decrement, removeItem } = value;
              if (cart.length === 0) {
                return (
                  <h1 className="text-title text-center my-4">
                    your cart is empty
                  </h1>
                );
              }
              return (
                <>
                  <div className="container-fluid text-center d-none d-lg-block my-5">
                    <div className="row">
                      <div className="col-lg-2">
                        <p className="text-uppercase">products</p>
                      </div>
                      <div className="col-lg-2">
                        <p className="text-uppercase">name of product</p>
                      </div>
                      <div className="col-lg-2">
                        <p className="text-uppercase">price</p>
                      </div>
                      <div className="col-lg-2">
                        <p className="text-uppercase">quantity</p>
                      </div>
                      <div className="col-lg-2">
                        <p className="text-uppercase">remove</p>
                      </div>
                      <div className="col-lg-2">
                        <p className="text-uppercase">total</p>
                      </div>
                    </div>
                    {cart.map((item) => {
                      return <CartItem key={item.id} cartItem={item} increment={increment} decrement={decrement} removeItem={removeItem} />
                    })
                    }
                  </div>
                </>
              );
            }}
          </ProductConsumer>
        </div>
      </div>
    </div>
  );
}
