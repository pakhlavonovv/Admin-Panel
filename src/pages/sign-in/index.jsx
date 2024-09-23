import SignInImage from './img/login.jpg'
import { Button, Form, Input, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
const { Title } = Typography;
import { LockOutlined } from "@ant-design/icons";

import { useNavigate } from 'react-router-dom';
const Index = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleSumbit = async() => {
        navigate('admin-layout')
    }
    return (
        <>
            <div className='flex items-center gap-[200px]'>
                <div className="left">
                    <img className='w-full h-screen' src={SignInImage} alt="sign-in-image" />
                </div>
                <div className="right">
                <Title level={2}>Login</Title>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
  name="phone"
  rules={[
    {
      required: true,
      message: "Please input your Phone number!",
    },
    {
      pattern: /^[0-9]{9}$/,
      message: "Please enter a valid phone number (9 digits)!",
    },
  ]}
>
  <Input
    addonBefore="+998"
    maxLength={9} // Faqat 9 ta raqam kiritilishi kerak
    placeholder="Phone number"
  />
</Form.Item>

                        <Form.Item
                            name="password"
                            style={{width: "500px"}}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >            
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button onClick={handleSumbit} style={{backgroundColor: "#BC8E5B"}} className='w-full h-10 p-3 text-white' htmlType="submit">
                                Login
                            </Button>
                            <div className="flex gap-2 mt-2">
                            <Title level={5} style={{fontWeight: "400"}}>Do you have an account ?</Title>
                            <NavLink style={{color: "#BC8E5B"}} to="sign-up">Registrate</NavLink>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Index