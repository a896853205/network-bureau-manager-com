import React, { useState, useEffect } from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_PROJECT_REGISTRATION_TEST_SPECIMEN,
  SET_PROJECT_SPECIMEN_MANAGER_STATUS,
  SET_PROJECT_SPECIMEN_MANAGER_FAIL_STATUS
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
import '@/style/home/project-manager/test-specimen.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [registrationSpecimen, setRegistrationSpecimen] = useState(null),
    [getDataLoading, setGetDataLoading] = useState(false),
    [statusLoading, setStatusLoading] = useState(false),
    [failManagerText, setFailManagerText] = useState(''),
    [managerStatus, setManagerStatus] = useState(0),
    history = useHistory();

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_PROJECT_SPECIMEN_MANAGER_STATUS, {
        registrationUuid: enterpriseRegistrationUuid
      });

      setStatusLoading(false);
      history.push(HOME_REGISTRATION_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failManagerText) {
      (async () => {
        setStatusLoading(true);

        await proxyFetch(SET_PROJECT_SPECIMEN_MANAGER_FAIL_STATUS, {
          registrationUuid: enterpriseRegistrationUuid,
          failManagerText
        });

        setStatusLoading(false);
        history.push(HOME_REGISTRATION_PROFILE.path);
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
          GET_PROJECT_REGISTRATION_TEST_SPECIMEN,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (registrationSpecimen) {
          setManagerStatus(registrationSpecimen.managerStatus);
        }

        setRegistrationSpecimen(registrationSpecimen);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  const managerStatusToColor = managerStatus => {
    switch (managerStatus) {
      case 1:
        return 'gray';
      case 2:
        return 'blue';
      case 3:
        return 'green';
      case -1:
        return 'red';
      case -2:
        return 'red';
      case 0:
        return 'gray';
      default:
        return 'green';
    }
  };

  const managerStatusToText = managerStatus => {
    switch (managerStatus) {
      case 1:
        return '技术人员审核中';
      case 2:
        return '正在审核';
      case 100:
        return '已审核';
      case -1:
        return '技术人员审核未通过';
      case -2:
        return '审核未通过';
      case 0:
        return '未开始';
      default:
        return '未开始';
    }
  };

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
          <Tag
            className='content-tag'
            color={managerStatusToColor(managerStatus)}
          >
            {managerStatusToText(managerStatus)}
          </Tag>
        </p>
      </div>
      <Skeleton loading={getDataLoading}>
        {registrationSpecimen ? (
          <div className='detail-test-specimen-box'>
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
                disabled={!(managerStatus === 2)}
                type='primary'
                htmlType='submit'
                className={managerStatus === 2 ? 'fail-button' : ''}
                loading={statusLoading}
                onClick={handleSetFailStatus}
              >
                审核不通过
              </Button>
              <Button
                disabled={!(managerStatus === 2)}
                type='primary'
                htmlType='submit'
                className={managerStatus === 2 ? 'success-button' : ''}
                loading={statusLoading}
                onClick={handleSetSuccessStatus}
              >
                审核通过
              </Button>
            </div>
            <TextArea
              disabled={!(managerStatus === 2)}
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength='800'
              placeholder='请输入审核不通过理由'
              className='specimen-textArea-box'
              onChange={e => {
                setFailManagerText(e.target.value);
              }}
            />
          </div>
        ) : null}
      </Skeleton>
    </>
  );
};
