import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import DefaultPage from "./pages/DefaultPage";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";

import NavbarComponent from './components/Navbar';
import SidebarComponent from './components/Sidebar';
import SidecartComponent from './components/Sidecart';
import FooterComponent from './components/Footer';

import { FaHome } from "react-icons/fa";

export default class App extends Component {
  render() {
    return (
      <>
      <Router>

      <NavbarComponent/>
      <SidebarComponent/>
      <SidecartComponent/>
        <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/about" component={AboutPage}/>
        <Route exact path="/cart" component={CartPage}/>
        <Route exact path="/contact" component={ContactPage}/>
        <Route exact path="/products" component={ProductsPage}/>
        <Route exact path="/product/:id" component={SingleProductPage}/>
        <Route component={DefaultPage}/>
        </Switch>
      </Router>
      <FooterComponent/>
      </>
    );
  }
}

const Button = styled.button`
  color: red;
  background: blue;
  font-size: 2rem;
`;
