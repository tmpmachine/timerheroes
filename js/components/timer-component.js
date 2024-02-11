let compoTimer = (function() {
  
  let SELF = {
    DataStorageKey: 'compoTimer',
    RestoreData,
    GetAllItems,
    AddItem,
    Commit,
    DeleteItemById,
    ClearData,
    AddItem,
    UpdateItemById,
    GetItemById,
  };
  
  let data = {
    items: [],
  };
  
  let temp = {
    data: null,
  };
  
  function AddItem(title, expiredAt, age) {
    let id = new Date().getTime().toString();
    data.items.push({
      id,
      title,
      expiredAt,
      age,
    });
  }
  
  function GetItemById(id) {
    let item = data.items.find(x => x.id == id);
    if (item !== undefined) return item;
    
    return null;
  }
  
  function UpdateItemById(id, incomingData) {
    let item = GetItemById(id);
    if (!item) return null;
    
    for (let key in incomingData) {
      if (typeof(item[key]) != 'undefined' && typeof(item[key]) == typeof(incomingData[key])) {
        item[key] = incomingData[key];
      }
    }
    
    return item;
  }
  
  function DeleteItemById(id) {
    let delIndex = getItemIndexById(id);
    if (delIndex < 0) return null;
    
    return data.items.splice(delIndex, 1);
  }
  
  function getItemIndexById(id) {
    let items = GetAllItems();
    return items.findIndex(item => item.id == id);
  }
  
  function GetAllItems() {
    return data.items;
  }
  
  function Commit() {
    appData.SetComponentData(SELF.DataStorageKey, data);
  }
  
  function ClearData() {
    data = JSON.parse(JSON.stringify(temp.data));
  }
  
  function RestoreData(noReferenceData) {
    temp.data = JSON.parse(JSON.stringify(data));
    for (let key in noReferenceData) {
      if (typeof(data[key]) != 'undefined') {
        data[key] = noReferenceData[key];
      }
    }
  }
  
  return SELF;
  
})();