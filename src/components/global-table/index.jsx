import React from 'react';
import { Space, Table, Tag } from 'antd';


const App = (props) => {
    const {columns, data} = props
    return (
        <Table columns={columns} dataSource={data} />
    )
};
export default App;