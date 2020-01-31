import React, { useEffect, useState } from 'react';

// 样式
import { Timeline, Icon, Skeleton, Tag, Button } from 'antd';

// 路由
import { HOME_REGISTRATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 请求
import {
  QUERY_SYS_REGISTRATION_STEP,
  SELECT_REGISTRATION_STATUS,
  PUSH_REGISTRATION_PROCESS
} from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const { steps, enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [sysRegistrationStepList, setSysRegistrationStepList] = useState([]),
    [loading, setLoading] = useState(true),
    [
      enterpriseRegistrationContractStatus,
      setEnterpriseRegistrationContractStatus
    ] = useState(null),
    [
      enterpriseRegistrationApplyStatus,
      setEnterpriseRegistrationApplyStatus
    ] = useState(null),
    [
      enterpriseRegistrationCopyrightStatus,
      setEnterpriseRegistrationCopyrightStatus
    ] = useState(null),
    [
      enterpriseRegistrationDocumentStatus,
      setEnterpriseRegistrationDocumentStatus
    ] = useState(null),
    [
      enterpriseRegistrationProductDescriptionStatus,
      setEnterpriseRegistrationProductDescriptionStatus
    ] = useState(null),
    [
      enterpriseRegistrationProductStatus,
      setEnterpriseRegistrationProductStatus
    ] = useState(null),
    [
      enterpriseRegistrationSpecimenStatus,
      setEnterpriseRegistrationSpecimenStatus
    ] = useState(null),
    [
      enterpriseRegistrationBasicStatus,
      setEnterpriseRegistrationBasicStatus
    ] = useState(null),
    [pushProcessLoading, setPushProcessLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const sysRegistrationStepList = await proxyFetch(
        QUERY_SYS_REGISTRATION_STEP,
        {},
        'GET'
      );

      setSysRegistrationStepList(sysRegistrationStepList);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setLoading(true);
        const res = await proxyFetch(
          SELECT_REGISTRATION_STATUS,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setEnterpriseRegistrationApplyStatus(
          res.enterpriseRegistrationApplyStatus
        );
        setEnterpriseRegistrationContractStatus(
          res.enterpriseRegistrationContractStatus
        );
        setEnterpriseRegistrationCopyrightStatus(
          res.enterpriseRegistrationCopyrightStatus
        );
        setEnterpriseRegistrationDocumentStatus(
          res.enterpriseRegistrationDocumentStatus
        );
        setEnterpriseRegistrationProductDescriptionStatus(
          res.enterpriseRegistrationProductDescriptionStatus
        );
        setEnterpriseRegistrationProductStatus(
          res.enterpriseRegistrationProductStatus
        );
        setEnterpriseRegistrationSpecimenStatus(
          res.enterpriseRegistrationSpecimenStatus
        );
        setEnterpriseRegistrationBasicStatus(
          res.enterpriseRegistrationBasicStatus
        );
        setLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  const statusToColor = status => {
    let color = '';

    switch (status) {
      case 1:
        color = 'grey';
        break;
      case 2:
        color = 'blue';
        break;
      case 3:
        color = 'green';
        break;
      case 4:
        color = 'red';
        break;
      default:
        color = 'blue';
    }
    return color;
  };

  const handlePushProcess = () => {
    (async () => {
      setPushProcessLoading(true);
      await proxyFetch(PUSH_REGISTRATION_PROCESS, {
        registrationUuid: enterpriseRegistrationUuid
      });

      setPushProcessLoading(false);
    })();
  };

  return (
    <div className='item-box profile-left-box'>
      <p className='title-box'>
        <span>项目审核</span>
      </p>
      <Skeleton loading={loading}>
        {sysRegistrationStepList.length && steps.length ? (
          <Timeline mode='alternate'>
            <Timeline.Item color={statusToColor(steps[0].status)}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='file-zip'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[0].name}
                    <Tag
                      className='title-tag'
                      color={statusToColor(steps[0].status)}
                    >
                      {steps[0].statusText}
                    </Tag>
                  </div>
                  <p className='text-sub-title'>
                    检查8种材料信息,是否完整,是否符合要求
                  </p>
                  <div className='text-content-box'>
                    {enterpriseRegistrationBasicStatus ? (
                      <div className='text-content-link'>
                        <Link to={`${HOME_REGISTRATION_DETAIL.path}/basic`}>
                          <span>登记测试基本信息</span>
                        </Link>
                        <Tag
                          className='content-tag'
                          color={statusToColor(
                            enterpriseRegistrationBasicStatus.status
                          )}
                        >
                          {enterpriseRegistrationBasicStatus.statusText}
                        </Tag>
                      </div>
                    ) : null}
                    {enterpriseRegistrationContractStatus ? (
                      <div className='text-content-link'>
                        <Link to={`${HOME_REGISTRATION_DETAIL.path}/contract`}>
                          <span>评测合同</span>
                        </Link>
                        <Tag
                          className='content-tag'
                          color={statusToColor(
                            enterpriseRegistrationContractStatus.status
                          )}
                        >
                          {enterpriseRegistrationContractStatus.statusText}
                        </Tag>
                      </div>
                    ) : null}
                    {enterpriseRegistrationCopyrightStatus ? (
                      <div className='text-content-link'>
                        <Link to={`${HOME_REGISTRATION_DETAIL.path}/copyright`}>
                          <span>软件著作权证书</span>
                        </Link>
                        <Tag
                          className='content-tag'
                          color={statusToColor(
                            enterpriseRegistrationCopyrightStatus.status
                          )}
                        >
                          {enterpriseRegistrationCopyrightStatus.statusText}
                        </Tag>
                      </div>
                    ) : null}
                    {enterpriseRegistrationSpecimenStatus ? (
                      <div className='text-content-link'>
                        <Link to={`${HOME_REGISTRATION_DETAIL.path}/specimen`}>
                          <span>样品登记表</span>
                        </Link>
                        <Tag
                          className='content-tag'
                          color={statusToColor(
                            enterpriseRegistrationSpecimenStatus.status
                          )}
                        >
                          {enterpriseRegistrationSpecimenStatus.statusText}
                        </Tag>
                      </div>
                    ) : null}
                    {enterpriseRegistrationProductDescriptionStatus ? (
                      <div className='text-content-link'>
                        <Link
                          to={`${HOME_REGISTRATION_DETAIL.path}/productDescription`}
                        >
                          <span>产品说明</span>
                        </Link>
                        <Tag
                          className='content-tag'
                          color={statusToColor(
                            enterpriseRegistrationProductDescriptionStatus.status
                          )}
                        >
                          {
                            enterpriseRegistrationProductDescriptionStatus.statusText
                          }
                        </Tag>
                      </div>
                    ) : null}
                    {enterpriseRegistrationDocumentStatus ? (
                      <div className='text-content-link'>
                        <Link to={`${HOME_REGISTRATION_DETAIL.path}/document`}>
                          <span>用户文档集</span>
                        </Link>
                        <Tag
                          className='content-tag'
                          color={statusToColor(
                            enterpriseRegistrationDocumentStatus.status
                          )}
                        >
                          {enterpriseRegistrationDocumentStatus.statusText}
                        </Tag>
                      </div>
                    ) : null}
                    {enterpriseRegistrationProductStatus ? (
                      <div className='text-content-link'>
                        <Link to={`${HOME_REGISTRATION_DETAIL.path}/product`}>
                          <span>产品介质</span>
                        </Link>
                        <Tag
                          className='content-tag'
                          color={statusToColor(
                            enterpriseRegistrationProductStatus.status
                          )}
                        >
                          {enterpriseRegistrationProductStatus.statusText}
                        </Tag>
                      </div>
                    ) : null}
                    {enterpriseRegistrationApplyStatus ? (
                      <div className='text-content-link'>
                        <Link to={`${HOME_REGISTRATION_DETAIL.path}/apply`}>
                          <span>现场测试申请表</span>
                        </Link>
                        <Tag
                          className='content-tag'
                          color={statusToColor(
                            enterpriseRegistrationApplyStatus.status
                          )}
                        >
                          {enterpriseRegistrationApplyStatus.statusText}
                        </Tag>
                      </div>
                    ) : null}
                  </div>
                  {enterpriseRegistrationContractStatus &&
                  enterpriseRegistrationApplyStatus &&
                  enterpriseRegistrationCopyrightStatus &&
                  enterpriseRegistrationDocumentStatus &&
                  enterpriseRegistrationProductDescriptionStatus &&
                  enterpriseRegistrationProductStatus &&
                  enterpriseRegistrationSpecimenStatus &&
                  enterpriseRegistrationBasicStatus ? (
                    <Button
                      disabled={
                        !(
                          enterpriseRegistrationContractStatus.status === 3 &&
                          enterpriseRegistrationApplyStatus.status === 3 &&
                          enterpriseRegistrationCopyrightStatus.status === 3 &&
                          enterpriseRegistrationDocumentStatus.status === 3 &&
                          enterpriseRegistrationProductDescriptionStatus.status ===
                            3 &&
                          enterpriseRegistrationProductStatus.status === 3 &&
                          enterpriseRegistrationSpecimenStatus.status === 3 &&
                          enterpriseRegistrationBasicStatus.status === 3
                        )
                      }
                      size='large'
                      onClick={handlePushProcess}
                      loading={pushProcessLoading}
                    >
                      提交上传8种材料审查完成开始电子签合同
                    </Button>
                  ) : null}
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={statusToColor(steps[1].status)}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='profile'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[1].name}
                    <Tag
                      className='title-tag'
                      color={statusToColor(steps[1].status)}
                    >
                      {steps[1].statusText}
                    </Tag>
                  </div>
                  <div className='item-detail-box'>
                    <p>甲乙双方电子签合同</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={statusToColor(steps[2].status)}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='credit-card'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[2].name}
                    <Tag
                      className='title-tag'
                      color={statusToColor(steps[2].status)}
                    >
                      {steps[2].statusText}
                    </Tag>
                  </div>
                  <div className='item-detail-box'>
                    <p>项目测试委托方交付汇款</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={statusToColor(steps[3].status)}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='bug'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[3].name}
                    <Tag
                      className='title-tag'
                      color={statusToColor(steps[3].status)}
                    >
                      {steps[3].statusText}
                    </Tag>
                  </div>
                  <div className='item-detail-box'>
                    <p>对委托方提供的软件进行测试</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={statusToColor(steps[4].status)}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='file-text'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[4].name}
                    <Tag
                      className='title-tag'
                      color={statusToColor(steps[4].status)}
                    >
                      {steps[4].statusText}
                    </Tag>
                  </div>
                  <div className='item-detail-box'>
                    <p>发送原始记录和测试报告</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
          </Timeline>
        ) : null}
      </Skeleton>
    </div>
  );
};
