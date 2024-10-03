import https from "./config";
const brand = {
   create: (data) => https.post("/brand/create", data),
   get: (params) => https.get("/brand/search", {params}),
   getCategoryById: (id) => https.get(`/brand/category/${id}`),
   update: (id, data) => https.patch(`/brand/update/${id}`, data),
   delete: (id) => https.delete(`/brand/delete/${id}`),
};

export default brand;
