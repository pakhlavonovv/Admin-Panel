import { GlobalTable, GlobalDelete } from "@components";
import { Space, Upload, Button, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import brandCategory from "../../service/brand-category";
import brandService from "../../service/brand"; // Brandlarni olish uchun import qilamiz
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const BrandCategory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [total, setTotal] = useState();
    const [file, setFile] = useState({});
    const [brands, setBrands] = useState([]); // Brandlar ro'yxatini saqlash uchun state
    const { search } = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState({
        search: "",
        limit: 2,
        page: 1
    });
    const [form] = Form.useForm();
    const [editingBrandCategory, setEditingBrandCategory] = useState(null);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await brandCategory.get(params);
            setData(res?.data?.data?.brandCategories);
            setTotal(res?.data?.data?.count);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getBrands = async () => {
        try {
            const res = await brandService.get({ limit: 100, page: 1 }); // Brandlarni olish
            setBrands(res?.data?.data?.brands || []); // Brandlar ro'yxatini saqlaymiz
        } catch (error) {
            console.log(error);
        }
    };

    const addOrUpdateBrandCategory = async (values) => {
        let formData = new FormData();
        if (file) {
            formData.append("file", file);
        }
        formData.append("brand_id", values.brand_id);
        formData.append("category_id", values.category_id);
        formData.append("description", values.description);

        try {
            if (editingBrandCategory) {
                await brandCategory.update(editingBrandCategory.id, formData);
            } else {
                await brandCategory.create(formData);
            }
            getData();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBrandCategory = async (id) => {
        try {
            await brandCategory.delete(id);
            message.success('Brand Category successfully deleted!');
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const editBrandCategory = (brandCategory) => {
        setEditingBrandCategory(brandCategory);
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
        form.resetFields();
    };

    useEffect(() => {
        getData();
        getBrands(); // Brandlarni yuklaymiz
    }, [params]);

    useEffect(() => {
        if (editingBrandCategory) {
            form.setFieldsValue({
                brand_id: editingBrandCategory.brand_id,
                category_id: editingBrandCategory.category_id,
                description: editingBrandCategory.description
            });
        } else {
            form.resetFields();
        }
    }, [editingBrandCategory, form]);

    const handleTableChange = (pagination) => {
        const { current, pageSize } = pagination;
        setParams((prev) => ({
            ...prev,
            limit: pageSize,
            page: current
        }));
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", `${current}`);
        searchParams.set("limit", `${pageSize}`);
        navigate(`?${searchParams}`);
    };

    const handleInputChange = (event) => {
        setParams((prev) => ({
            ...prev,
            search: event.target.value
        }));
        const search_params = new URLSearchParams(search);
        search_params.get("search", event.target.value);
        navigate(`?${search_params}`);
    };

    const columns = [
        {
            title: 'Brand ID',
            dataIndex: 'brand_id',
            key: 'brand_id',
        },
        {
            title: 'Brand category  name',
            dataIndex: 'brand_category_name',
            key: 'brand_category_name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button style={{ backgroundColor: "#BC8E5B", color: "white" }} onClick={() => editBrandCategory(record)}><EditOutlined /></Button>
                    <GlobalDelete id={record.id} handleDelete={deleteBrandCategory} />
                </Space>
            ),
        }
    ];

    return (
        <div>
            <div className="flex gap-2 items-center mb-2">
                <Button type="primary" onClick={() => { setVisible(true); setEditingBrandCategory(null); }}>Add Brand Category</Button>
                <Input value={params.search} onChange={handleInputChange} className="w-[300px]" placeholder="Search..." />
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
                title={editingBrandCategory ? "Edit Brand Category" : "Add Brand Category"}
                visible={visible}
                onCancel={handleClose}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={addOrUpdateBrandCategory}>
                    <Form.Item name="brand_id" label="Brand" rules={[{ required: true }]}>
                        <Select placeholder="Select Brand">
                            {brands.map((brand) => (
                                <Select.Option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="brand_category_name" label="Brand Category name">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BrandCategory;
