function readTextFile(fileName, processData) {
  'use strict'
  var readFile = new XMLHttpRequest();
  
  readFile.overrideMimeType('application/json');
  readFile.open('GET', fileName, true);
  readFile.onreadystatechange = function(){
    if (readFile.readyState=== 4 && readFile.status===200){
      processData(readFile.responseText);
    }
  };
  readFile.send(null);
};

var products = [{
  id: 1,
  name: 'Product1',
  price: 120,
  category: 'AAA',
  subName: {
    alias: 'alias'
  },
  img : 'A.png',
  markdown : '## H1 \ncontent and a link to [react-markdown](https://github.com/rexxars/react-markdown)',
  markdown2 : '## H2 \ncontent and a link to [react-markdown](https://github.com/rexxars/react-markdown)    \n![XX](./A.png)'

}, {
  id: 2,
  name: 'Product2',
  price: 80009996,
  category: 'A',
  img : 'B.png',
  markdown : '## H1 \ncontent and a link to [react-markdown](https://github.com/rexxars/react-markdown)'
}, {
  id: 3,
  name: 'Product3',
  price: 8006,
  category: 'B',
  img : 'A.png'
}, {
  id: 33,
  name: 'Product3B',
  price: 80033,
  category: 'B'
}, {
  id: 44,
  name: 'Product3B',
  price: 80033,
  category: 'B',
  img : 'B.png'
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

var prev = '...';

var columns1 = [{
  dataField: 'name',
  text: 'Product Name',
  align: 'left'
}, {
  dataField: 'subName.alias',
  text: 'Alias',
  align: 'left'
}, {
  dataField: 'img',
  text: 'Image',
  _formatter: 'image',
  sort: true,
  align: 'left',
  formatExtraData: {heightx: 60, width: 60}
}, {
  dataField: 'markdown',
  text: 'Marrkdown',
  _formatter: 'markdown',
  sort: true,
  align: 'left'
}, {
  dataField: 'category',
  text: 'Category',
  _filter: 'multiSelection',
  defaultValue: ['B'],
  sort: true,
  align: 'left'
}, 

{
  dataField: 'price',
  text: 'Product Price',
  sort: true,
  align: 'right',

  classes: (cell, row, rowIndex, colIndex)  =>{
    'use strict'
    if (rowIndex % 2 === 0) {
      return 'demo-row-even';
    }
    return 'demo-row-odd';
  },
  style: (cell, row, rowIndex, colIndex) => {
    'use strict'
    if (rowIndex % 2 === 0) {
      return {
        backgroundColor: '#81c784'
      };
    }
    return {
      backgroundColor: '#c8e6c9'
    };
  }
}];

var columns2 = [{
  dataField: 'id',
  text: 'Product ID B'
}, {
  dataField: 'name',
  text: 'Product Name B',
  sort: true
}, {
  dataField: 'category',
  text: 'Product Category B',
  _filter: 'multiSelection',
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
  sort: true
}, {
  dataField: 'alist',
  text: 'List B',
  _formatter: 'linksOfLinks',
  sort: true
}];

var views = [
  {
    name: 'By A',
    records: products,
    columns: columns1,
    expandRowAttribute: 'markdown,markdown2',
    rowStyle: (row, rowIndex) => {
      const style = {};
     
      if (rowIndex === 0 || prev !== row['img']){
        prev = row['img'];
        style.fontWeight = 'bold';
        style.marginTop=  "40px";
        if (rowIndex > 0 ){
          style.WebkitBoxShadow=  "inset 0px 11px 24px -15px rgba(0,0,0,0.59)";
          style.MozBoxShadow=  "inset 0px 11px 24px -15px rgba(0,0,0,0.59)";
          style.BoxShadow=  "inset 0px 11px 24px -15px rgba(0,0,0,0.59)";
        }
      }

      return style;
    }
  },
  {
    name: 'By B',
    records: products2,
    columns: columns2
  },
  {
    name: 'By C',
    records : [],
    dataSource: {
      url: 'products.json'
    },
    readData : function(callback){
      'use strict'
      var that = this;
      readTextFile(this.dataSource.url, function(data){ 
        that.records = JSON.parse(data);
        callback(that);
      });
    },
    columns: columns3
  }
];

