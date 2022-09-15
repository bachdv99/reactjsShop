import React from "react";
import {getProducts, getLatestProducts,getFeaturedProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
// import getLatestProducts from "../../services/Api";
import getProductTest from "../../services/Api"
const Home = () => {
  const [latestProduct, setLateProduct] = React.useState([]);
  const [featuredProduct, setFeaturedProduct] = React.useState([]);

  // console.log(res)
  React.useEffect(() => {
    // get latest product
    getLatestProducts().then((res) => {
      setLateProduct(res.data);
      console.log(res.data);
    })
    getFeaturedProducts().then((res) => {
      setFeaturedProduct(res.data);
      console.log(res.data);
    })
  }, [])

  return (
    <div>
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {
            featuredProduct.map((featuredProduct) => {
              return <ProductItem item={featuredProduct} />
            })
          }
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {
        latestProduct.map((latestProduct)=>{
          return <ProductItem item ={latestProduct}/>
        })
      }
        </div>
      </div>
    </div>

  )
}

export default Home;