module.exports.trimObject = function (obj) {
  const newObj = {};

  Object.keys(obj).forEach((ele) => {
    var formattedEle = obj[ele].trim();

    if (formattedEle) {
      newObj[ele] = formattedEle;
    }
  });

  return newObj;
};
