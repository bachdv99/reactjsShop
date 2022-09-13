import React from "react";
import {getProducts, getLatestProducts } from "../../services/Api";
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

    getProducts().then((res) => {
      setFeaturedProduct(res.data);
      // console.log(res);
    })
  }, [])

  return (
    <div>
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {
            featuredProduct.map((product) => {
              return <ProductItem item={product} />
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
        latestProduct.map((product)=>{
          return <ProductItem item ={product}/>
        })
      }
        </div>
      </div>
    </div>

  )
}

export default Home;