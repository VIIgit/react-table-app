var products = [{
  id: 1,
  name: 'Product1',
  price: 120,
  category: 'AA'
}, {
  id: 2,
  name: 'Product2',
  price: 80009996,
  category: 'A'
}, {
  id: 3,
  name: 'Product3',
  price: 8006,
  category: 'B'
}];

var columns1 = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true
}];
var columns2 = [{
  dataField: 'id',
  text: 'Product ID B'
}, {
  dataField: 'name',
  text: 'Product Name B',
  filterMethod: 'text',
  sort: true
}, {
  dataField: 'category',
  text: 'Product Category B',
  filterMethod: 'multiSelection',
  sort: true
}];

var columns3 = [{
  dataField: 'id',
  text: 'Product ID B'
}, {
  dataField: 'name',
  text: 'Product Name B',
  filterMethod: 'text',
  sort: true
}, {
  dataField: 'alist',
  text: 'List B',
  _formatter: 'linksOfLinks',
  _formatterData: 'alistFormatterData',
  sort: true
}];

var views = [{
    name: 'By A',
    records: products,
    columns: columns1
  },
  {
    name: 'By B',
    records: products,
    columns: columns2
  },
  {
    name: 'By C',
    recordsFile: '/products.yaml',
    columns: columns3
  }
];
