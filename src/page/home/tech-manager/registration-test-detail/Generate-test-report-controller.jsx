import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { HOME_REGISTRATION_TEST_PROFILE } from '@/constants/route-constants';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  GENERATE_REPORT_WORD,
  UPLOAD_WORD_FILE,
  SELECT_TECH_REGISTRATION_REPORT,
  GET_FILE_URL,
  SAVE_TECH_REGISTRATION_REPORT
} from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import '@/style/home/tech-manager/generate-test-report.styl';
import {
  Button,
  Timeline,
  Upload,
  Icon,
  Alert,
  Input,
  Form,
  message,
  Skeleton
} from 'antd';

export default Form.create({ name: 'report' })(({ form }) => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    [downloadReportLoading, setDownloadReportLoading] = useState(false),
    [getDataLoading, setGetDataLoading] = useState(true),
    [previewUrl, setPreviewUrl] = useState(''),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [failText, setFailText] = useState(''),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [reportLoading, setReportLoading] = useState(false),
    history = useHistory();

  const formUrl = getFieldValue('url') && getFieldValue('url')[0];

  const handleDownloadReportWord = async () => {
    setDownloadReportLoading(true);

    const url = await proxyFetch(
      GENERATE_REPORT_WORD,
      { registrationUuid: enterpriseRegistrationUuid },
      'GET'
    );

    window.open(url);
    setDownloadReportLoading(false);
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let report = await proxyFetch(
          SELECT_TECH_REGISTRATION_REPORT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (report) {
          setFailText(report?.failText);

          delete report.failText;
          setFieldsValue(report);
          if (report?.url) {
            setFieldsValue({ url: [report.url] });
            setIsNeedUrlFresh(true);
          }
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, setFieldsValue]);

  /**
   * 上传pdf文件
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async file => {
    if (handleBeforeUpload(file)) {
      // loading
      setReportLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_WORD_FILE, {
        file: file.file,
        folderName: 'registration/report'
      });

      // loading
      setReportLoading(false);

      if (fileUrl) {
        setFieldsValue({ url: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (formUrl && isNeedUrlFresh) {
      (async () => {
        setReportLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formUrl },
          'GET'
        );

        setReportLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [formUrl, isNeedUrlFresh]);

  /**
   * 提交事件
   */
  const handleReportSave = e => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (enterpriseRegistrationUuid) {
        if (!err) {
          value.registrationUuid = enterpriseRegistrationUuid;
          value.url = value.url[0];

          setSaveDataLoading(true);
          const res = await proxyFetch(SAVE_TECH_REGISTRATION_REPORT, value);
          setSaveDataLoading(false);

          if (res) {
            history.push(`${HOME_REGISTRATION_TEST_PROFILE.path}`);
          }
        }
      }
    });
  };

  return (
    <div className='item-box generate-test-report-box'>
      <p className='title-box'>
        <span>技术人员生成报告</span>
      </p>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_TEST_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>生成报告</p>
      </div>
      {failText ? (
        <Alert
          message='填写错误,请按描述修改'
          description={failText}
          type='error'
        />
      ) : null}
      <div className='generate-report-upload-box'>
        <Skeleton loading={getDataLoading}>
          <div className='report-left-box'>
            <Timeline>
              <Timeline.Item>
                <Button
                  icon='download'
                  size='large'
                  className='button'
                  type='primary'
                  loading={downloadReportLoading}
                  onClick={handleDownloadReportWord}
                >
                  生成报告模板
                </Button>
              </Timeline.Item>
              <Timeline.Item>
                {/* 原始记录总页数 */}
                <Form onSubmit={handleReportSave}>
                  <Form.Item>
                    {getFieldDecorator('totalPage', {
                      rules: [
                        { required: true, message: '请输入现场报告总页数' },
                        {
                          pattern: /^[1-9]\d{0,2}$/,
                          message: '请输入正确的页数,须在1-999之间'
                        }
                      ]
                    })(
                      <Input
                        placeholder='请输入报告总页数'
                        size='large'
                        type='number'
                        className='input'
                        style={{ textAlign: 'center' }}
                        maxLength={32}
                        addonAfter={<span>页</span>}
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('url', {
                      valuePropName: 'fileList',
                      getValueFromEvent: e => {
                        return e && e.fileList;
                      },
                      rules: [
                        {
                          required: true,
                          message: '请上传原始记录word文件！'
                        }
                      ]
                    })(
                      <Upload
                        showUploadList={false}
                        customRequest={handleUploadFile}
                        htmlType='button'
                      >
                        {previewUrl && !reportLoading ? (
                          <div>
                            <a
                              href={previewUrl}
                              onClick={e => e.stopPropagation()}
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
                            loading={reportLoading}
                          >
                            点击文件上传word
                            <Icon type='inbox' />
                          </Button>
                        )}
                      </Upload>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='button'
                      size='large'
                      loading={saveDataLoading}
                    >
                      提交
                    </Button>
                  </Form.Item>
                </Form>
              </Timeline.Item>
            </Timeline>
          </div>
          <div className='report-right-box'>
            <Alert
              message='生成报告注意事项'
              description='请技术人员点击上方生成报告模板按钮下载报告模板,填写报告总页数并上传最终报告word文件,格式必须为doc,docx,确认无误后点击下方提交按钮。'
              type='info'
            />
          </div>
        </Skeleton>
      </div>
    </div>
  );
});

const handleBeforeUpload = ({ file }) => {
  // 后缀名
  const extensionName = file.name.split('.')[1].toLowerCase();

  // 判断后缀名是否非法
  if (extensionName !== 'doc' && extensionName !== 'docx') {
    message.error('文件类型必须为doc或docx');
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
