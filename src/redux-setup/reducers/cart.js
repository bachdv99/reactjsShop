
import { ADD_TO_CART,UPDATE_CART,DELETE_ITEM_CART } from "../../shared/constants/action-type";

const initState ={
    items:[],
};

export default function(state =initState,action){
    switch (action.type) {
        case ADD_TO_CART:
            return addItem(state,action.payload);
        case "Sync_CART":
            return{...state,items:action.payload};
        case UPDATE_CART:
            return updateItem(state,action.payload);
        case DELETE_ITEM_CART:
            return{...state, items:state.items.filter((item)=>item._id != action.payload.id)}
            
        default:
            return state;
    }
}

function addItem(state,payload){
    const items = state.items;

    let isProductExists  = false;
    items.map((item) => {
        if (!isProductExists && payload._id === item._id) {
          item.qty += payload.qty;
          isProductExists = true;
        }
        return item;
      });
    
      const newItems = isProductExists ? items : [...items, payload];
      //JSON.stringify(item) chuyển item dạng object về json
      localStorage.setItem("cart_items", JSON.stringify(newItems));
    
      return { ...state, items: newItems };
}

function updateItem(state,payload){
    const items = state.items;
    const {id, qty} = payload;
    const newItems = items.map((item,index)=>{
        if (item.id === id){
            item.qty = qty;
        }
        return item;
    });
    console.log({...state, items:newItems});
    return{...state,items:newItems}
}