import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import './App.css';
import {products,sizes,cartArr} from './proddata.js';
import './floatingcart.css'

const options = [
  { value: 'Highest to lowest', label: 'Highest to lowest' },
  { value: 'Lowest to highest', label: 'Lowest to highest' },
];
export default class MyComponentClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {products,sizes,itemsAdded:0,Total:0,cartArr,toggle:false ,selectedSize:null, selectedOption:null,}

  }

 getSizeButton = (items,index) =>{
	return(
	<div className="filters-available-size">
			  <button type="button"  value="" className="checkbox" onClick={()=>{this.filterSizes(items)}}>
			   <span className="checkmark">{items}</span>
			  </button>
			   </div>
			   );
}



filterSizes=(items)=>{
const temArr=[];
    products.forEach(product=>{

      if(items ==='All'){
          temArr.push(product)
      }
  else if (product.availableSizes.includes(items)) {
      temArr.push(product)
    }
  });

 this.setState({ products: temArr ,selectedSize:items});}

 getItemDetail=(items,index)=>{
return (
                   <div className="board-item">
                          <p className="item-ship" >
						         {items.isFreeShipping && <p>&nbsp;&nbsp;Free Shipping&nbsp;&nbsp;</p>}
								</p>
                          <div className="item-image">
						  <img className="prodImage" src={items.src} alt=''/>
						  </div>
                          <div className="item-detail">{items.title}</div>
                          <div className="item-price">$ &nbsp;{items.price}</div>
                          <div className="item-cart"  onClick={()=>{this.AddToCart(items)}}>Add to Cart</div>

                      </div>);
					  }
 sortHighToLow=()=>{
   const temArr=this.state.products.sort(function (a, b) {
       return b.price - a.price;
    });
this.setState({ products: temArr });}

sortLowToHigh=()=>{
       const temArr=this.state.products.sort(function (a, b) {
      return a.price - b.price;
   });
this.setState({ products: temArr });}

AddToCart=(items)=>{
   const amount=parseFloat(items.price) + parseFloat(this.state.Total);
    const Added=this.state.itemsAdded + 1;
    items.quantity=items.quantity+1;
    if(items.quantity===1){this.state.cartArr.push(items);}
  this.setState({itemsAdded:Added, Total:amount.toFixed(2), cartArr:this.state.cartArr,valCheck:this.state.valCheck,toggle:true});
}

RemoveFromCart=(items)=>{
   const amount=parseFloat(this.state.Total)-parseFloat(items.price*items.quantity);
    const Sub=this.state.itemsAdded-items.quantity;
    items.quantity=0;
     this.state.cartArr.splice(cartArr.indexOf(items),1);
this.setState({itemsAdded:Sub,Total:amount.toFixed(2),cartArr:this.state.cartArr});}


ShelfItem=(items,index)=>{

  return(<div className="shelf-item">
            <div className="shelf-item__del"onClick={()=>this.RemoveFromCart(items)}> X</div>
              <div className="details-container">
            <div className="shelf-item__thumb"><img className="shelf-image"src={items.src} alt=''/></div>


             <div className="shelf-item__details">
             <p className="title">{items.title}</p>
             <p className="desc">{items.availableSizes[0]} |{items.style} <br/>Quantity: {items.quantity}</p></div>
                 <div className="shelf-item__price"><br/>${items.price*items.quantity}</div>
</div>
   </div>);
}
DisplayCar=()=>{
  return(<div className="float-cart">
                  <div className="close-btn" onClick={()=>this.toggleFirst()}>X</div>
       <div className="float-cart-content">
                    <div className="float-cart-header">
                     <span className="header-title">Cart Summary</span>
                    </div>
             <div className="float-cart-container">
                    {this.state.cartArr.length!==0? this.state.cartArr.map(this.ShelfItem): <div className="noItem">No items in the cart</div>}
                    <div className="float-cart__footer">
                                           <div className="subtotal-cal">
                                           <div className="sub">SUBTOTAL</div>
                                  <div className="sub-price">$ {this.state.Total}</div></div>
                    <div className="buy-btn">Checkout</div>
                    </div>
              </div>
                     </div>
</div>);
}

toggleFirst=()=>{
  this.setState({toggle:!this.state.toggle});
}
handleChange = (selectedOption) => {
   this.setState({ selectedOption });
   if(selectedOption.value ==='Lowest to highest'){this.sortLowToHigh()}
   else if (selectedOption.value ==='Highest to lowest'){this.sortHighToLow()}
 }
  render() {
    const { selectedOption } = this.state;
    return(
	<div id="main">
               <div className="sizes">
			   <h4 className="title">Filter Size:</h4>
			   		{this.state.sizes.map(this.getSizeButton)}
			   </div>
         <div className="right-side">
         <div className="top-bar">
         <div className="cart-icon" onClick={()=>this.toggleFirst()}  ><img className="cart-image"src="https://image.flaticon.com/icons/svg/2/2772.svg" alt=''/></div>
        <div>
         <Select
         className ='sortbtn'
        value={selectedOption}
        onChange={this.handleChange}
        options={options}

      /></div></div> <div className="description"><div className="available-products"> Product(s) Found: {this.state.products.length}</div>
            {this.state.selectedSize!==null && this.state.selectedSize!=='All'?<div className="selected-size">Size Selected: {this.state.selectedSize}</div>:null}</div>
               <div className="board">
       			  { this.state.products.map(this.getItemDetail)}

         </div>
                 {this.state.toggle? this.DisplayCar():null}
		</div>
</div>
	);
  }
}





	ReactDOM.render(<MyComponentClass />, document.getElementById('root'));
