import { PieChart, Pie, Cell, Legend, Tooltip,BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import React from 'react';
// Dữ liệu ví dụ
// const dataCate = [
//   { name: 'Đồng hồ nam', value: 2 },
//   { name: 'Đồng hồ nữ', value: 1 },
// ];

// const databrand = [
//   { name: 'PIANUS', value: 2 },
//   { name: 'ORIENT', value: 1 },
//   { name: 'TISSOT', value: 1 },
// ];

// const databar = [
//     { month: 'Tháng 12', sales: 5000 },
//   ];

  // const datap = [
  //   { product: 'Sản phẩm A', sales: 500 },
  //   { product: 'Sản phẩm B', sales: 400 },
  //   { product: 'Sản phẩm C', sales: 300 },
  //   { product: 'Sản phẩm D', sales: 250 },
  //   { product: 'Sản phẩm E', sales: 200 },
  //   { product: 'Sản phẩm A', sales: 500 },
  //   { product: 'Sản phẩm B', sales: 400 },
  //   { product: 'Sản phẩm C', sales: 300 },
  //   { product: 'Sản phẩm D', sales: 250 },
  //   { product: 'Sản phẩm E', sales: 200 },
  // ];

  const dataTop = [
    { product: 'Product A', sales: 500 },
  { product: 'Product B', sales: 400 },
  { product: 'Product C', sales: 300 },

  ];

  const formatValue = (value) => {
      return `${(value / 1000000)}M`
  };

// Màu sắc cho các phần tử trong biểu đồ
const colors = ['#52aa54' , '#ff0000' , '#ffc658',  '#f53e2d','#8884d8' , '#b1c236', '#82ca9d', '#ff7f50', '#008800'];

export const SalesPieChart = ({data}) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
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

export const SalesChart = ({data}) => {
    return (
      <BarChart width={250} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={formatValue} />
        <Tooltip />
        <Legend />
        <Bar dataKey='sales' fill="#52aa54" />
      </BarChart>
    );
  };
  
export const TopProductsChart = ({data}) => {
    return (
        <BarChart width={500} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{ paddingBottom: 20 }}
          payload={data.map((entry, index) => ({
            id: `legend-${index}`,
            value: entry.product,
            type: 'square',
            color: colors[index % colors.length],
          }))}
        />
          <Bar dataKey="sales" >
          {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
          </Bar>
        </BarChart>
      );
  };
  
