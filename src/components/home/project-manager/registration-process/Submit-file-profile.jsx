import React, { useState, useEffect } from 'react';

// 工具
import statusToColor from '@/components/home/project-manager/registration-detail/util/status-to-color';

// 请求
import { SELECT_REGISTRATION_STATUS } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 路由
import { HOME_REGISTRATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Tag, Icon, Skeleton } from 'antd';

export default props => {
  const {
      steps,
      enterpriseRegistrationUuid,
      sysRegistrationStep,
      registration
    } = useSelector(state => state.enterpriseStore),
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
    [loading, setLoading] = useState(true),
    [isCurrentStep, setIsCurrentStep] = useState(false);

  useEffect(() => {
    if (registration?.currentStep === 1) {
      setIsCurrentStep(true);
    }
  }, [registration]);

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

  return (
    <div className='left-item-box'>
      <Icon
        className='item-icon-box'
        type='file-zip'
        theme='twoTone'
        twoToneColor='#334454'
      />
      <Skeleton loading={loading}>
        {sysRegistrationStep.length ? (
          <div className='item-text-box'>
            <div className='text-top-box'>
              {sysRegistrationStep[0].name}
              <Tag className='title-tag' color={steps[0].color}>
                {steps[0].statusText}
              </Tag>
            </div>
            <p className='text-subtitle'>
              检查8种材料信息,是否完整,是否符合要求
            </p>
            <div className='text-content-box'>
              {enterpriseRegistrationBasicStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/basic`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
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
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/contract`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
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
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/copyright`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
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
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/specimen`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
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
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>产品说明</span>
                  </Link>
                  <Tag
                    className='content-tag'
                    color={statusToColor(
                      enterpriseRegistrationProductDescriptionStatus.status
                    )}
                  >
                    {enterpriseRegistrationProductDescriptionStatus.statusText}
                  </Tag>
                </div>
              ) : null}
              {enterpriseRegistrationDocumentStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/document`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
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
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/product`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
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
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/apply`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
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
          </div>
        ) : null}
      </Skeleton>
    </div>
  );
};
