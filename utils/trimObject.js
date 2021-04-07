module.exports.trimObject = function (obj) {
  const newObj = {};

  Object.keys(obj).forEach((ele) => {
    if (ele == "email") {
      obj[ele] = obj[ele].toLowerCase();
    }

    var formattedEle = obj[ele].trim();

    if (formattedEle) {
      newObj[ele] = formattedEle;
    }
  });

  return newObj;
};
