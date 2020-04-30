export default class ChartTool {
  constructor() {}

  static converterData(datas, legendName, xPath, yPath) {
    let result = [];
    if (!(legendName && xPath && yPath)) {
      console.warn("必须定义图例和各轴字段！");
      return result;
    }
    /* if (datas && datas.length) {
      
    } */
    return result;
  }

  static repairData(datas, valueName, needRepair) {
    let keys = [];
    let result = [];
    if (!valueName) {
      console.warn("必须定义量值字段！");
      return result;
    }
    if (datas && datas.length) {
      if (needRepair && needRepair.length) {
        keys = needRepair;
      } else {
        keys = Object.keys(datas[0]);
        let index = keys.findIndex((k) => k == valueName);
        keys.splice(index, 1);
      }
      //   for (let i = 0; i < datas.length; i++) {}
    }
    return result;
  }
}
