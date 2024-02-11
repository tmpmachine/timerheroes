let uiTimer = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    HandleClickListEggs,
    ReloadList,
    AddNewEgg,
  };
  
  function HandleClickListEggs(evt) {
    let targetEl = evt.target;
    let itemEl = targetEl.closest('[data-kind="item"]');
    let actionEl = targetEl.closest('[data-role]');
    
    if (!itemEl || !actionEl) return;
    
    let id = itemEl.dataset.id;
    let action = actionEl.dataset.role;
    
    switch (action) {
      case 'timer-card': editTimer(id); break;
      case 'hatch': hatchById(id); break;
      case 'delete': deleteById(id); break;
      case 'edit': editById(id); break;
    }
  }
  
  async function editTimer(id) {
    let modalEl = await uiModal.TaskOpen('ModalTimer');
    
    let item = compoTimer.GetItemById(id);
    
    // fill form data
    fillFormData(modalEl.querySelector('form'), {
      eggId: item.id,
      eggName: item.title,
    });
    
    // handle modal form submit & close modal
    modalEl.addEventListener('submit', handleUpdateTimer);
    modalEl.addEventListener('submit', () => {
      modalEl.close();
    });
  }
  
  function handleUpdateTimer(evt) {
      
    evt.preventDefault();
    
    let form = evt.target;
    
    // update timer
    compoTimer.UpdateItemById(form.eggId.value, {
      title: form.eggName.value,
    });
    compoTimer.Commit();
    appData.Save();
    ReloadList();
    
  }
  
  function fillFormData(formEl, formData) {
    
    for (let key in formData) {
      if (typeof formEl[key] != 'object') continue;
      
      if (formEl[key].tagName == 'INPUT') {
        let inputEl = formEl[key];
        inputEl.value = formData[key];
      }
      
    }
    
  }
  
  function AddNewEggModal() {
  }
  
  function AddNewEgg() {
    let userVal = window.prompt('Egg name');
    if (!userVal) return;
    
    let timeVal = window.prompt('Egg age (in days, hours, minutes. example: 1d4h20m, 23h, 5m)');
    if (!timeVal) return;
    
    let eggAgeMs = helper.ParseTimeStrToMs(timeVal);
    if (eggAgeMs === null) return;
    
    let now = new Date();
    let dueDate = new Date(now.getTime() + eggAgeMs);
    
    compoTimer.AddItem(userVal, dueDate.getTime(), eggAgeMs);
    compoTimer.Commit();
    appData.Save();
    
    ReloadList();
  }
  
  function hatchById(id) {
    
    let item = compoTimer.GetItemById(id);
    
    if (typeof(item.age) == 'number') {
      
      let now = new Date();
      let dueDate = new Date(now.getTime() + item.age);
      
      compoTimer.UpdateItemById(id, {
        expiredAt: dueDate.getTime(),  
      });
      
    } else {
      
      compoTimer.DeleteItemById(id);
      
    }
    
    compoTimer.Commit();
    appData.Save();
    
    ReloadList();
  }
  
  function ReloadList() {
    
    let container = $('#container-list-eggs');
    let docFrag = document.createDocumentFragment();
    let items = compoTimer.GetAllItems();
    
    container.innerHTML = '';
    
    items.sort((a, b) => {
      return a.expiredAt < b.expiredAt ? -1 : 1;
    });
    
    for (let item of items) {
      
      let timerStates = {
        isReadyToHatch: false,
      };
      
      let timeLeftStr = '';
      let statusLabel = '';
      
      let expiredInMs = item.expiredAt - new Date().getTime();
      if (expiredInMs > 0) {
        timeLeftStr = helper.ToTimeString(expiredInMs, 'age');
      }
      
      if (expiredInMs < 0) {
        statusLabel = 'Ready to hatch!';
        timerStates.isReadyToHatch = true;
      }
      
      let el = templateSlot.fill({
        data: {
          timeLeftStr,
          statusLabel,
          title: item.title,
        }, 
        template: document.querySelector('#tmp-item-egg').content.cloneNode(true), 
      });
      
      el.querySelector('[data-kind="item"]').dataset.id = item.id;
      // el.querySelector('[data-kind="item"]').classList.toggle('is-active', (item.id == activeId));
      
      applyStatesToTimerEl(timerStates, el);
      
      docFrag.append(el);
    }
    
    container.append(docFrag);
  }
  
  function applyStatesToTimerEl(timerStates, el) {
    try {
      el.querySelector('[data-kind="item"]').classList.toggle('is-ready-to-hatch', timerStates.isReadyToHatch);
    } catch (e) {
      console.error(e);
    }
  }
  
  function editById(id) {
    let item = compoTimer.GetItemById(id);
    
    let userVal = window.prompt('Egg name', item.title);
    if (!userVal) return;
  }
  
  function deleteById(id) {
    
    let item = compoTimer.GetItemById(id);
    
    let isConfirm = window.confirm(`Delete this egg: ${item.title}?`);
    if (!isConfirm) return;
    
    compoTimer.DeleteItemById(id);
    compoTimer.Commit();
    appData.Save();
    
    ReloadList();
  }
  
  return SELF;
  
})();