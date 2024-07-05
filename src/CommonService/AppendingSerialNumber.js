export function appendSerialNo(jsonArrayData) {
    let result = [];
    if (jsonArrayData != null && jsonArrayData !== undefined) {
      result = jsonArrayData.map((obj, index) => {
        return { ...obj, sno: index + 1 }
      });
    }
    return result;
  }