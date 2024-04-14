import { Button, DatePicker, Form, Input } from 'antd';
import type { DatePickerProps } from 'antd';
import { useContext, useState } from 'react';
import { createAcount } from '../../apis/user';
import { MessageContextProvider } from '../../contexts/MessageContext';
import { useNavigate } from 'react-router-dom';

type FieldType = {

};

// Email, Họ và tên, Ngày sinh, Địa chỉ, Điện thoại, Tên đăng nhập, Mật Khẩu
const CreateAccount = () => {
  const initialValues = {}
  const mess = useContext(MessageContextProvider)
  const success = mess?.success
  const error = mess?.error

  const navigate= useNavigate()
 
  const [data, setData] = useState<any>()

  const onFinish = async (values: FieldType) => {
    const req = {
      ...data,
      ...values
    }
    const res = await createAcount(req)
    if(res?.code === 200) {
      success("Tạo thành công")
      navigate("/super-admin/admin-accounts")
    }
    else{
      error(res?.msg)
    }
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setData({
      ...data,
      dateOfBirth: dateString
    })
  };

  return (
    <div className='MovieSchedule'>
      <header>Tạo mới tài khoản admin</header>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={initialValues}
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Không thể để trống!' }]}
      >
        <Input placeholder='' />
      </Form.Item>

      <Form.Item<FieldType>
        label="Họ và tên"
        name="fullname"
        rules={[{ required: true, message: 'Không thể để trống!' }]}
      >
        <Input placeholder='' />
      </Form.Item>

      <Form.Item<FieldType>
        label="Ngày sinh"
        name="dateOfBirth"
        rules={[{ required: true, message: 'Không thể để trống!' }]}
      >
        <DatePicker
          onChange={onChange}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: 'Không thể để trống!' }]}
      >
        <Input placeholder='' />
      </Form.Item>

      <Form.Item<FieldType>
        label="Điện thoại"
        name="phone"
        rules={[{ required: true, message: 'Không thể để trống!' }]}
      >
        <Input placeholder='' />
      </Form.Item>
      <Form.Item<FieldType>
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: 'Không thể để trống!' }]}
      >
        <Input placeholder='' />
      </Form.Item>

      <Form.Item<FieldType>
        label="Mật Khẩu"
        name="password"
        rules={[{ required: true, message: 'Không thể để trống!' }]}
      >
        <Input.Password placeholder='' />
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default CreateAccount