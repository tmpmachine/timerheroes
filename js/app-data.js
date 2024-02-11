let appData = (function() {
  
  let SELF = {
    Init,
    Save,
    GetComponentData,
    SetComponentData,
    RestoreComponentData,
    ClearData,
  };
  
  let data = {
    components: {
      compoTimer: {},
    }
  };
  
  let local = {
    appStorageKey: 'app-MzIxMzgwMjU-egghatchtimer',
  };
  
  let temp = {
    data: null,
  };
  
  function Init() {
    temp.data = clearReference(data);
    
    let storageData = localStorage.getItem(local.appStorageKey);
    if (!storageData) return;
    
    try {
      data = JSON.parse(storageData);
    } catch (e) {
      console.error(data);
    }
  }
  
  function Save() {
    localStorage.setItem(local.appStorageKey, JSON.stringify(data));
  }
  
  function ClearData() {
    localStorage.removeItem(local.appStorageKey);
    data = clearReference(temp.data);
  }
  
  function clearReference(data) {
    return JSON.parse(JSON.stringify(data));
  }
  
  function SetComponentData(componentKey, componentData) {
    if (typeof(data.components[componentKey]) == 'undefined') return false;
    
    data.components[componentKey] = clearReference(componentData);
    return true;
  }
  
  function GetComponentData(componentKey = '') {
    if (!componentKey) return null;
    if (typeof(data.components[componentKey]) == 'undefined') return null;

    return clearReference(data.components[componentKey]);
  }
  
  function RestoreComponentData(componentObj) {
    let data = GetComponentData(componentObj.DataStorageKey);
    if (!data) return;
    
    componentObj.RestoreData(data)
  }
  
  return SELF;
  
})();