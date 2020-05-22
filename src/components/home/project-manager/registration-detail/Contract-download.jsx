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
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 样式
import '@/style/home/project-manager/contract-download.styl';
import {
  Button,
  Timeline,
  Skeleton,
  Upload,
  message,
  Icon,
  Alert,
  Form,
} from 'antd';

export default Form.create({ name: 'contractManager' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    { steps, enterpriseRegistrationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [contractManagerLoading, setContractManagerLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [enterpriseUrl, setEnterpriseUrl] = useState(''),
    [contractEnterpriseUrl, setContractEnterpriseUrl] = useState(''),
    history = useHistory(),
    dispatch = useDispatch(),
    formManagerUrl =
      getFieldValue('managerUrl') && getFieldValue('managerUrl')[0];

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
        if (managerContract?.managerUrl) {
          setFieldsValue({
            managerUrl: [managerContract.managerUrl],
          });
          setIsNeedUrlFresh(true);
        }

        if (managerContract && managerContract.enterpriseUrl) {
          // 数据处理
          setContractEnterpriseUrl(managerContract.enterpriseUrl);
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, setFieldsValue, contractEnterpriseUrl]);

  /**
   * 上传pdf文件
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async (file) => {
    if (handleBeforeUpload(file)) {
      // loading
      setContractManagerLoading(true);

      // 参数需要加上oss的文件夹位置
      // TODO 以后把这个改成后台输入的路由把
      const fileUrl = await proxyFileFetch(UPLOAD_PDF_FILE, {
        file: file.file,
        folderName: 'registration/managerContract',
      });

      // loading
      setContractManagerLoading(false);

      if (fileUrl) {
        setFieldsValue({ managerUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (formManagerUrl && isNeedUrlFresh) {
      (async () => {
        setContractManagerLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formManagerUrl },
          'GET'
        );

        setContractManagerLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [formManagerUrl, isNeedUrlFresh]);

  /**
   * 提交事件
   */
  const handleManagerUrlSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (enterpriseRegistrationUuid) {
        if (!err) {
          value.registrationUuid = enterpriseRegistrationUuid;
          value.managerUrl = value.managerUrl[0];
          setSaveDataLoading(true);
          const res = await proxyFetch(SAVE_MANAGER_CONTRACT_URL, value);
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

  // const handleDownloadContractWord = async () => {
  //   setDownloadContractLoading(true);

  //   const url = await proxyFetch(
  //     DOWNLOAD_CONTRACT_WORD,
  //     { registrationUuid: enterpriseRegistrationUuid },
  //     'GET'
  //   );

  //   if (url) {
  //     window.open(url);
  //   }

  //   setDownloadContractLoading(false);
  // };

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
                {enterpriseUrl ? (
                  <a
                    href={enterpriseUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button
                      type='primary'
                      size='large'
                      icon='download'
                      className='button'
                    >
                      下载文件
                    </Button>
                  </a>
                ) : (
                  <Button disabled>请等待</Button>
                )}
              </Timeline.Item>
              <Timeline.Item>
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  onSubmit={handleManagerUrlSave}
                >
                  <Form.Item>
                    {getFieldDecorator('managerUrl', {
                      valuePropName: 'fileList',
                      getValueFromEvent: (e) => {
                        return e && e.fileList;
                      },
                      rules: [
                        {
                          required: true,
                          message: '请上传合同PDF文件！',
                        },
                      ],
                    })(
                      <Upload
                        showUploadList={false}
                        customRequest={handleUploadFile}
                        htmlType='button'
                      >
                        {previewUrl && !contractManagerLoading ? (
                          <div>
                            <a
                              href={previewUrl}
                              onClick={(e) => e.stopPropagation()}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <Button
                                size='large'
                                className='half-button'
                                htmlType='button'
                              >
                                查看上传
                              </Button>
                            </a>
                            <Button
                              size='large'
                              className='half-button'
                              htmlType='button'
                            >
                              重新上传
                            </Button>
                          </div>
                        ) : (
                          <Button
                            htmlType='button'
                            size='large'
                            className='button'
                            loading={contractManagerLoading}
                          >
                            点击上传盖章的pdf
                            <Icon type='inbox' />
                          </Button>
                        )}
                      </Upload>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      disabled={
                        steps[1]?.status < 2 || steps[1]?.status === 100
                      }
                      type='primary'
                      htmlType='submit'
                      size='large'
                      className='button'
                      loading={saveDataLoading}
                      onClick={handleManagerUrlSave}
                    >
                      提交
                    </Button>
                  </Form.Item>
                </Form>
              </Timeline.Item>
            </Timeline>
          </div>
          <div className='contract-download-right-box'>
            <Alert
              message='甲方生成合同下载,盖章扫描,上传pdf注意事项'
              description='根据甲乙双方填写的合同内容生成合同,点击下载按钮,盖章扫描后上传pdf文件,最后点击提交按钮。'
              type='info'
            />
          </div>
        </Skeleton>
      </div>
    </>
  );
});

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
