var products = [{
  id: 1,
  name: 'Product1',
  price: 120,
  category: 'AAA'
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
}, {
  id: 33,
  name: 'Product3B',
  price: 80033,
  category: 'B'
}];


var distinct = {};
 
products.forEach(function (product) {
  'use strict';
  if (!distinct[product.category]){
    distinct[product.category]=[];
  }
  distinct[product.category].push(product);
});


var distinctKeys = Object.keys(distinct);
var products2 = [];

distinctKeys.forEach(function (attribute){
  'use strict';
  products2.push({'id' : attribute , 'name' : attribute + '(' + distinct[attribute].length +')', 'products': distinct[attribute]});
});

/*

var thisValue = {};
const attr = 'sort';
columns2.map(function(item){
  'use strict';
  console.log(item);
  if (!thisValue[item[attr]]){
    thisValue[item[attr]] = [];
  }
  thisValue[item[attr]].push(item);
}, thisValue);
*/

var columns1 = [{
  dataField: 'id',
  text: 'Product ID',
  align: 'left'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true,
  align: 'right'
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
}, {
  dataField: 'calc',
  text: 'A Function'
}];

var columns3 = [{
  dataField: 'id',
  text: 'Product ID B',
  align: 'left'
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

var views = [
  {
    name: 'By A',
    records: products,
    columns: columns1
  },
  {
    name: 'By B',
    records: products2,
    columns: columns2
  },
  {
    name: 'By C',
    recordsFile: 'products.json',
    columns: columns3
  }
];