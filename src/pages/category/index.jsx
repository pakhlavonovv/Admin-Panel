import { GlobalTable } from "@components"
import { Space, Tag , Button, Modal, Form, Input, Tooltip } from 'antd';
import category from "../../service/category";
import { useEffect, useState } from "react";
const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [total, setTotal] = useState()
    const [params, setParams] = useState({
        search: "",
        limit: 2,
        page: 1
    })
    const [form] = Form.useForm()
    const [editingCategory, seteditingCategory] = useState(null)
    const getData = async () => {
        setLoading(true)
        try {
            const res = await category.get(params)
            setData(res?.data?.data?.categories)
            setTotal(res?.data?.data?.count)
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const addOrUpdateCategory = async(values) => {
        try {
            if(editingCategory){
                await category.update(editingCategory.id, values);
            } else{
                await category.create(values)
            }
            getData()
            setVisible(false)
            form.resetFields()
        } catch (error) {
            console.log(error)
        }
    }
    const deleteCategory = async (id) => {
        try {
            await category.delete(id)
            getData()
        } catch (error) {
            console.log(error)
        }
    }
    const editBook = (category) => {
        seteditingCategory(category)
        form.setFieldValue(category)
        setVisible(true)
    }
    useEffect(()=> {
        getData()
    }, [params])
    const handleTableChange = (pagination) => {
        const {current, pageSize} = pagination
        setParams((prev)=> ({
            ...prev,
            limit: pageSize,
            page: current
        }))
    }
    const columns = [
        {
          title: 'Category name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button style={{border: "1px solid blue"}} onClick={() => editBook(record)}>Edit</Button>
                    <Button danger onClick={() => deleteCategory(record.id)}>Delete</Button>
                </Space>
            ),
        }
      ];    
  return (
    <div>
        <Button type="primary" className="mb-2" onClick={()=>{ setVisible(true); seteditingCategory(null);}}>Add category</Button>
        <GlobalTable columns={columns} data={data} loading={loading} 
        pagination={{
            current: params.page,
            pageSize: params.limit,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ['2', '5', '7', '10', '12']
        }}
        handleChange={handleTableChange}
        />
        <Modal
                title={editingCategory ? "Edit Category" : "Add Category"}
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={addOrUpdateCategory}>
                    <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="sheet" label="Category number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item> */}
                </Form>
            </Modal>
    </div>
  )
}

export default Index
