import { useEffect, useState } from "react";
import { Space, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import subCategoryService from "../../service/sub-category";
import { useParams } from "react-router-dom";
import { GlobalTable } from "@components"

const SubCategory = () => {
    const { categoryId } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingSubCategory, setEditingSubCategory] = useState(null);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await subCategoryService.getByCategoryId(categoryId); 
            setData(res?.data?.data?.subCategories);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const addOrUpdateSubCategory = async (values) => {
        try {
            if (editingSubCategory) {
                await subCategoryService.update(editingSubCategory.id, values);
            } else {
                await subCategoryService.create({ ...values, categoryId }); 
            }
            getData();
            setVisible(false);
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteSubCategory = async (id) => {
        try {
            await subCategoryService.delete(id);
            getData();
        } catch (error) {
            console.log(error);
        }
    }

    const editSubCategory = (subCategory) => {
        setEditingSubCategory(subCategory);
        form.setFieldsValue(subCategory);
        setVisible(true);
    }

    useEffect(() => {
        getData();
    }, [categoryId]);

    const columns = [
        {
            title: 'Sub-category name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button style={{ backgroundColor: "#BC8E5B", color: "white" }} onClick={() => editSubCategory(record)}><EditOutlined /></Button>
                    <Button style={{ backgroundColor: "red", color: "white" }} onClick={() => deleteSubCategory(record.id)}><DeleteOutlined /></Button>
                </Space>
            ),
        }
    ];

    return (
        <div>
            <Button type="primary" className="mb-2" onClick={() => { setVisible(true); setEditingSubCategory(null); }}>Add sub-category</Button>
            <GlobalTable columns={columns} data={data} loading={loading} />
            <Modal
                title={editingSubCategory ? "Edit Sub-category" : "Add Sub-category"}
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={addOrUpdateSubCategory}>
                    <Form.Item name="name" label="Sub-category Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default SubCategory;
