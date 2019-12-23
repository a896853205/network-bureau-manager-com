import React, { useEffect, useState } from 'react';

import proxyFetch from '@/util/request';

import { useHistory } from 'react-router-dom';
import { Form, Input, Tooltip, Icon, Button, Select } from 'antd';

import { SAVE_MANAGER, QUERY_ROLE } from '@/constants/api-constants.js';

const { Option } = Select;

export default Form.create({ name: 'save-manager' })(props => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    (async () => {
      const queryRole = await proxyFetch(QUERY_ROLE, {}, 'GET');

      setOptions(Object.values(queryRole));
    })();
  }, []);

  const { getFieldDecorator } = props.form;
  let history = useHistory();
  const handleSumbitSave = e => {
    console.log(1);
    e.preventDefault();
    props.form.validateFields((err, value) => {
      if (!err) {
        delete value.confirm;

        const res = proxyFetch(SAVE_MANAGER, value);
        if (res) {
          history.push('/home/manager/result');
        }
      }
    });
  };

  return (
    <Form onSubmit={handleSumbitSave}>
      <Form.Item label="账号">
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: '请输入账号！'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="密码" hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '请输入密码！'
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="请确认密码" hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: '请再次输入密码！'
            },
            {
              validator: (rule, value, callback) => {
                if (value && value !== props.form.getFieldValue('password')) {
                  callback('密码和确认密码要一致！');
                } else {
                  callback();
                }
              }
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            名字
            <Tooltip title="What do you want others to call you?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入用户名！',
              whitespace: true
            }
          ]
        })(<Input />)}
      </Form.Item>

      <Form.Item label="电话号码">
        {getFieldDecorator('phone', {
          rules: [
            { required: true, message: '请输入电话号码！' },
            {
              pattern: /^[1][0-9][0-9]{9}$/,
              message: '电话号码不符合规则'
            }
          ]
        })(<Input style={{ width: '100%' }} />)}
      </Form.Item>

      <Form.Item label="权限">
        <Select style={{ width: 120 }}>
          {options
            ? options.map(({ name, code }) => (
                <Option key={code} value={code}>
                  {name}
                </Option>
              ))
            : undefined}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          创建
        </Button>
      </Form.Item>
    </Form>
  );
});
