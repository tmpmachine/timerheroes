scriptLoader.AppendToHead([
  {
    urls: [
      "js/uis/timer-ui.js",
      "js/uis/modal-ui.js",
      "js/lib/templateslot.min.js",
      "js/components/timer-component.js",
      "js/helper.js",
      "js/app-data.js",
      "js/dom-events.js",
      "js/ui.js",
      "js/app.js",
    ],
    callback: function() { 
      
      app.Init();

    },
  },
]);