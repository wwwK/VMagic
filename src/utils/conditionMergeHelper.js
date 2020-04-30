// 合并条件
var mergeCondition = function (condition1, condition2) {
    let result = {};
    // 将condition1中的自有属性都设置到result中
    for (let prop in condition1) {
        if (!Object.prototype.hasOwnProperty.call(condition1, prop)) {
            continue;
        }
        if (Array.isArray(condition1[prop])) {
            // 如果是数组，应该新建一个数组，然后循环push
            result[prop] = [];
            condition1[prop].forEach((it) => {
                result[prop].push(it);
            });
        } else {
            // 不是数组，直接赋值就可以
            result[prop] = condition1[prop];
        }
    }
    // 遍历condition2中的每个属性
    for (let prop in condition2) {
        if (!Object.prototype.hasOwnProperty.hasOwnProperty.call(condition2, prop)) {
            continue;
        }

        if (result[prop] == null) {
            // 如果result中没有condition2的属性，则添加
            result[prop] = condition2[prop];
        } else {
            if (Array.isArray(condition2[prop])) {
                // 如果是数组，则去重追加
                condition2[prop].forEach((it) => {
                    if (result[prop].indexOf(it) == -1) {
                        result[prop].push(it);
                    }
                });
            }
            else {
                // 不是数组，则直接覆盖
                result[prop] = condition2[prop];
            }
        }
    }
    // 返回融合结果
    return result;
};

export default {
    mergeCondition
};