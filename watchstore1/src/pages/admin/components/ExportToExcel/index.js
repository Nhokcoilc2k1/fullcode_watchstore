import React from 'react';
import classNames from 'classnames/bind';
import styles from './ExportToExcel.module.scss'
import { utils, writeFile } from 'xlsx';

const cx = classNames.bind(styles);

const ExportToExcel = ({ data }) => {
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Product Data');
    writeFile(workbook, 'product_data.xlsx');
  };

  return (
    <button className={cx('btn-export')} onClick={exportToExcel}>Export to Excel</button>
  );
};

export default ExportToExcel;