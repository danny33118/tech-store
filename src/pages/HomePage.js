import React from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import Services from "../components/homepage/Services";
import FeatureProduct from "../components/homepage/FeatureProduct";

export default function HomePage() {
  return (
    <>
      <Hero title="awesome gadgets" max="true">
        <Link to="/products" className="main-link" style={{ margin: "2rem" }}>
          Our Product
        </Link>
      </Hero>
      <Services />
      <FeatureProduct />
    </>
  );
}
