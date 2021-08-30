import React from 'react';
import ReactDOM from 'react-dom';
import {products,sizes,cartArr} from './proddata.js';
export class FloatingCartComponent extends React.Component{
  constructor(props)
  {
    super(props);
  }
  render(){

    return(
    <div class="float-cart">
                    <div class="close-btn">X</div>
         <div class="float-cart-content">
                      <div class="float-cart-header">
                       <span class="header-title">Cart</span>
                      </div>
               <div class="float-cart-container">
                    <div class="shelf-item">
                              <div class="shelf-item__del">X</div>
                              <div class="shelf-item__thumb"><img src={this.props.src}/></div>
                               <div class="shelf-item__details"></div>
                               <div class="shelf-item__price">{this.props.price}</div>
                     </div>
                      <div class="float-cart__footer">
                               <div class="sub">SUBTOTAL</div>
                                    <div class="sub-price"></div>
                      <div class="buy-btn">Checkout</div>
                      </div>
                </div>
         </div>
</div>);
}}
