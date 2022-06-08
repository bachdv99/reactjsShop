import React from "react";
import { getCategoriesProducts, getCategory } from "../../services/Api";
import ProductItem from "../../shared/components/product-item"

const Category = (props)=>{

  const id = props.match.params.id;
  const[category,setCategory]=React.useState([]);
  const[products,setProducts]=React.useState([]);
  const[totalProducts,setTotalProducts]=React.useState(0);
  React.useEffect(()=>{
    //Set category
    getCategory(id,{}).then((res)=>{
      setCategory(res.data.data);
    })

    //Set products
    getCategoriesProducts(id,{}).then((res)=>{
      setProducts(res.data.data.docs);
          //Set total
          setTotalProducts(res.data.data.docs.length)
    })
  },[id])


    return(   
<div>
  <div className="products">
    <h3>{category.name} (Hiện có {totalProducts} sản phẩm)</h3>
    <div className="product-list card-deck">
    {
                        products.map((product)=>{
                            return <ProductItem item={product}/>
                        })
                    }
    </div>
  </div>
  {/*	End List Product	*/}
  <div id="pagination">
    <ul className="pagination">
      <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
      <li className="page-item active"><a className="page-link" href="#">1</a></li>
      <li className="page-item"><a className="page-link" href="#">2</a></li>
      <li className="page-item"><a className="page-link" href="#">3</a></li>
      <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
    </ul> 
  </div>
</div>
    )
}

export default Category;