import Http from "./Http";

export const getProduct = (config)=>{
    return Http.get("/products",config);
};

export const getCategories = (config)=>{
    return Http.get("/categories",config);
}

export const getCategory = (id,config)=>{
    return Http.get(`categories/${id}`,config)
}

export const getCategoriesProducts = (id,config)=>{
    return Http.get(`/categories/${id}/products`,config)
}

export const getProductDetails =(id,config)=>{
    return Http.get(`/products/${id}`,config)
}
export const getCommentsProduct = (id,config)=>{
    return Http.get(`/products/${id}/comments`,config)
}

export const createComment = (id,data,config)=>{
    return Http.post(`/products/${id}/comments`,data,config)
}

//B1: Viết API cho categories (Api.js)
//B2: Import data cho page cần sử dụng(App.js)
//B3: Khai báo state(App.js)
//B4: Cập nhật state lấy từ API(App.js)
//B5: đẩy data từ API sang menu(App.js)
//B6: Hoàn thiện menu từ data được đẩy sang(Menu.js)