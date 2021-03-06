import React from "react";
import {getImageProduct} from "../../shared/ultils"
import { createComment,getCommentsProduct,getProductDetails } from "../../services/Api";
import moment from "moment";
import { ADD_TO_CART } from "../../shared/constants/action-type";
import { useDispatch } from "react-redux";

const ProductDetails = (props)=>{
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
  
  const id = props.match.params.id;
  const [productdetails, setProductDetails] = React.useState(null);

  const onChange=(e)=>{
    const {name,value} = e.target
    setNewcomment({...newComment,[name]:value});
    console.log({name,value})
  }

  const getComments =(id)=>{
    getCommentsProduct(id,{}).then((res)=>{
      setComments(res.data.data.docs);
      console.log(res.data.data.docs);
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


  React.useEffect(()=>{
    //
    getProductDetails(id,{}).then((res)=>{
      setProductDetails(res.data.data)
      // console.log(res.data.data);

      getComments(id);
    })
  },[id])

    return(
<div id="product">
  <div id="product-head" className="row">
    <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
      <img src={getImageProduct(productdetails?.image)} />
    </div>
    <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
      <h1>{productdetails?.name}</h1>
      <ul>
        <li><span>B???o h??nh:</span> 12 Th??ng</li>
        <li><span>??i k??m:</span> {productdetails?.accessories}</li>
        <li><span>T??nh tr???ng:</span> {productdetails?.status}</li>
        <li><span>Khuy???n M???i:</span> {productdetails?.promotion}</li>
        <li id="price">Gi?? B??n (ch??a bao g???m VAT)</li>
        <li id="price-number">{productdetails?.price} ??</li>
        <li id="status" style={productdetails?.is_stock?{color: "#5cb85c"}:{color:"red"}}> {productdetails?.is_stock?"C??n h??ng":"H???t h??ng"}</li>
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
	  Th??m v??o gi??? h??ng
	</button>
  </div>
) : null}


    </div>
  </div>
  <div id="product-body" className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <h3>????nh gi?? v??? {productdetails?.name}</h3>
      <p>
        {productdetails?.details}
      </p>
    </div>
  </div>
  {/*	Comment	*/}
  <div id="comment" className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <h3>B??nh lu???n s???n ph???m</h3>
      <form method="post">
        <div className="form-group">
          <label>T??n:</label>
          <input onChange={onChange} value={newComment?.name ||""} name="name" required type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input onChange={onChange} value={newComment?.email ||""} name="email" required type="email" className="form-control" id="pwd" />
        </div>
        <div className="form-group">
          <label>N???i dung:</label>
          <textarea onChange={onChange} value={newComment?.content ||""} name="content" required rows={8} className="form-control" defaultValue={""} />     
        </div>
        <button onClick={onSubmitComment} type="submit" name="sbm" className="btn btn-primary">G???i</button>
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