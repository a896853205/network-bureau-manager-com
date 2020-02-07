import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  UPLOAD_PDF_FILE,
  GET_FILE_URL,
  SELECT_REGISTRATION_CONTRACT_MANAGER,
  SAVE_MANAGER_CONTRACT_URL,
  DOWNLOAD_CONTRACT_WORD
} from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import '@/style/home/project-manager/contract-download.styl';
import { Button, Timeline, Skeleton, Upload, message, Icon, Alert } from 'antd';

export default prop => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [contractManagerLoading, setContractManagerLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [managerStatus, setManagerStatus] = useState([]),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [contractManagerUrl, setContractManagerUrl] = useState(''),
    [downloadContractLoading, setDownloadContractLoading] = useState(false),
    history = useHistory();

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let managerContract = await proxyFetch(
          SELECT_REGISTRATION_CONTRACT_MANAGER,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (managerContract && managerContract.managerUrl) {
          // 数据处理
          setContractManagerUrl(managerContract.managerUrl);
          setManagerStatus(managerContract.managerStatus);
          setIsNeedUrlFresh(true);
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, contractManagerUrl]);

  /**
   * 上传pdf文件
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async file => {
    if (handleBeforeUpload(file)) {
      // loading
      setContractManagerLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_PDF_FILE, {
        file: file.file,
        folderName: 'registration/managerContract'
      });

      // loading
      setContractManagerLoading(false);

      if (fileUrl) {
        setContractManagerUrl(fileUrl);
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (contractManagerUrl && isNeedUrlFresh) {
      (async () => {
        setContractManagerLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: contractManagerUrl },
          'GET'
        );

        setContractManagerLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [contractManagerUrl, isNeedUrlFresh]);

  /**
   * 提交事件
   */
  const handleManagerUrlSave = async () => {
    if (enterpriseRegistrationUuid && contractManagerUrl) {
      let value = {};
      value.registrationUuid = enterpriseRegistrationUuid;
      value.managerUrl = contractManagerUrl;

      setSaveDataLoading(true);
      const res = await proxyFetch(SAVE_MANAGER_CONTRACT_URL, value);
      setSaveDataLoading(false);

      if (res) {
        history.push(HOME_REGISTRATION_PROFILE.path);
      }
    }
  };

  const handleDownloadContractWord = async () => {
    setDownloadContractLoading(true);

    const url = await proxyFetch(
      DOWNLOAD_CONTRACT_WORD,
      { registrationUuid: enterpriseRegistrationUuid },
      'GET'
    );

    window.open(url);
    setDownloadContractLoading(false);
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>生成合同下载,盖章扫描,上传pdf</p>
      </div>
      <div className='detail-contract-download-box'>
        <Skeleton loading={getDataLoading}>
          <div className='contract-download-left-box'>
            <Timeline>
              <Timeline.Item>
                <Button
                  icon='download'
                  size='large'
                  className='button'
                  type='primary'
                  loading={downloadContractLoading}
                  onClick={handleDownloadContractWord}
                >
                  生成合同下载
                </Button>
              </Timeline.Item>
              <Timeline.Item>
                <span>盖章扫描</span>
              </Timeline.Item>
              <Timeline.Item>
                <Upload showUploadList={false} customRequest={handleUploadFile}>
                  {previewUrl && !contractManagerLoading ? (
                    <div>
                      <a
                        href={previewUrl}
                        onClick={e => e.stopPropagation()}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Button size='large' className='half-button'>
                          查看上传
                        </Button>
                      </a>
                      <Button size='large' className='half-button'>
                        重新上传
                      </Button>
                    </div>
                  ) : (
                    <Button
                      htmlType='submit'
                      size='large'
                      className='button'
                      loading={contractManagerLoading}
                    >
                      点击文件上传pdf
                      <Icon type='inbox' />
                    </Button>
                  )}
                </Upload>
              </Timeline.Item>
              <Timeline.Item>
                <Button
                  disabled={!managerStatus || managerStatus === 5}
                  type='primary'
                  htmlType='submit'
                  size='large'
                  className='button'
                  loading={saveDataLoading}
                  onClick={handleManagerUrlSave}
                >
                  提交
                </Button>
              </Timeline.Item>
            </Timeline>
          </div>
          <div className='contract-download-right-box'>
            <Alert
              message='甲方生成合同下载,盖章扫描,上传pdf注意事项'
              description='根据甲乙双方填写的合同内容生成合同,点击下载按钮,盖章扫描后上传pdf文件。'
              type='info'
              showIcon
            />
          </div>
        </Skeleton>
      </div>
    </>
  );
};

const handleBeforeUpload = ({ file }) => {
  // 后缀名
  const extensionName = file.name.split('.')[1].toLowerCase();

  // 判断后缀名是否非法
  if (extensionName !== 'pdf') {
    message.error('文件类型必须为pdf');
    return false;
  }

  // 判断大小是否符合
  if (file.size > 1024 * 1024 * 10) {
    // 10MB
    message.error('文件大小必须小于10MB');
    return false;
  }

  return true;
};
