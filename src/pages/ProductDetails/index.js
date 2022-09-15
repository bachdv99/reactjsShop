import React, { useEffect } from "react";
import {getImageProduct} from "../../shared/ultils"
import { createComment,getCommentsProduct,getProductDetails } from "../../services/Api";
import moment from "moment";
import { ADD_TO_CART } from "../../shared/constants/action-type";
import { useDispatch } from "react-redux";

const ProductDetails = (props)=>{
  
  // console.log(props.match.params.id);
  // console.log(props)
  // 
  const dispatch = useDispatch();
  
  const history = props.history;
  const addToCart = (type)=>{
    if(productdetails){
      const {_id, name, image, price} = productdetails;
      dispatch({
        type: ADD_TO_CART,
        payload: {
          _id,
          name,
          image,
          price,
          qty: 1
        }
      });
    }
  
    if(type === "buy-now"){
      history.push("/cart");
    }
  }
  

  const [newComment,setNewcomment]=React.useState(null);

  const [comments,setComments]=React.useState(null);
  const [src,setSrc]= React.useState('');
  const id = props.match.params.id;
  const [productdetails, setProductDetails] = React.useState(null);
  useEffect(async () => {
    const data = await getProductDetails(props.match.params.id)
    let datatoshow = data.data; // 
    console.log(datatoshow);
    setProductDetails(datatoshow);
    setSrc(getImageProduct(datatoshow));
}, [id]);
  const onChange=(e)=>{
    const {name,value} = e.target
    setNewcomment({...newComment,[name]:value});
    console.log({name,value})
  }

  const getComments =(id)=>{
    getCommentsProduct(id,{}).then((res)=>{
      setComments(res.data);
      console.log(res.data);
      })
  }
  const onSubmitComment=(e)=>{
    e.preventDefault();
    createComment(id,newComment,{}).then((res)=>{
      if(res.data.status == "success"){
        // Reset Form
        setNewcomment({});
        
        // Get Comments by ID
        getComments(id);
      }
      console.log(res.data);
    })
  }
    return(
<div id="product">
  <div id="product-head" className="row">
    <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
      <img src={src} />
    </div>
    <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
      <h1>{productdetails?.name}</h1>
      <ul>
        <li><span>Bảo hành:</span> 12 Tháng</li>
        <li><span>Đi kèm:</span> {productdetails?.accessories}</li>
        <li><span>Tình trạng:</span> {productdetails?.status}</li>
        <li><span>Khuyến Mại:</span> {productdetails?.promotion}</li>
        <li id="price">Giá Bán (chưa bao gồm VAT)</li>
        <li id="price-number">{productdetails?.price} đ</li>
        <li id="status" style={productdetails?.is_stock?{color: "#5cb85c"}:{color:"red"}}> {productdetails?.is_stock?"Còn hàng":"Hết hàng"}</li>
      </ul>
      {productdetails?.is_stock ? (
  <div id="add-cart">
	<button
	  onClick={() => addToCart("buy-now")}
	  className="btn btn-warning mr-2"
	>
	  Mua ngay
	</button>

	<button onClick={addToCart} className="btn btn-info">
	  Thêm vào giỏ hàng
	</button>
  </div>
) : null}


    </div>
  </div>
  <div id="product-body" className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <h3>Đánh giá về {productdetails?.name}</h3>
      <p>
        {productdetails?.details}
      </p>
    </div>
  </div>
  {/*	Comment	*/}
  <div id="comment" className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <h3>Bình luận sản phẩm</h3>
      <form method="post">
        <div className="form-group">
          <label>Tên:</label>
          <input onChange={onChange} value={newComment?.name ||""} name="name" required type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input onChange={onChange} value={newComment?.email ||""} name="email" required type="email" className="form-control" id="pwd" />
        </div>
        <div className="form-group">
          <label>Nội dung:</label>
          <textarea onChange={onChange} value={newComment?.content ||""} name="content" required rows={8} className="form-control" defaultValue={""} />     
        </div>
        <button onClick={onSubmitComment} type="submit" name="sbm" className="btn btn-primary">Gửi</button>
      </form> 
    </div>
  </div>
  {/*	End Comment	*/}  
  {/*	Comments List	*/}
  {
    comments?.length && (
      <div id="comments-list" className="row">
			<div className="col-lg-12 col-md-12 col-sm-12">
      {
        comments.map((comment)=>{
          const m = moment(comment.createdAt);
          return (
            <div key={comment._id} className="comment-item">
              <ul>
                <li>
                  <b>
                    {comment.name}
                  </b>
                </li>
                <li>
                  {m.fromNow()}
                </li>
                <li>
                  {comment.content}
                </li>
              </ul>
              </div>
          )
        })
      }
    
    </div>
		</div>
)
}

  {/*	End Comments List	*/}
</div>
    )
}

export default ProductDetails;