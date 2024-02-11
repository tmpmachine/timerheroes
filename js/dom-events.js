let DOMEvents = (function() {
    
  let SELF = {
    Init,
  };
    
  let eventsMap = {
    onclick: {
      'clear-app-data': () => ui.ClearAppData(),
      'handle-click-list-eggs': (evt) => uiTimer.HandleClickListEggs(evt),
    	'add-new-egg': () => uiTimer.AddNewEgg(),
    },
  };
  
  let listening = function(selector, dataKey, eventType, callbacks) {
    let elements = document.querySelectorAll(selector);
    for (let el of elements) {
      let callbackFunc = callbacks[el.dataset[dataKey]];
      el.addEventListener(eventType, callbackFunc);
    }
  };
  
  function Init() {
    listening('[data-onclick]', 'onclick', 'click', eventsMap.onclick);
  }
  
  return SELF;

})();
