import https from "./config";
const subCategoryService = {
   create: (subCategoryData) => https.post("/category/create", subCategoryData),
   get: (categoryId) => https.get("/category/search", {categoryId}),
   update: (subCategoryId, subCategoryData) => https.patch(`/category/update/${subCategoryId}`, subCategoryData),
   delete: (subCategoryId) => https.delete(`/category/delete/${subCategoryId}`),
};

export default subCategoryService;
