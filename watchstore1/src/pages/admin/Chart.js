import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip,BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';

// Dữ liệu ví dụ
const data = [
  { name: 'Sản phẩm A', value: 4 },
  { name: 'Sản phẩm B', value: 3 },
  { name: 'Sản phẩm C', value: 2 },
  { name: 'Sản phẩm D', value: 1 },
  { name: 'Sản phẩm E', value: 1 }
];

const databar = [
    { month: 'Tháng 1', sales: 500 },
    { month: 'Tháng 2', sales: 800 },
    { month: 'Tháng 3', sales: 1200 },
    { month: 'Tháng 4', sales: 900 },
    { month: 'Tháng 5', sales: 1500 },
    { month: 'Tháng 6', sales: 1100 },
    { month: 'Tháng 7', sales: 1100 },
    { month: 'Tháng 8', sales: 900 },
    { month: 'Tháng 9', sales: 1500 },
    { month: 'Tháng 10', sales: 1100 },
    { month: 'Tháng 11', sales: 1100 },
    { month: 'Tháng 12', sales: 5000 },
  ];

  const datap = [
    { product: 'Sản phẩm A', sales: 500 },
    { product: 'Sản phẩm B', sales: 400 },
    { product: 'Sản phẩm C', sales: 300 },
    { product: 'Sản phẩm D', sales: 250 },
    { product: 'Sản phẩm E', sales: 200 },
    { product: 'Sản phẩm A', sales: 500 },
    { product: 'Sản phẩm B', sales: 400 },
    { product: 'Sản phẩm C', sales: 300 },
    { product: 'Sản phẩm D', sales: 250 },
    { product: 'Sản phẩm E', sales: 200 },
  ];

  const dataTop = [
    { product: 'Product A', sales: 500 },
  { product: 'Product B', sales: 400 },
  { product: 'Product C', sales: 300 },

  ];

// Màu sắc cho các phần tử trong biểu đồ
const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#52aa54', '#ff0000', '#f53e2d', '#b1c236'];

export const SalesPieChart = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export const SalesChart = () => {
    return (
      <BarChart width={600} height={400} data={databar}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    );
  };
  
export const TopProductsChart = () => {
    return (
        <BarChart width={600} height={400} data={dataTop}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      );
  };
  
