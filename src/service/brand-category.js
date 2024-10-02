// import https from "./config";
// const brand = {
//    create: (data) => https.post("/brand-category/create", data),
//    get: (params) => https.get("/brand-category/search", {params}),
//    update: (id, data) => https.patch(`/brand-category/update/${id}`, data),
//    delete: (id) => https.delete(`/brand-category/delete/${id}`),
// };

// export default brand;

import https from "./config";
const brandCategory = {
    create: (data) => https.post("/brand-category/create", data),
    get: (params) => https.get("/brand-category/search", { params }),
    update: (id, data) => https.patch(`/brand-category/update/${id}`, data),
    delete: (id) => https.delete(`/brand-category/delete/${id}`),
};

export default brandCategory;
