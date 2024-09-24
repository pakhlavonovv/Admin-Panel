import { GlobalTable } from "@components"
import { Space, Tag , Button, Modal, Form, Input } from 'antd';
import category from "../../service/category";
import { useEffect, useState } from "react";
import { getAdapter } from "axios";
const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [editingBook, setEditingBook] = useState(null)
    const getData = async () => {
        setLoading(true)
        try {
            const res = await category.get()
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const addOrUpdateBook = async(values) => {
        try {
            if(editingBook){
                await category.update(editingBook.id, values);
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
    const deleteBook = async (id) => {
        try {
            await category.delete(id)
            getData()
        } catch (error) {
            console.log(error)
        }
    }
    const editBook = (book) => {
        setEditingBook(book)
        form.setFieldValue(book)
        setVisible(true)
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
            key: 'sheet'
        },
        {
            title: 'Writer',
            dataIndex: 'writer',
            key: 'writer'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => editBook(record)}>Edit</Button>
                    <Button danger onClick={() => deleteBook(record.id)}>Delete</Button>
                </Space>
            ),
        }
      ];    
  return (
    <div>
        <Button type="primary" onClick={()=>{ setVisible(true); setEditingBook(null);}}>Add category</Button>
        <GlobalTable columns={columns} data={data} loading={loading}/>
        <Modal
                title={editingBook ? "Edit Book" : "Add Book"}
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={addOrUpdateBook}>
                    <Form.Item name="name" label="Book Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="sheet" label="Book Sheet" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="writer" label="Writer" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
    </div>
  )
}

export default Index
