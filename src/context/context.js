import React, { Component } from "react";
import { linkData } from './linkData';
import { socialData } from '../context/SocialData';
import { items } from './productData';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    sidebarOpen: false,
    cartOpen: false,
    links:linkData,
    socialLinks: socialData,
    cart: [],
    cartItems:0,    
    cartSubtotal:0,
    cartTax:0,
    cartTotal:0,
    storeProducts:[],
    filteredProducts:[],
    featuredProducts:[],
    singleProduct:{},
    loading: false,
    search:'',
    price:0,
    minPrice:0,
    maxPrice:0,
    company:'all',
    shipping:false
  };

  componentDidMount(){
    this.setProducts(items);
  }

  setProducts = (items) => {
    let storeProducts = items.map(item => {
      const {id} = item.sys;
      const image = item.fields.image.fields.file.url;
      const product = {id, ...item.fields,image}
      return product;
    })
    // featured products
    let featuredProducts = storeProducts.filter(item => item.featured === true);
    // get maxPrice
    let maxPrice = Math.max(...storeProducts.map(item => item.price));
    //
    this.setState({
      storeProducts,
      featuredProducts,
      filteredProducts:storeProducts,
      cart: this.getStorageCart(),
      singleProduct: this.getStorageProduct(),
      loading: false,
      price: maxPrice,
      maxPrice,
    })
  }

  getStorageCart = () => {
    let cart;
    if(localStorage.getItem('cart')){
      cart =  JSON.parse(localStorage.getItem('cart'));
    } 
    else {
      cart = [];
    };
    return cart;
  }

  getStorageProduct = () => {
    return localStorage.getItem('singleProduct') ? JSON.parse(localStorage.getItem('singleProduct')): {};
  }

  getTotals = () => {
    let subtotal = 0;
    let cartItems = 0;
    this.state.cart.forEach(item => {
      subtotal += item.total;
      cartItems += item.count;
    })
    subtotal = parseFloat(subtotal.toFixed(2));
    let tax = subtotal * 0.2;
    tax = parseFloat(tax.toFixed(2));
    let total = subtotal + tax;
    total = parseFloat(total.toFixed(2));
    return {
      cartItems,
      subtotal,
      tax,
      total
    }

  }

  addTotals = () => {
    const totals = this.getTotals();
    this.setState({
      cartItems: totals.cartItems,
      cartSubtotal: totals.subtotal,
      cartTax: totals.tax,
      cartTotal: totals.total
    
    })
  }

  syncStorage = () => {
    localStorage.setItem("cart",JSON.stringify(this.state.cart));

  }

  addToCart = (id) => {
    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.storeProducts];
    let tempItem = tempCart.find(item => item.id === id);
    if(!tempItem){
      tempItem = tempProducts.find(item => item.id === id);
      let total = tempItem.price;
      let cartItem = {...tempItem,count:1,total};
      tempCart = [...tempCart,cartItem];
    }
    else {
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }
    this.setState({ cart:[...tempCart] }
    ,() =>{
      this.addTotals()
      this.syncStorage()
      this.openCart();
    });

  }

  setSingleProduct = (id) => {
    let product = this.state.storeProducts.find(item => item.id === id);
    localStorage.setItem('singleProduct', JSON.stringify(product));
    this.setState({
      singleProduct: {...product},
      loading:false
    })

  }

  handleSidebar = () => {
    this.setState({sidebarOpen: !this.state.sidebarOpen});
  }
  handleCart = () => {
    this.setState({cartOpen: !this.state.cartOpen});
  }
  closeCart = () => {
    this.setState({cartOpen:false});
  }
  openCart = () => {
    this.setState({cartOpen:true});
  }

  increment = (id) =>{
    let tempCart = [...this.state.cart];
    const cartItem =tempCart.find(item => item.id === id);
    cartItem.count++;
    cartItem.total = cartItem.count * cartItem.price;
    cartItem.total = parseFloat(cartItem.total.toFixed(2));
    this.setState({cart: [...tempCart]},
      () =>{

        this.addTotals();
      this.syncStorage();

      });
  }

  decrement = (id) =>{
    let tempCart = [...this.state.cart];
    const cartItem =tempCart.find(item => item.id === id);
    cartItem.count--;
    cartItem.total = cartItem.count * cartItem.price;
    cartItem.total = parseFloat(cartItem.total.toFixed(2));
    this.setState({cart: [...tempCart]},
      ()=>{
        this.addTotals()
        this.syncStorage()});
    if (cartItem.count === 0){
      this.removeItem(id);
    }

  }

  clearCart = () => {
    this.setState({
      cart: []
    },()=>{
      this.addTotals();
      this.syncStorage();
    })

  }

  removeItem = id => {
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    this.setState({cart: [...tempCart]},
      () =>{
        this.addTotals();
        this.syncStorage();
      });

  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === "checkbox" ?  
      event.target.checked : event.target.value;
    this.setState({
      [name]: value
    }, this.sortData);

  } 

  sortData = () => {
    const {storeProducts, price, company, shipping, search} = this.state;
    //
    let tempProducts = [...storeProducts];
    this.setState({filteredProducts: tempProducts});
    if(company !== "all"){
      tempProducts = tempProducts.filter(item => item.company === company);
    }
    //
    let tempPrice = parseInt(price);
    tempProducts = tempProducts.filter(item => item.price <= tempPrice);
    //
    if(shipping){
      tempProducts = tempProducts.filter(item => item.shipping === true);
    }
    //
    if (search.length>0){
      tempProducts = tempProducts.filter(item => {
        let tempSearch= search.toLowerCase();
        let tempTitle = item.title.toLowerCase().slice(0,search.length);
        if (tempSearch === tempTitle){
          return item;
        }

      })
    }
    this.setState({
      filteredProducts: tempProducts
    })


  }

  render() {
    return (
      <ProductContext.Provider value={{
          ...this.state,
          handleSidebar: this.handleSidebar,
          handleCart:this.handleCart,
          closeCart:this.closeCart,
          openCart:this.openCart,
          addToCart: this.addToCart,
          setSingleProduct: this.setSingleProduct,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          handleChange: this.handleChange,
          sortData: this.sortData,
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductContext, ProductProvider, ProductConsumer };
