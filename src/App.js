import React from "react";
// import axios from "axios";
import Footer from "./shared/components/Layout/Footer";
import Header from "./shared/components/Layout/Header"
import Menu from "./shared/components/Layout/Menu"
import Sidebar from "./shared/components/Layout/Sidebar"
import Slider from "./shared/components/Layout/Slider"
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";

//import pages
import HomePage from "./pages/Home";
import CategoryPage from "./pages/Category";
import SuccessPage from "./pages/Success";
import SearchPage from "./pages/Search";
import ProductDetailsPage from "./pages/ProductDetails"
import CartPage from "./pages/Cart";
import NotFoundPage from "./pages/NotFound";
import { getCategories } from "./services/Api";
import { useLocation } from "react-router";
import store from "./redux-setup/store";
import { Provider } from "react-redux"



const App = () => {
  const [categories, setCategories] = React.useState([]);
  React.useEffect(()=>{
    getCategories().then((res)=>{
      setCategories(res.data.data.docs);
      console.log(typeof(categories));
    })
  },[])
  // const location = useLocation();
  // console.log(location.pathname);
  // console.log(location.search);

  return (
    <>
    <Provider store={store} >
              <BrowserRouter>
      {/*	Header	*/}
      <Header />
      {/*	End Header	*/}
      {/*	Body	*/}
      <div id="body">
        <div className="container">
            <Menu item={categories}/>
          <div className="row">
            <div id="main" className="col-lg-8 col-md-12 col-sm-12">
              <Slider/>
              <Switch>
       <Route exact path="/" component={HomePage}/>
       <Route path="/Cart" component={CartPage}/>
       <Route path="/Category-:id" component={CategoryPage}/>
       <Route path="/Search" component={SearchPage}/>
       <Route path="/Product-details-:id" component={ProductDetailsPage}/>
       <Route path="/Success" component={SuccessPage}/>
       <Route path="/404" component={NotFoundPage}/>
       <Route component={NotFoundPage}/>



       </Switch>

            </div>
            <Sidebar/>
          </div>
        </div>
      </div>

      {/*	End Body	*/}
      <Footer/>
      </BrowserRouter>
      </Provider >
    </>

  )
}


export default App