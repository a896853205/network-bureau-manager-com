import React, { useState } from 'react';

// 路由
import { Link } from 'react-router-dom';
import { HOME_REGISTRATION_TEST_PROFILE } from '@/constants/route-constants';

// 请求
import proxyFetch from '@/util/request';
import { GENERATE_RECORD_WORD } from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import '@/style/home/tech-manager/generate-test-record.styl';
import { Button, Timeline, Upload, Icon, Alert, Input, Form } from 'antd';

export default Form.create({ name: 'record' })(({ form }) => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    { getFieldDecorator } = form,
    [downloadRecordLoading, setDownloadRecordLoading] = useState(false);

  const handleDownloadReportWord = async () => {
    setDownloadRecordLoading(true);

    const url = await proxyFetch(
      GENERATE_RECORD_WORD,
      { registrationUuid: enterpriseRegistrationUuid },
      'GET'
    );

    window.open(url);
    setDownloadRecordLoading(false);
  };
  
  return (
    <div className='item-box generate-test-record-box'>
      <p className='title-box'>
        <span>技术人员生成原始记录</span>
      </p>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_TEST_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>生成原始记录</p>
      </div>
      <div className='generate-record-upload-box'>
        <div className='record-left-box'>
          <Timeline>
            <Timeline.Item>
              <Button
                icon='download'
                size='large'
                className='button'
                type='primary'
                loading={downloadRecordLoading}
                onClick={handleDownloadReportWord}
              >
                生成原始记录模板
              </Button>
            </Timeline.Item>
            <Timeline.Item>
              {/* 原始记录总页数 */}
              <Form>
                <Form.Item>
                  {getFieldDecorator('pagination', {
                    rules: [{ required: true }]
                  })(
                    <Input
                      placeholder='请输入原始记录总页数'
                      size='large'
                      className='input'
                      maxLength={32}
                    />
                  )}
                </Form.Item>
                {/* 查看上传 */}
                <Upload>
                  {1 ? (
                    <div>
                      <Button size='large' className='half-button'>
                        查看上传
                      </Button>
                      <Button size='large' className='half-button'>
                        重新上传
                      </Button>
                    </div>
                  ) : (
                    <Button htmlType='submit' size='large' className='button'>
                      点击上传原始记录word
                      <Icon type='inbox' />
                    </Button>
                  )}
                </Upload>
                {/* 提交按钮 */}
                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='button'
                    size='large'
                  >
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </Timeline.Item>
          </Timeline>
        </div>
        <div className='record-right-box'>
          <Alert
            message='生成原始记录注意事项'
            description='请技术人员点击上方生成原始记录模板按钮下载原始记录模板,填写原始记录总页数并上传最终原始记录word文件,格式必须为doc,docx,确认无误后点击下方提交按钮。'
            type='info'
          />
        </div>
      </div>
    </div>
  );
});
