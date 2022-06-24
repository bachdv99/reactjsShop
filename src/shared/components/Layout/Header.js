import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = (props)=>{

  const totalCart = useSelector(({Cart})=>{
    return Cart.items.reduce((total,item)=>total+item.qty,0);
  });
  
  const history = useHistory();
  const [keyword,setKeyword]=React.useState("");
  const handleOnChangeInput=(e)=>{
    const {value} = e.target
    setKeyword(value);
    console.log(value)
  }
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    history.push(`/search?q=${keyword}`)
  }

    return(
<div id="header">
  <div className="container">
    <div className="row">
      <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
        <h1><Link to="/" ><img className="img-fluid" src="images/logo.png" /></Link></h1>
      </div>
      <div id="search" className="col-lg-6 col-md-6 col-sm-12">
        <form className="form-inline">
          <input 
          className="form-control mt-3" 
          type="search"
          placeholder="Tìm kiếm" 
          aria-label="Search"
          name="keyword"
          onChange={handleOnChangeInput}
          value={keyword}
          />
          <button
          onClick={handleOnSubmit}
           className="btn btn-danger mt-3" type="submit">Tìm kiếm</button>
        </form>
      </div>
<div id="cart" className="col-lg-3 col-md-3 col-sm-12">
	<Link to="/cart" className="mt-4 mr-2">Giỏ hàng</Link><span className="mt-3">{totalCart}</span>
</div>
    </div>
  </div>
  {/* Toggler/collapsibe Button */}
  <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
    <span className="navbar-toggler-icon" />
  </button>
</div>

    )
}

export default Header;


/*
b1: xử lý thay đổi value input theo keyword state
b2: nhận keyword và đẩy keyword lên url theo dạng query string
b3: Gọi Api giúp cúng ta có thể tìm kiếm được tất cả các sản phẩm theo tên
b4: State lưu sản phẩm
b5: cập nhật lại state theo dữ liệu được trả về từ Api
b6: Render ra dữ liệu từ API trả về cho State
*/