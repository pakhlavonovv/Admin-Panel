import { NavLink } from "react-router-dom"
const Index = () => {
  return (
<>
    <div className="flex flex-col items-center justify-center">
    <h1 className="text-[40px] text-[#dca76b]"><b>404 NOT FOUND</b></h1>
    <NavLink to='/admin-layout/category' className="text-[20px]">Go to Category page</NavLink>
    </div>
</>


  )
}

export default Index