var getEnumList = function (array, field) {
    var result = [];
    array.forEach((it) => {
        if (result.indexOf(it[field]) == -1) {
            result.push(it[field]);
        }
    });
    return result;
};

export default {
    getEnumList
};