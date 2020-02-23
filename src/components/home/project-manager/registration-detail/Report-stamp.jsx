import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  UPLOAD_PDF_FILE,
  GET_FILE_URL,
  SELECT_PROJECT_MANAGER_REGISTRATION_REPORT,
  SAVE_REPORT_FINAL_URL
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 样式
import '@/style/home/project-manager/report-stamp.styl';
import { Button, Timeline, Skeleton, Upload, message, Icon, Alert } from 'antd';

export default prop => {
  const { steps, enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [reportManagerLoading, setReportManagerLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [reportPreviewUrl, setReportPreviewUrl] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [reportUrl, setReportUrl] = useState(''),
    [finalUrl, setFinalUrl] = useState(''),
    [downloadReportLoading, setDownloadReportLoading] = useState(false),
    history = useHistory(),
    dispatch = useDispatch();

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let report = await proxyFetch(
          SELECT_PROJECT_MANAGER_REGISTRATION_REPORT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (report && report.finalUrl) {
          setFinalUrl(report.finalUrl);
          setIsNeedUrlFresh(true);
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  /**
   * 上传pdf文件
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async file => {
    if (handleBeforeUpload(file)) {
      // loading
      setReportManagerLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_PDF_FILE, {
        file: file.file,
        folderName: 'registration/managerReport'
      });

      // loading
      setReportManagerLoading(false);

      if (fileUrl) {
        setFinalUrl(fileUrl);
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (finalUrl && isNeedUrlFresh) {
      (async () => {
        setReportManagerLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: finalUrl },
          'GET'
        );

        setReportManagerLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [finalUrl, isNeedUrlFresh]);

  /**
   * 提交事件
   */
  const handleManagerUrlSave = async () => {
    if (enterpriseRegistrationUuid && finalUrl) {
      let value = {};
      value.registrationUuid = enterpriseRegistrationUuid;
      value.finalUrl = finalUrl;

      setSaveDataLoading(true);
      const res = await proxyFetch(SAVE_REPORT_FINAL_URL, value);
      setSaveDataLoading(false);

      if (res) {
        dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));
        history.push(HOME_REGISTRATION_PROFILE.path);
      }
    }
  };

  // 回显原始记录word
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setDownloadReportLoading(true);

        let report = await proxyFetch(
          SELECT_PROJECT_MANAGER_REGISTRATION_REPORT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setReportUrl(report.url);
        setDownloadReportLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  useEffect(() => {
    if (reportUrl) {
      (async () => {
        setDownloadReportLoading(true);
        const reportPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: reportUrl },
          'GET'
        );

        setReportPreviewUrl(reportPreviewUrl);
        setDownloadReportLoading(false);
      })();
    }
  }, [reportUrl]);

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>生成合同下载,盖章扫描,上传pdf</p>
      </div>
      <div className='detail-report-download-box'>
        <Skeleton loading={getDataLoading}>
          <div className='report-download-left-box'>
            <Timeline>
              <Timeline.Item>
                {reportUrl ? (
                  <a href={reportPreviewUrl}>
                    <Button
                      type='primary'
                      icon='download'
                      size='large'
                      className='button'
                      loading={downloadReportLoading}
                    >
                      下载原始记录word文件
                    </Button>
                  </a>
                ) : (
                  <Button disabled>企业未上传</Button>
                )}
              </Timeline.Item>
              <Timeline.Item>
                <span>盖章扫描</span>
              </Timeline.Item>
              <Timeline.Item>
                <Upload showUploadList={false} customRequest={handleUploadFile}>
                  {previewUrl && !reportManagerLoading ? (
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
                      loading={reportManagerLoading}
                    >
                      点击文件上传pdf
                      <Icon type='inbox' />
                    </Button>
                  )}
                </Upload>
              </Timeline.Item>
              <Timeline.Item>
                <Button
                  disabled={steps[3].status < 4 || steps[4].status === 100}
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
          <div className='report-download-right-box'>
            <Alert
              message='甲方生成合同下载,盖章扫描,上传pdf注意事项'
              description='根据甲乙双方填写的合同内容生成合同,点击下载按钮,盖章扫描后上传pdf文件。'
              type='info'
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
