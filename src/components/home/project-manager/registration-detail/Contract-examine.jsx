import React, { useEffect, useState } from 'react';

// 路由
import { Link } from 'react-router-dom';
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';

// 样式
import '@/style/home/project-manager/contract-examine.styl';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

//路由
import { useHistory } from 'react-router-dom';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  SET_CONTRACT_MANAGER_SUCCESS_STATUS,
  SET_CONTRACT_MANAGER_FAIL_STATUS,
  SELECT_REGISTRATION_CONTRACT_MANAGER
} from '@/constants/api-constants';

//样式
import { Button, Input, Icon, Tag, message } from 'antd';
const { TextArea } = Input;

export default props => {
  const { steps, enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    [enterpriseUrl, setEnterpriseUrl] = useState(''),
    [contractEnterpriseUrl, setContractEnterpriseUrl] = useState(''),
    [statusLoading, setStatusLoading] = useState(false),
    [managerFailText, setManagerFailText] = useState(''),
    history = useHistory();

  // 查找乙方上传url
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let contractList = await proxyFetch(
          SELECT_REGISTRATION_CONTRACT_MANAGER,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (contractList && contractList.enterpriseUrl) {
          // 数据处理
          setContractEnterpriseUrl(contractList.enterpriseUrl);
        }
      })();
    }
  }, [enterpriseRegistrationUuid, contractEnterpriseUrl]);

  useEffect(() => {
    (async () => {
      if (contractEnterpriseUrl) {
        const enterpriseUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: contractEnterpriseUrl },
          'GET'
        );

        setEnterpriseUrl(enterpriseUrl);
      }
    })();
  }, [contractEnterpriseUrl]);

  const statusToColor = status => {
    let color = '';

    switch (status) {
      case 4:
        color = 'blue';
        break;
      case 5:
        color = 'green';
        break;
      case 6:
        color = 'red';
        break;
      default:
        color = 'blue';
    }
    return color;
  };

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      const res = await proxyFetch(
        SET_CONTRACT_MANAGER_SUCCESS_STATUS,
        {
          registrationUuid: enterpriseRegistrationUuid
        },
        'PUT'
      );

      setStatusLoading(false);
      if (res) {
        dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));
        history.push(HOME_REGISTRATION_PROFILE.path);
      }
    })();
  };

  const handleSetFailStatus = () => {
    if (managerFailText) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_CONTRACT_MANAGER_FAIL_STATUS, {
          registrationUuid: enterpriseRegistrationUuid,
          managerFailText
        });

        setStatusLoading(false);
        if (res) {
          dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));
          history.push(HOME_REGISTRATION_PROFILE.path);
        }
      })();
    } else {
      message.error('请输入未通过审核理由!');
    }
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>审核乙方合同</p>
        <Tag className='content-tag' color={statusToColor(steps[1]?.statusText)}>
          {steps[1]?.statusText}
        </Tag>
      </div>
      <div className='detail-manager-download-box'>
        <div className='manager-download-upload-button-box'>
          {enterpriseUrl ? (
            <a href={enterpriseUrl} target='_blank' rel='noopener noreferrer'>
              <Button type='primary' icon='download'>
                下载文件
              </Button>
            </a>
          ) : (
            <Button disabled>请等待</Button>
          )}
        </div>
        <div className='manager-download-button-box'>
          <Button
            disabled={steps[1]?.status !== 3}
            type='primary'
            htmlType='submit'
            className={steps[1]?.status === 3 ? 'fail-button' : ''}
            loading={statusLoading}
            onClick={handleSetFailStatus}
          >
            审核不通过
          </Button>
          <Button
            disabled={steps[1]?.status !== 3}
            type='primary'
            htmlType='submit'
            className={steps[1]?.status === 3 ? 'success-button' : ''}
            loading={statusLoading}
            onClick={handleSetSuccessStatus}
          >
            审核通过
          </Button>
        </div>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength='100'
          placeholder='请输入审核不通过理由'
          className='manager-download-textArea-box'
          onChange={e => {
            setManagerFailText(e.target.value);
          }}
        />
      </div>
    </>
  );
};
