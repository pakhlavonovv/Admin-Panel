import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

const GlobalDelete = ({ id, handleDelete }) => {
    const cancel = () => {
        message.error('Category is not deleted');
    };

    return (
        <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(id)} // O'chirishda id ni uzatamiz
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger><DeleteOutlined /></Button>
        </Popconfirm>
    );
};

export default GlobalDelete;
