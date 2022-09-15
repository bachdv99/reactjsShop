import { getImageProduct } from "../ultils"
import {Link} from 'react-router-dom';

const ProductItem =({item})=>{
  console.log(item)
    return(
        <div className="product-item card text-center">
        <Link to={`/Product-details-${item._id}`}><img src={getImageProduct(item)} /></Link>
        <h4><Link to={`/Product-details-${item._id}`}>{item.name}</Link></h4>
        <p>Giá Bán: <span>{item.price} đ</span></p>
      </div>
    )
}

export default ProductItem;

//destructring asignment in es6
/*
b1: gắn url để tới Page Product(bao gồm cả id)
b2: hoàn thiện Router cho Page Product
b3: Lấy ra 1 sản phẩm duy nhất theo id truyền vào
b4: import data
b5: xây dựng state
b6: cập nhật dữ liệu cho state
b7: render dữ liệu
*/