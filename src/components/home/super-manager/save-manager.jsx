import React, { useEffect, useState } from 'react';

// 路由
import { useHistory } from 'react-router-dom';
import { HOME_MANAGER_RESULT } from '@/constants/route-constants';

// 请求
import {
  SAVE_MANAGER,
  QUERY_ROLE,
  UPLOAD_FILE
} from '@/constants/api-constants';
import proxyFetch, { proxyDataFetch } from '@/util/request';

// 加密
import md5 from 'md5';

// 样式
import { Form, Input, Button, Select, Upload, Icon } from 'antd';

const { Option } = Select;

export default Form.create({ name: 'save-manager' })(({ form, manager }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    // { name, password, phone, role, username, uuid } = manager,
    history = useHistory(),
    [loading, setLoading] = useState(false),
    [options, setOptions] = useState([]),
    [isUpdate, setIsUpdate] = useState(false),
    [uuid, setUuid] = useState('');

  useEffect(() => {
    if (manager && manager.uuid) {
      setUuid(manager.uuid);

      delete manager.password;
      delete manager.uuid;

      setFieldsValue(manager);
      setIsUpdate(true);
    }

    return () => {};
  }, [manager, setFieldsValue]);

  useEffect(() => {
    (async () => {
      const queryRole = await proxyFetch(QUERY_ROLE, {}, 'GET');
      setOptions(queryRole);
    })();
  }, []);

  const handleSumbitSave = e => {
    e.preventDefault();
    form.validateFields(async (err, value) => {
      if (!err) {
        delete value.confirm;

        value.uuid = uuid;
        value.password = md5(value.password);
        setLoading(true);
        const res = await proxyFetch(SAVE_MANAGER, value);
        setLoading(false);

        if (res) {
          // 有uuid说明是更新，没有是创建
          if (uuid) {
            history.push(`${HOME_MANAGER_RESULT.path}/updateSuccess`);
          } else {
            history.push(`${HOME_MANAGER_RESULT.path}/createSuccess`);
          }
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
      <Form.Item label='Dragger'>
        {getFieldDecorator('headPortraitUrl', {
          valuePropName: 'fileList',
          getValueFromEvent: e => {
            // 这个其实是onChange
            // console.log(e);
          }
        })(
          <Upload
            listType='picture-card'
            showUploadList={false}
            // action={}
            // beforeUpload={beforeUpload}
            // onChange={this.handleChange}
            customRequest={file => {
              // loading
              const res = proxyDataFetch(UPLOAD_FILE, file.file);
              // loading
            }}
            data={data => {
              // 这里修改上传参数
              // console.log(data);
            }}
          >
            <div>
              {/* this.state.loading ? 'loading' : */}
              <Icon type={'plus'} />
              <div className='ant-upload-text'>Upload</div>
            </div>
            {/* {imageUrl ? (
              <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
            ) : (
              uploadButton
            )} */}
          </Upload>
        )}
      </Form.Item>
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
        })(<Input placeholder='请输入账号' disabled={isUpdate} />)}
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
        })(<Input.Password placeholder='请输入密码' />)}
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
                if (value && value !== form.getFieldValue('password')) {
                  callback('密码和确认密码要一致！');
                } else {
                  callback();
                }
              }
            }
          ]
        })(<Input.Password placeholder='请再次输入密码' />)}
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
        })(<Input placeholder='请输入用户姓名' />)}
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
        })(<Input placeholder='请输入11位手机号码' />)}
      </Form.Item>
      <Form.Item label='权限' hasFeedback>
        {getFieldDecorator('role', {
          rules: [{ required: true, message: '请选择权限！' }]
        })(
          <Select placeholder='请选择权限' disabled={isUpdate}>
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
        <Button type='primary' loading={loading} htmlType='submit'>
          {isUpdate ? '更新该用户' : '创建'}
        </Button>
      </Form.Item>
    </Form>
  );
});
