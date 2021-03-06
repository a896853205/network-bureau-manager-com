import React, { useState, useEffect } from 'react';

// 工具
import statusToColor from '@/components/home/project-manager/registration-detail/util/status-to-color';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_REGISTRATION_SPECIMEN,
  SET_REGISTRATION_DETAIL_SUCCESS_STATUS,
  SET_REGISTRATION_DETAIL_FAIL_STATUS
} from '@/constants/api-constants';

// 样式
import {
  Descriptions,
  Icon,
  Button,
  Tag,
  Input,
  Skeleton,
  message
} from 'antd';
import '@/style/home/project-manager/specimen.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [registrationSpecimen, setRegistrationSpecimen] = useState(null),
    [getDataLoading, setGetDataLoading] = useState(false),
    [statusLoading, setStatusLoading] = useState(false),
    [failText, setFailText] = useState(''),
    [status, setStatus] = useState(0),
    [statusText, setStatusText] = useState(''),
    dispatch = useDispatch(),
    history = useHistory();

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_REGISTRATION_DETAIL_SUCCESS_STATUS, {
        registrationUuid: enterpriseRegistrationUuid,
        type: 'specimen'
      });

      setStatusLoading(false);
      dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));
      history.push(HOME_REGISTRATION_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failText) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_REGISTRATION_DETAIL_FAIL_STATUS, {
          registrationUuid: enterpriseRegistrationUuid,
          type: 'specimen',
          failText
        });

        setStatusLoading(false);
        if (res) {
          history.push(HOME_REGISTRATION_PROFILE.path);
        }
      })();
    } else {
      message.error('请输入未通过审核理由!');
    }
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);

        let registrationSpecimen = await proxyFetch(
          SELECT_REGISTRATION_SPECIMEN,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (registrationSpecimen) {
          setStatus(registrationSpecimen.status);
          setStatusText(registrationSpecimen.statusText);
        }

        setRegistrationSpecimen(registrationSpecimen);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  const securityClassificationToText = securityClassification => {
    switch (securityClassification) {
      case 0:
        return '无';
      case 1:
        return '涉密';
      default:
        return '';
    }
  };
  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          样品登记表
          <Tag className='content-tag' color={statusToColor(status)}>
            {statusText}
          </Tag>
        </p>
      </div>
      <Skeleton loading={getDataLoading}>
        {registrationSpecimen ? (
          <div className='detail-specimen-box'>
            <Descriptions bordered className='specimen-description-box'>
              <Descriptions.Item label='注册商标' span={3}>
                {registrationSpecimen.trademark}
              </Descriptions.Item>
              <Descriptions.Item label='开发工具' span={3}>
                {registrationSpecimen.developmentTool}
              </Descriptions.Item>
              <Descriptions.Item label='产品密级'>
                {securityClassificationToText(
                  registrationSpecimen.securityClassification
                )}
              </Descriptions.Item>
              <Descriptions.Item label='单位属性' span={2}>
                {registrationSpecimen.unit}
              </Descriptions.Item>
              <Descriptions.Item label='邮箱' span={3}>
                {registrationSpecimen.email}
              </Descriptions.Item>
            </Descriptions>
            <div className='specimen-button-box'>
              <Button
                disabled={!(status === 1)}
                type='primary'
                htmlType='submit'
                className={status === 1 ? 'fail-button' : ''}
                loading={statusLoading}
                onClick={handleSetFailStatus}
              >
                审核不通过
              </Button>
              <Button
                disabled={!(status === 1)}
                type='primary'
                htmlType='submit'
                className={status === 1 ? 'success-button' : ''}
                loading={statusLoading}
                onClick={handleSetSuccessStatus}
              >
                审核通过
              </Button>
            </div>
            <TextArea
              disabled={!(status === 1)}
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength='800'
              placeholder='请输入审核不通过理由'
              className='specimen-textArea-box'
              onChange={e => {
                setFailText(e.target.value);
              }}
            />
          </div>
        ) : null}
      </Skeleton>
    </>
  );
};
