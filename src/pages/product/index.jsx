import { GlobalTable, GlobalDelete } from "@components";
import { Space, Button, Modal, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import productService from "../../service/product"; 
import brandService from "../../service/brand"; 
import brandCategoryService from "../../service/brand-category";
import categoryService from "../../service/category"; 
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const ProductPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brandCategories, setBrandCategories] = useState([]);
    const [total, setTotal] = useState();
    const [file, setFile] = useState(null);
    const [params, setParams] = useState({
        search: "",
        limit: 10,
        page: 1
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { search } = useLocation();

    const getData = async () => {
        setLoading(true);
        try {
            const res = await productService.get(params);
            setData(res?.data?.data?.products);
            setTotal(res?.data?.data?.count);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getBrands = async () => {
        try {
            const res = await brandService.get({ limit: 100, page: 1 });
            setBrands(res?.data?.data?.brands || []);
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = async () => {
        try {
            const res = await categoryService.get({ limit: 100, page: 1 });
            setCategories(res?.data?.data?.categories || []);
        } catch (error) {
            console.log(error);
        }
    };

    const getBrandCategories = async () => {
        try {
            const res = await brandCategoryService.get({ limit: 100, page: 1 });
            setBrandCategories(res?.data?.data?.brandCategories || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
        getBrands();
        getCategories();
        getBrandCategories();
    }, [params]);

   
const addOrUpdateProduct = async (values) => {
    const formData = new FormData();
    
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("category_id", values.category_id);
    formData.append("brand_id", values.brand_id);
    formData.append("brand_category_id", values.brand_category_id);

    if (file) {
        formData.append("image", file);
    }

    try {
        if (editingProduct) {
            await productService.update(editingProduct.id, formData);
        } else {
            await productService.create(formData);
        }
        getData();
        handleClose();
    } catch (error) {
        console.log(error);
    }
};


    const deleteProduct = async (id) => {
        try {
            await productService.delete(id);
            message.success('Product successfully deleted!');
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const editProduct = (product) => {
        setEditingProduct(product);
        setVisible(true);
    };
    const handleClose = () => {
        setVisible(false);
        form.resetFields();
        setFile(null);
    };

    const handleUpload = (info) => {
        const fileList = info.fileList;
        setFile(fileList[0]?.originFileObj || null);
    };
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: 'Brand',
            dataIndex: 'brand_name',
            key: 'brand_name',
        },
        {
            title: 'Brand Category',
            dataIndex: 'brand_category_name',
            key: 'brand_category_name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button style={{ backgroundColor: "#BC8E5B", color: "white" }} onClick={() => editProduct(record)}><EditOutlined /></Button>
                    <GlobalDelete id={record.id} handleDelete={deleteProduct} />
                </Space>
            ),
        }
    ];

    return (
        <div>
            <div className="flex gap-2 items-center mb-2">
                <Button type="primary" onClick={() => { setVisible(true); setEditingProduct(null); }}>Add Product</Button>
                <Input value={params.search} onChange={(e) => setParams({ ...params, search: e.target.value })} className="w-[300px]" placeholder="Search..." />
            </div>
            <GlobalTable columns={columns} data={data} loading={loading}
                pagination={{
                    current: params.page,
                    pageSize: params.limit,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50']
                }}
                handleChange={(pagination) => {
                    setParams({ ...params, page: pagination.current, limit: pagination.pageSize });
                    const searchParams = new URLSearchParams(location.search);
                    searchParams.set("page", `${pagination.current}`);
                    searchParams.set("limit", `${pagination.pageSize}`);
                    navigate(`?${searchParams}`);
                }}
            />
            <Modal
                title={editingProduct ? "Edit Product" : "Add Product"}
                visible={visible}
                onCancel={handleClose}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={addOrUpdateProduct}>
                    <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category_id" label="Category" rules={[{ required: true }]}>
                        <Select placeholder="Select Category">
                            {categories.map((category) => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="brand_id" label="Brand" rules={[{ required: true }]}>
                        <Select placeholder="Select Brand">
                            {brands.map((brand) => (
                                <Select.Option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="brand_category_id" label="Brand Category" rules={[{ required: true }]}>
                        <Select placeholder="Select Brand Category">
                            {brandCategories.map((brand_category) => (
                                <Select.Option key={brand_category.id} value={brand_category.id}>
                                    {brand_category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Upload Image">
                        <Upload beforeUpload={() => false} onChange={handleUpload} accept="image/*">
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductPage;
