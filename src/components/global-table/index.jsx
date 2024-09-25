import React from 'react';
import { Space, Table, Tag } from 'antd';


const App = (props) => {
    const {columns, data, pagination, handleChange} = props
    return (
        <Table columns={columns} dataSource={data} 
        pagination={pagination}
        onChange={(pagination)=> handleChange}
        />
    )
};
export default App;