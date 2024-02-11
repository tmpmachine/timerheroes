let app = (function() {
  
  let SELF = {
    Init,
    ClearData,
  };
  
  function Init() {
    appData.Init();
    restoreData();
    
    ui.Init();
  }
  
  function ClearData() {
    appData.ClearData();
    compoTimer.ClearData();
    
    Init();
  }
  
  function restoreData() {
    appData.RestoreComponentData(compoTimer);
  }
  
  return SELF;
  
})();