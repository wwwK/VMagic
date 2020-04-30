/* eslint-disable */
export default class EarthTool {
  constructor() {}

  static WGS84_to_Cartesian3(point) {
    var car33 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt);
    var x = car33.x;
    var y = car33.y;
    var z = car33.z;
    return { x: x, y: y, z: z };
  }

  static generateCurve(startPoint, endPoint) {
    let addPointCartesian = new Cesium.Cartesian3();
    Cesium.Cartesian3.add(startPoint, endPoint, addPointCartesian);
    let midPointCartesian = new Cesium.Cartesian3();
    Cesium.Cartesian3.divideByScalar(addPointCartesian, 2, midPointCartesian);
    let midPointCartographic = Cesium.Cartographic.fromCartesian(
      midPointCartesian
    );
    //除以的这个数越小 开始的位置聚集的位置就越陡，越大 开始的位置线就越平缓，
    midPointCartographic.height =
      Cesium.Cartesian3.distance(startPoint, endPoint) / 6;
    let midPoint = new Cesium.Cartesian3();
    Cesium.Ellipsoid.WGS84.cartographicToCartesian(
      midPointCartographic,
      midPoint
    );
    let spline = new Cesium.CatmullRomSpline({
      times: [0.0, 0.5, 1.0],
      points: [startPoint, midPoint, endPoint],
    });
    let curvePointsArr = [];
    for (let i = 0, len = 500; i < len; i++) {
      curvePointsArr.push(spline.evaluate(i / len));
    }
    return curvePointsArr;
  }
}
