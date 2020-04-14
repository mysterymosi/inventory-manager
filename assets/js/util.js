export const extractData = (spreadsheet, rowsCount) => {
  let arr = [];
  for (let i = 2; i < rowsCount; i++) {
    if (
      spreadsheet.getValue("A" + i).length > 0 &&
      spreadsheet.getValue("B" + i).length > 0
    ) {
      arr.push({
        prodname: spreadsheet.getValue("A" + i),
        prodprice: spreadsheet.getValue("B" + i)
      });
    }
  }
  return arr;
};

export const json2excel = (json, rowsCount) => {
  let alpha = ["A", "B"];
  let prod = ["prodname", "prodprice"];
  for (let i = 2; i < rowsCount; i++) {
    let arr = [];
    for (let j = 0; j < json.length; i++) {
      arr.push({
        cell: alpha[j] + i,
        value: json[j]
      });
    }
  }
  return arr;
};

export const inputData = (data, state) => {
  let arr = [];
  const staticValues = [
    {
      cell: "A1",
      value: `${state.charAt(0).toUpperCase() + state.slice(1)} Name`
    },
    {
      cell: "B1",
      value: `${state.charAt(0).toUpperCase() + state.slice(1)} Price`
    }
  ];

  data.forEach((item, i) => {
    arr.push(
      { cell: "A" + (i + 2), value: item.prodname },
      { cell: "B" + (i + 2), value: item.prodprice }
    );
  });
  return arr.concat(staticValues);
  // sheet.spreadsheet.parse(arr.concat(staticValues));
};

export const formattedDate = function() {
  let date = new Date();
  let formattedDate = ("0" + date.getDate()).slice(-2);
  let month = date.getMonth() + 1;
  let formattedMonth = ("0" + month).slice(-2);
  console.log(
    "date says: ",
    date.getFullYear() + "-" + formattedMonth + "-" + formattedDate
  );
  let finalDate =
    date.getFullYear() + "-" + formattedMonth + "-" + formattedDate;
  return finalDate;
};

export const isEmpty = function(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
