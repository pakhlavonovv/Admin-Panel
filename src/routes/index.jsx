import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
   SignIn,
   AdminLayout,
   SignUp,
   Category,
   SubCategory
} from "@pages";

const Index = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path="/" element={<App />}>
            <Route index element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
            <Route path="admin-layout" element={<AdminLayout />}>
               <Route path="category" element={<Category/>}/>
               <Route path="sub-category/:categoryId" element={<SubCategory/>}/>
            </Route>
         </Route> 
      )
   );

   return <RouterProvider router={router} />;
};

export default Index;
