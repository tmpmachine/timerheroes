let ui = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Init,
    ClearAppData,
  };
  
  function ClearAppData() {
    let isConfirm = window.confirm('Are you sure?');
    if (!isConfirm) return;
    
    app.ClearData();
  }
  
  function Init() {
    DOMEvents.Init();
    
    uiTimer.ReloadList();
    attachVisibilityListeners();
  }
  
  function attachVisibilityListeners() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        uiTimer.ReloadList();
      }
    });
  }
  
  return SELF;
  
})();