import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_REGISTRATION_CONTRACT_MANAGER,
  SAVE_REGISTRATION_CONTRACT_MANAGER
} from '@/constants/api-constants';

// 样式
import '@/style/home/project-manager/contract-manager.styl';
import { Input, Form, Button, Icon, Alert, DatePicker, Skeleton } from 'antd';

// 组件
import moment from 'moment';

export default Form.create({ name: 'contract' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { steps, enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    history = useHistory(),
    dispatch = useDispatch(),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false);

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let registrationContract = await proxyFetch(
          SELECT_REGISTRATION_CONTRACT_MANAGER,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (registrationContract) {
          // 数据处理
          // 时间处理
          if (registrationContract.specimenHaveTime) {
            registrationContract.specimenHaveTime = moment(
              registrationContract.specimenHaveTime
            );
          }

          if (registrationContract.paymentTime) {
            registrationContract.paymentTime = moment(
              registrationContract.paymentTime
            );
          }

          if (registrationContract.contractTime) {
            registrationContract.contractTime = moment(
              registrationContract.contractTime
            );
          }

          delete registrationContract.failText;
          delete registrationContract.managerUrl;
          delete registrationContract.enterpriseUrl;

          setFieldsValue(registrationContract);
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, setFieldsValue]);

  /**
   * 提交事件
   */
  const handleSumbitSave = e => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (enterpriseRegistrationUuid) {
        if (!err) {
          value.registrationUuid = enterpriseRegistrationUuid;

          setSaveDataLoading(true);
          const res = await proxyFetch(
            SAVE_REGISTRATION_CONTRACT_MANAGER,
            value
          );
          setSaveDataLoading(false);

          if (res) {
            dispatch(
              enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid)
            );
            history.push(HOME_REGISTRATION_PROFILE.path);
          }
        }
      }
    });
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>填写评测合同内容</p>
      </div>
      <div className='detail-contract-manager-box'>
        <Skeleton loading={getDataLoading}>
          <div className='contract-manager-left-box'>
            <Form
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 17 }}
              onSubmit={handleSumbitSave}
            >
              {/* 版本 */}
              <Form.Item label='合同编号'>
                {getFieldDecorator('contractCode', {
                  rules: [
                    {
                      required: true,
                      message: '请输入合同编号！'
                    },
                    {
                      message: '合同编号过长！',
                      max: 32
                    }
                  ]
                })(<Input placeholder='请输入合同编号' />)}
              </Form.Item>

              {/* 评测费金额 */}
              <Form.Item label='评测费金额'>
                {getFieldDecorator('payment', {
                  rules: [
                    { required: true, message: '请输入评测费金额！' },
                    {
                      pattern: /^(\d{1,8})$/,
                      message: '评测费金额需要是1-8位整数'
                    }
                  ]
                })(
                  <Input
                    placeholder='2000'
                    maxLength={32}
                    addonAfter={<span>元</span>}
                  />
                )}
              </Form.Item>

              {/* 样品接受日期 */}
              <Form.Item label='样品接受日期'>
                {getFieldDecorator('specimenHaveTime', {
                  rules: [{ required: true, message: '请选择样品接受日期！' }]
                })(<DatePicker placeholder='20XX-XX-XX' />)}
              </Form.Item>

              {/* 合同日期 */}
              <Form.Item label='合同日期'>
                {getFieldDecorator('contractTime', {
                  rules: [{ required: true, message: '请选择合同日期！' }]
                })(<DatePicker placeholder='20XX-XX-XX' />)}
              </Form.Item>

              {/* 提交按钮 */}
              <Form.Item wrapperCol={{ offset: 7 }}>
                <Button
                  disabled={!steps[1]?.status || steps[1]?.status === 100}
                  type='primary'
                  htmlType='submit'
                  loading={saveDataLoading}
                  className='button'
                  size='large'
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Skeleton>
        <div className='contract-manager-right-box'>
          <Alert
            message='经营管理部填写注意事项'
            description='此块内容是经营管理部填写注意事项,此处填写的内容都会再评测合同中有所体现,评测费金额默认为2000元人民币。'
            type='info'
            showIcon
          />
        </div>
      </div>
    </>
  );
});
