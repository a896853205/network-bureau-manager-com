import React from 'react';

//样式
import '@/style/home/project-manager/detail.styl';

// 组件
import Apply from '@/components/home/project-manager/delegation-detail/Apply.jsx';
import Contract from '@/components/home/project-manager/delegation-detail/Contract.jsx';
import Copyright from '@/components/home/project-manager/delegation-detail/Copyright.jsx';
import Document from '@/components/home/project-manager/delegation-detail/Document.jsx';
import ProductDescription from '@/components/home/project-manager/delegation-detail/Product-description.jsx';
import Product from '@/components/home/project-manager/delegation-detail/Product.jsx';
import Specimen from '@/components/home/project-manager/delegation-detail/Specimen.jsx';
import TestSpecimen from '@/components/home/project-manager/delegation-detail/Test-specimen.jsx';
import Basic from '@/components/home/project-manager/delegation-detail/Basic.jsx';
import ContractManager from '@/components/home/project-manager/delegation-detail/Contract-manager.jsx';
import ContractDownload from '@/components/home/project-manager/delegation-detail/Contract-download.jsx';
import ContractExamine from '@/components/home/project-manager/delegation-detail/Contract-examine.jsx';
import FinanceShow from '@/components/home/project-manager/delegation-detail/Finance-show.jsx';
import TechnicalManagerShow from '@/components/home/project-manager/delegation-detail/Technical-manager-show.jsx';
import ReportStamp from '@/components/home/project-manager/delegation-detail/Report-stamp.jsx';
import RecordStamp from '@/components/home/project-manager/delegation-detail/Record-stamp.jsx';

export default ({ type }) => {
  let content = null;

  switch (type) {
    case 'apply':
      content = <Apply />;
      break;
    case 'contract':
      content = <Contract />;
      break;
    case 'copyright':
      content = <Copyright />;
      break;
    case 'specimen':
      content = <Specimen />;
      break;
    case 'productDescription':
      content = <ProductDescription />;
      break;
    case 'document':
      content = <Document />;
      break;
    case 'product':
      content = <Product />;
      break;
    case 'basic':
      content = <Basic />;
      break;
    case 'contractManager':
      content = <ContractManager />;
      break;
    case 'contractDownload':
      content = <ContractDownload />;
      break;
    case 'contractExamine':
      content = <ContractExamine />;
      break;
    case 'financeShow':
      content = <FinanceShow />;
      break;
    case 'technicalManagerShow':
      content = <TechnicalManagerShow />;
      break;
    case 'reportStamp':
      content = <ReportStamp />;
      break;
    case 'recordStamp':
      content = <RecordStamp />;
      break;
    case 'testSpecimen':
      content = <TestSpecimen />;
      break;
    default:
      content = null;
  }

  return (
    <div className='item-box detail-item-box'>
      <p className='title-box'>审查详情</p>
      {content}
    </div>
  );
};
