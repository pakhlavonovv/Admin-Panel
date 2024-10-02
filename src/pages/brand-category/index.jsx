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
    const [form] = Form.useForm()
    const [editingBrand, setEditingBrand] = useState({})
    console.log(editingBrand)
    const getData = async () => {
        setLoading(true)
        try {
            const res = await brand.get(params)
            console.log(res)
            setData(res?.data?.data?.brands)
            setTotal(res?.data?.data?.count)
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const addOrUpdateBrand = async (values) => {
        console.log(values);
        try {
            if (editingBrand) {
                await brand.update(editingBrand.id, values);
            } else {
                await brand.create(values);
            }
            getData();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBrand = async (id) => {
        try {
            await brand.delete(id)
            message.success('Brand Category successfully deleted!');
            getData()
        } catch (error) {
            console.log(error)
        }
    }
    const editBrand = (brand) => {
        setEditingBrand(brand)
        setVisible(true)
    }
    const handleClose = () => {
        setVisible(false)
        form.resetFields()
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
    useEffect(() => {
        if (editingBrand) {
            form.setFieldsValue({
                name: editingBrand.name,
                category_id: editingBrand.category_id,
                description: editingBrand.description
            })
        } else {
            form.resetFields();
        }
    }, [editingBrand, form])
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
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button style={{ backgroundColor: "#BC8E5B", color: "white" }} onClick={() => editBrand(record)}><EditOutlined /></Button>
                    <GlobalDelete id={record.id} handleDelete={deleteBrand} />
                </Space>
            ),
        }
    ];

    return (
        <div>
            <div className="flex gap-2 items-center mb-2">
                <Button type="primary" onClick={() => { setVisible(true); setEditingBrand(null); }}>Add brand Category</Button>
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
                title={editingBrand ? "Edit Brand Category" : "Add Brand Category"}
                visible={visible}
                onCancel={handleClose}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={addOrUpdateBrand}>
                    <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Index;
