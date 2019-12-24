import React, { useEffect, useState } from 'react';

// 路由
import { useHistory } from 'react-router-dom';
import { HOME_MANAGER_RESULT } from '@/constants/route-constants';

// 请求
import { SAVE_MANAGER, QUERY_ROLE } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

export default Form.create({ name: 'save-manager' })(props => {
  const { getFieldDecorator } = props.form,
    history = useHistory(),
    [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const queryRole = await proxyFetch(QUERY_ROLE, {}, 'GET');

      setOptions(queryRole);
    })();
  }, []);

  const handleSumbitSave = e => {
    e.preventDefault();
    props.form.validateFields(async (err, value) => {
      if (!err) {
        delete value.confirm;
        const res = await proxyFetch(SAVE_MANAGER, value);

        if (res) {
          history.push(`${HOME_MANAGER_RESULT.path}/createSuccess`);
        }
      }
    });
  };

  return (
    <Form
      labelCol={{
        xs: { span: 8 },
        sm: { span: 4 }
      }}
      wrapperCol={{
        xs: { span: 16 },
        sm: { span: 8 }
      }}
      onSubmit={handleSumbitSave}
    >
      <Form.Item label='账号'>
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: '请输入账号！'
            },
            {
              pattern: /^\S{3,12}$/,
              message: '账号需要3-12位'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='密码' hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '请输入密码！'
            },
            {
              pattern: /^\S{6,12}$/,
              message: '密码需要6-12位'
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label='确认密码' hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: '请再次输入密码！'
            },
            {
              pattern: /^\S{6,12}$/,
              message: '密码需要6-12位'
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
      <Form.Item label='名字' hasFeedback>
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
      <Form.Item label='电话号码' hasFeedback>
        {getFieldDecorator('phone', {
          rules: [
            { required: true, message: '请输入电话号码！' },
            {
              pattern: /^[1][0-9][0-9]{9}$/,
              message: '电话号码不符合规则'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='权限' hasFeedback>
        {getFieldDecorator('role', {
          rules: [{ required: true, message: '请选择权限！' }]
        })(
          <Select>
            {options.map(({ name, code }) => (
              <Option key={code} value={code}>
                {name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: {
            span: 8,
            offset: 8
          },
          sm: {
            span: 16,
            offset: 4
          }
        }}
      >
        <Button type='primary' htmlType='submit'>
          创建
        </Button>
      </Form.Item>
    </Form>
  );
});
