import { GlobalTable, GlobalDelete } from "@components"
import { Space, Upload, Tag, Button, Modal, Form, Input, Tooltip, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowRightOutlined, UploadOutlined } from '@ant-design/icons'
import brand from "../../service/brand";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [total, setTotal] = useState()
    const [file, setFile] = useState({})
    const { search } = useLocation()
    const navigate = useNavigate()
    const [params, setParams] = useState({
        search: "",
        limit: 2,
        page: 1
    });
    const handleChange = (e) => {
        // console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const [form] = Form.useForm()
    const [editingCategory, seteditingCategory] = useState(null)

    const getData = async () => {
        setLoading(true)
        try {
            const res = await brand.get(params)
            setData(res?.data?.data?.brands)
            setTotal(res?.data?.data?.count)
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const addOrUpdateCategory = async (values) => {
        let form = new FormData();
        console.log(values);
        if (file) {
            form.append("file", file); 
        }
        form.append("name", values.name);
        form.append("category_id", values.category_id);
        form.append("description", values.description);
    
        try {
            if (editingCategory) {
                await brand.update(editingCategory.id, values); // Noto'g'ri yerda 'values' ishlatilishi mumkin
            } else {
                await brand.create(form); // Formdan foydalaning, values emas
            }
            await getData(); // Ma'lumotlarni interfeysda yangilash
            setVisible(false);
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    };
    
    

    const deleteCategory = async (id) => {
        try {
            await brand.delete(id)
            message.success('Category successfully deleted!');
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

    useEffect(() => {
        getData()
    }, [params])
    useEffect(() => {
        const params = new URLSearchParams(search)
        let page = Number(params.get("page")) || 1
        let limit = Number(params.get("limit")) || 3
        setParams((prev) => ({
            ...prev,
            page: page,
            limit: limit
        }))
    }, [search])
    const handleTableChange = (pagination) => {
        const { current, pageSize } = pagination
        setParams((prev) => ({
            ...prev,
            limit: pageSize,
            page: current
        }));
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", `${current}`)
        searchParams.set("limit", `${pageSize}`)
        navigate(`?${searchParams}}`)
    }
    const handleInputChange = (event) => {
        setParams((prev) => ({
            ...prev,
            search: event.target.value
        }))
        const search_params = new URLSearchParams(search)
        search_params.get("search", event.target.value)
        navigate(`?${search_params}`)
    }
    const columns = [
        {
            title: 'Brand name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Category Id',
            dataIndex: 'category_id',
        },
        {
            title: 'File',
            dataIndex: 'file',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button style={{ backgroundColor: "#BC8E5B", color: "white" }} onClick={() => editBook(record)}><EditOutlined /></Button>
                    <GlobalDelete id={record.id} handleDelete={deleteCategory} />
                </Space>
            ),
        }
    ];

    return (
        <div>
            <div className="flex gap-2 items-center mb-2">
                <Button type="primary" onClick={() => { setVisible(true); seteditingCategory(null); }}>Add brand</Button>
                <Input value={params.search} onChange={handleInputChange} className="w-[300px]" placeholder="Search..." />
            </div>            <GlobalTable columns={columns} data={data} loading={loading}
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
                    <Form.Item name="name" label="Brand Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category_id" label="Category id" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Upload
                        beforeUpload={(file) => {
                            setFile(file);
                            return false; 
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>

                </Form>
            </Modal>
        </div>
    )
}

export default Index;
