import React from "react";
import { getProduct } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";

const Home =()=>{
  const [latestProduct, setLateProduct] = React.useState([]);
  const [featuredProduct, setFeaturedProduct] = React.useState([]);

  React.useEffect(()=>{
    // get latest product
    getProduct({
      params:{
      limit:6,
    }
    }).then((res)=>{
      setLateProduct(res.data.data.docs);
    })

    getProduct({
      params:{
        limit:6,
        "filter[is_featured]":true,
      }
    }).then((res)=>{
      setFeaturedProduct(res.data.data.docs);
    })

  },[])

return(
<div>
  <div className="products">
    <h3>Sản phẩm nổi bật</h3>
    <div className="product-list card-deck">
    {
        featuredProduct.map((product)=>{
          return <ProductItem item ={product}/>
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