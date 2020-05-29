import React, { useState, useEffect } from 'react';

// 工具
import statusToColor from '@/components/home/project-manager/delegation-detail/util/status-to-color';

// 请求
import { SELECT_DELEGATION_STATUS } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 路由
import { HOME_DELEGATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Tag, Icon, Skeleton } from 'antd';

export default (props) => {
  const {
      delegationSteps,
      enterpriseDelegationUuid,
      sysDelegationStep,
      delegation,
    } = useSelector((state) => state.enterpriseStore),
    [
      enterpriseDelegationContractStatus,
      setEnterpriseDelegationContractStatus,
    ] = useState(null),
    [
      enterpriseDelegationApplyStatus,
      setEnterpriseDelegationApplyStatus,
    ] = useState(null),
    [
      enterpriseDelegationCopyrightStatus,
      setEnterpriseDelegationCopyrightStatus,
    ] = useState(null),
    [
      enterpriseDelegationDocumentStatus,
      setEnterpriseDelegationDocumentStatus,
    ] = useState(null),
    [
      enterpriseDelegationProductDescriptionStatus,
      setEnterpriseDelegationProductDescriptionStatus,
    ] = useState(null),
    [
      enterpriseDelegationProductStatus,
      setEnterpriseDelegationProductStatus,
    ] = useState(null),
    [
      enterpriseDelegationSpecimenStatus,
      setEnterpriseDelegationSpecimenStatus,
    ] = useState(null),
    [
      enterpriseDelegationBasicStatus,
      setEnterpriseDelegationBasicStatus,
    ] = useState(null),
    [loading, setLoading] = useState(true),
    [isCurrentStep, setIsCurrentStep] = useState(false);

  useEffect(() => {
    if (delegation?.currentStep === 1) {
      setIsCurrentStep(true);
    }
  }, [delegation]);

  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setLoading(true);

        const res = await proxyFetch(
          SELECT_DELEGATION_STATUS,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        setEnterpriseDelegationApplyStatus(res.enterpriseDelegationApplyStatus);
        setEnterpriseDelegationContractStatus(
          res.enterpriseDelegationContractStatus
        );
        setEnterpriseDelegationCopyrightStatus(
          res.enterpriseDelegationCopyrightStatus
        );
        setEnterpriseDelegationDocumentStatus(
          res.enterpriseDelegationDocumentStatus
        );
        setEnterpriseDelegationProductDescriptionStatus(
          res.enterpriseDelegationProductDescriptionStatus
        );
        setEnterpriseDelegationProductStatus(
          res.enterpriseDelegationProductStatus
        );
        setEnterpriseDelegationSpecimenStatus(
          res.enterpriseDelegationSpecimenStatus
        );
        setEnterpriseDelegationBasicStatus(res.enterpriseDelegationBasicStatus);
        setLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

  return (
    <div className='left-item-box'>
      <Icon
        className='item-icon-box'
        type='file-zip'
        theme='twoTone'
        twoToneColor='#334454'
      />
      <Skeleton loading={loading}>
        {sysDelegationStep.length ? (
          <div className='item-text-box'>
            <div className='text-top-box'>
              {sysDelegationStep[0].name}
              <Tag className='title-tag' color={delegationSteps[0].color}>
                {delegationSteps[0].statusText}
              </Tag>
            </div>
            <p className='text-subtitle'>
              检查8种材料信息,是否完整,是否符合要求
            </p>
            <div className='text-content-box'>
              {enterpriseDelegationBasicStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/basic`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>委托测试基本信息</span>
                  </Link>
                  <Tag
                    className='content-tag'
                    color={statusToColor(
                      enterpriseDelegationBasicStatus.status
                    )}
                  >
                    {enterpriseDelegationBasicStatus.statusText}
                  </Tag>
                </div>
              ) : null}
              {enterpriseDelegationContractStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/contract`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>评测合同</span>
                  </Link>
                  <Tag
                    className='content-tag'
                    color={statusToColor(
                      enterpriseDelegationContractStatus.status
                    )}
                  >
                    {enterpriseDelegationContractStatus.statusText}
                  </Tag>
                </div>
              ) : null}
              {enterpriseDelegationCopyrightStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/copyright`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>软件著作权证书</span>
                  </Link>
                  <Tag
                    className='content-tag'
                    color={statusToColor(
                      enterpriseDelegationCopyrightStatus.status
                    )}
                  >
                    {enterpriseDelegationCopyrightStatus.statusText}
                  </Tag>
                </div>
              ) : null}
              {enterpriseDelegationSpecimenStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/specimen`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>样品登记表</span>
                  </Link>
                  <Tag
                    className='content-tag'
                    color={statusToColor(
                      enterpriseDelegationSpecimenStatus.status
                    )}
                  >
                    {enterpriseDelegationSpecimenStatus.statusText}
                  </Tag>
                </div>
              ) : null}
              {enterpriseDelegationProductDescriptionStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/productDescription`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>产品说明</span>
                  </Link>
                  <Tag
                    className='content-tag'
                    color={statusToColor(
                      enterpriseDelegationProductDescriptionStatus.status
                    )}
                  >
                    {enterpriseDelegationProductDescriptionStatus.statusText}
                  </Tag>
                </div>
              ) : null}
              {enterpriseDelegationDocumentStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/document`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>用户文档集</span>
                  </Link>
                  <Tag
                    className='content-tag'
                    color={statusToColor(
                      enterpriseDelegationDocumentStatus.status
                    )}
                  >
                    {enterpriseDelegationDocumentStatus.statusText}
                  </Tag>
                </div>
              ) : null}
              {enterpriseDelegationProductStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/product`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>样品</span>
                  </Link>
                  <Tag
                    className='content-tag'
                    color={statusToColor(
                      enterpriseDelegationProductStatus.status
                    )}
                  >
                    {enterpriseDelegationProductStatus.statusText}
                  </Tag>
                </div>
              ) : null}
              {enterpriseDelegationApplyStatus ? (
                <div className='text-content-link'>
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/apply`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>现场测试申请表</span>
                  </Link>
                  <Tag
                    className='content-tag'
                    color={statusToColor(
                      enterpriseDelegationApplyStatus.status
                    )}
                  >
                    {enterpriseDelegationApplyStatus.statusText}
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
