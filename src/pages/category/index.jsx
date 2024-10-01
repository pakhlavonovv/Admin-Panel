import { GlobalTable, GlobalDelete } from "@components"
import { Space, Tag, Button, Modal, Form, Input, Tooltip, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons'
import category from "../../service/category";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { LangContext } from "../../context";
import LangData from "../../lang/lang.json"

const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const {lang, setLang} = useContext(LangContext)
    const [total, setTotal] = useState()
    const { search } = useLocation()
    const navigate = useNavigate()
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
    const addOrUpdateCategory = async (values) => {
        try {
            if (editingCategory) {
                await category.update(editingCategory.id, values);
            } else {
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

    const goToSubCategory = (categoryId) => {
        navigate(`/admin-layout/sub-category/${categoryId}`);
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
            title: LangData[lang].category_table.name,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: LangData[lang].category_table.actions,
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button style={{ backgroundColor: "#BC8E5B", color: "white" }} onClick={() => editBook(record)}><EditOutlined /></Button>
                    <GlobalDelete id={record.id} handleDelete={deleteCategory} />
                    <Button onClick={() => goToSubCategory(record.id)}><ArrowRightOutlined /></Button>
                </Space>
            ),
        }
    ];

    return (
        <div>
            <div className="flex gap-2 items-center mb-2">
                <Button type="primary" onClick={() => { setVisible(true); seteditingCategory(null); }}>Add category</Button>
                <Input value={params.search} onChange={handleInputChange} className="w-[300px]" placeholder="Search..." />
                <select className="border-2 rounded-md p-1" onChange={(evt) => {
                    setLang(evt.target.value)
                }}>
                    <option value="eng">EN</option>
                    <option value="uz">UZ</option>
                </select>
            </div>
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
                </Form>
            </Modal>
        </div>
    )
}

export default Index;
