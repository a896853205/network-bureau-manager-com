import React from 'react';

// 样式
import { Icon, Input, Form, Button } from 'antd';
import '@/style/login.styl';

// redux
import { useSelector, useDispatch } from 'react-redux';
import managerAction from '@/redux/action/manager';

// 加密
import md5 from 'md5';

export default Form.create({ name: 'login' })(props => {
  const { getFieldDecorator } = props.form;
  const { loginLoading } = useSelector(state => state.managerStore);
  const dispatch = useDispatch();

  const handleSubmitLogin = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // 处理加密密码
        values.password = md5(values.password);
        // 使用redux-saga
        dispatch(managerAction.asyncSetManager(values));
      }
    });
  };

  return (
    <Form onSubmit={handleSubmitLogin}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入账号!' }]
        })(
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='账号'
            size='large'
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }]
        })(
          <Input
            prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='密码'
            size='large'
            type='password'
          />
        )}
      </Form.Item>
      <Form.Item>
        <div className='login-button-box'>
          <Button type='primary' loading={loginLoading} htmlType='submit'>
            登录
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});
