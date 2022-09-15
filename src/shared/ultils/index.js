import { BASE_URL } from "../constants/app";

export const getImageProduct = (item)=>{
    console.log(item);
    return `${BASE_URL}/images/${item._id}-${item.name}`
}
// 