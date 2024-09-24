import { GlobalTable } from "@components"
import { Space, Tag } from 'antd';
import category from "../../service/category";
import { useEffect, useState } from "react";
const Index = () => {
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            const res = await category.get()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getData()
    }, [])
    const columns = [
        {
          title: 'Book name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Book sheet',
            dataIndex: 'sheet',
        },
        {
            title: 'Writer',
            dataIndex: 'writer',
        }
      ];    
  return (
    <div>
        <GlobalTable columns={columns} data={data}/>
    </div>
  )
}

export default Index