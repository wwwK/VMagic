// 从nodes中查找node
var isNodeInArray = function (nodes, node) {
  var ifFound = false;
  nodes.forEach((it) => {
    if (it.name === node.name) {
      ifFound = true;
      return ifFound;
    }
  });
  return ifFound;
};

// 从links中查找link
var findLinkInArray = function (links, link) {
  var foundLink = null;
  links.forEach((it) => {
    if (it.source === link.source && it.target === link.target) {
      foundLink = it;
      return foundLink;
    }
  });
  return foundLink;
};

var getProductSystem = function (res) {
  // 节点集合和连线集合
  var nodes = [{ name: "产品体系", type: "", field: "产品体系" }];
  var links = [];

  res.data.datas.forEach((it) => {
    // 每行数据都要产生2个node，去重添加到nodes中
    var newNodeArray = [
      { name: it.level1Name, type: "HosSystem2", field: "产品一级" },
      { name: it.level2Name, type: "HosSystem4", field: "产品二级" },
    ];

    // 去重添加到nodes中
    for (var j = 0; j < newNodeArray.length; j++) {
      var newNode = newNodeArray[j];
      if (!isNodeInArray(nodes, newNode)) {
        nodes.push(newNode);
      }
    }

    // 每行数据都要产生5个link
    var newLinkArray = [
      {
        source: "产品体系",
        sourceIndex: 0,
        sourceType: "",
        sourceField: "产品体系",
        target: it.level1Name,
        targetIndex: 1,
        targetType: "HosSystem2",
        targetField: "产品体系一级",
        value: it.count,
      },
      {
        source: it.level1Name,
        sourceIndex: 1,
        sourceType: "HosSystem2",
        sourceField: "产品体系一级",
        target: it.level2Name,
        targetIndex: 2,
        targetType: "HosSystem4",
        targetField: "产品体系二级",
        value: it.count,
      },
    ];

    // 去重计算每个link的值
    for (var i = 0; i < newLinkArray.length; i++) {
      var newLink = newLinkArray[i];
      var foundLink = findLinkInArray(links, newLink);
      if (foundLink != null) {
        // 如果newLink在link集合中，则让集合中对应的link.count求和
        foundLink.value += newLink.value;
      } else {
        // 如果newLink没在link集合中，则添加newLink
        links.push(newLink);
      }
    }
  });

  return { nodes, links };
};

var getProductView = function (res) {
  var nodes = [{ name: "产品视图", type: "", field: "产品视图" }];
  var links = [];

  res.data.datas.forEach((it) => {
    // 每行数据都要产生5个node，去重添加到nodes中
    var newNodeArray = [
      { name: it.level1Name, type: "HosSystem1", field: "院一级" },
      { name: it.level2Name, type: "HosSystem2", field: "院二级" },
      { name: it.level3Name, type: "HosSystem3", field: "院三级" },
      { name: it.level4Name, type: "HosSystem4", field: "院四级" },
      { name: it.level5Name, type: "HosSystem5", field: "院五级" },
    ];

    // 去重添加到nodes中
    for (var j = 0; j < newNodeArray.length; j++) {
      var newNode = newNodeArray[j];
      if (!isNodeInArray(nodes, newNode)) {
        nodes.push(newNode);
      }
    }

    // 每行数据都要产生5个link
    var newLinkArray = [
      {
        source: "产品视图",
        sourceIndex: 0,
        sourceType: "",
        sourceField: "产品视图",
        target: it.level1Name,
        targetIndex: 1,
        targetType: "HosSystem1",
        targetField: "院体系一级",
        value: it.count,
      },
      {
        source: it.level1Name,
        sourceIndex: 1,
        sourceType: "HosSystem1",
        sourceField: "院体系一级",
        target: it.level2Name,
        targetIndex: 2,
        targetType: "HosSystem2",
        targetField: "院体系二级",
        value: it.count,
      },
      {
        source: it.level2Name,
        sourceIndex: 2,
        sourceType: "HosSystem2",
        sourceField: "院体系二级",
        target: it.level3Name,
        targetIndex: 3,
        targetType: "HosSystem3",
        targetField: "院体系三级",
        value: it.count,
      },
      {
        source: it.level3Name,
        sourceIndex: 3,
        sourceType: "HosSystem3",
        sourceField: "院体系三级",
        target: it.level4Name,
        targetIndex: 4,
        targetType: "HosSystem4",
        targetField: "院体系四级",
        value: it.count,
      },
      {
        source: it.level4Name,
        sourceIndex: 4,
        sourceType: "HosSystem4",
        sourceField: "院体系四级",
        target: it.level5Name,
        targetIndex: 5,
        targetType: "HosSystem5",
        targetField: "院体系五级",
        value: it.count,
      },
    ];

    // 去重计算每个link的值
    for (var i = 0; i < newLinkArray.length; i++) {
      var newLink = newLinkArray[i];
      var foundLink = findLinkInArray(links, newLink);
      if (foundLink != null) {
        // 如果newLink在link集合中，则让集合中对应的link.count求和
        foundLink.value += newLink.value;
      } else {
        // 如果newLink没在link集合中，则添加newLink
        links.push(newLink);
      }
    }
  });

  return { nodes, links };
};

export default {
  isNodeInArray,
  findLinkInArray,
  getProductSystem,
  getProductView,
};
