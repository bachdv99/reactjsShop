import React from "react";
import ProductItem from "../../shared/components/product-item"
import { getProduct } from "../../services/Api";
import Pagination from "../../shared/components/Pagination";

const Search = (props)=>{
  const [products,setProducts]= React.useState(null);
  const query = new URLSearchParams(props.location.search);
  const keyword = query.get("q");
  const page = query.get("page") || 1 ;
  const [pages,updatePages]=React.useState({
    total:0,
    limit:12,
    currentPage:page
  })
  React.useEffect(()=>{
    getProduct({
      params:{
        name:keyword,
        limit: 9,
        page:page,
      }
    }).then(({data})=>{
      setProducts(data.data.docs);
      updatePages({...pages,...data.data.pages})
    })
  },[keyword,page])

    return(
      <>
      {/*	List Product	*/}
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với từ khóa <span>{keyword}</span>
        </div>
        <div className="product-list card-deck">
          {products?.map((product) => {
            return <ProductItem key={product._id} item={product} />;
          })}
        </div>
      </div>
      {/*	End List Product	*/}
      <div id="pagination">
        <Pagination pages={pages} />
      </div>
    </>
    )
}

export default Search;