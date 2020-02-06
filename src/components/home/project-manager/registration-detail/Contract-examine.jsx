import React, { useEffect, useState } from 'react';

// 路由
import { Link } from 'react-router-dom';
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';

// 样式
import '@/style/home/project-manager/contract-examine.styl';

// redux
import { useSelector } from 'react-redux';

//路由
import { useHistory } from 'react-router-dom';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  SELECT_ENTERPRISE_CONTRACT_URL,
  SET_CONTRACT_MANAGER_STATUS,
  SELECT_REGISTRATION_CONTRACT_MANAGER
} from '@/constants/api-constants';

//样式
import { Button, Input, Icon, Tag, message } from 'antd';
const { TextArea } = Input;

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [enterpriseUrl, setEnterpriseUrl] = useState(''),
    [contractEnterpriseUrl, setContractEnterpriseUrl] = useState(''),
    [managerStatus, setManagerStatus] = useState(0),
    [statusLoading, setStatusLoading] = useState(false),
    [failText, setFailText] = useState(''),
    history = useHistory();

  // 查找乙方上传url
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let enterpriseContract = await proxyFetch(
          SELECT_ENTERPRISE_CONTRACT_URL,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (enterpriseContract && enterpriseContract.enterpriseUrl) {
          // 数据处理
          setContractEnterpriseUrl(enterpriseContract.enterpriseUrl);
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

  const statusToColor = managerStatus => {
    let color = '';

    switch (managerStatus) {
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

  const statusToText = managerStatus => {
    let color = '';

    switch (managerStatus) {
      case 4:
        color = '待审核';
        break;
      case 5:
        color = '审核通过';
        break;
      case 6:
        color = '审核未通过';
        break;
      default:
        color = '待审核';
    }
    return color;
  };

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_CONTRACT_MANAGER_STATUS, {
        registrationUuid: enterpriseRegistrationUuid,
        managerStatus: 5
      });

      setStatusLoading(false);
      history.push(HOME_REGISTRATION_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failText) {
      (async () => {
        setStatusLoading(true);

        await proxyFetch(SET_CONTRACT_MANAGER_STATUS, {
          registrationUuid: enterpriseRegistrationUuid,
          managerStatus: 6,
          failText
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
        let contractList = await proxyFetch(
          SELECT_REGISTRATION_CONTRACT_MANAGER,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (contractList) {
          setManagerStatus(contractList.managerStatus);
        }

        console.log('contractList=', contractList);
      })();
    }
  }, [enterpriseRegistrationUuid, managerStatus]);

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>审查,进入下一步</p>
        <Tag className='content-tag' color={statusToColor(managerStatus)}>
          {statusToText(managerStatus)}
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
            disabled={!(managerStatus === 4)}
            type='primary'
            htmlType='submit'
            className={managerStatus === 4 ? 'fail-button' : ''}
            loading={statusLoading}
            onClick={handleSetFailStatus}
          >
            审核不通过
          </Button>
          <Button
            disabled={!(managerStatus === 4)}
            type='primary'
            htmlType='submit'
            className={managerStatus === 4 ? 'success-button' : ''}
            loading={statusLoading}
            onClick={handleSetSuccessStatus}
          >
            审核通过
          </Button>
        </div>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength='800'
          placeholder='请输入审核不通过理由'
          className='manager-download-textArea-box'
          onChange={e => {
            setFailText(e.target.value);
          }}
        />
      </div>
    </>
  );
};
