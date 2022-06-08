import { Link } from "react-router-dom";
const Menu = ({item})=>{

    return(
<div className="row">
  <div className="col-lg-12 col-md-12 col-sm-12">
    <nav>
      <div id="menu" className="collapse navbar-collapse">
        <ul>
          {
            item.map((categories)=>{
              return(
                <li className="menu-item"><Link to={`/category-${categories._id}`}>{categories.name}</Link></li>
              )
            })
          }
        </ul>
      </div>
    </nav>
  </div>
</div>
    )
}

export default Menu;