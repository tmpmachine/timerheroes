let uiModal = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    TaskOpen,
  };
  
  let local = {
    modalElements: [],
    // items: [],
  };
  
  async function TaskOpen(id) {
    
    /*let item = getItemById(id);
    if (item) {
      let modal = openModal(item.id);
      return modal;
    }
    
    addItem(id);*/
    let el = $('#tmp-modal').content.firstElementChild.cloneNode(true);
    document.body.append(el);
    await new Promise(resolve => setTimeout(resolve, 1));
    local.modalElements.push(el);
    
    return openModal(id);
  }
  
  function openModal(id) {
    let modalEl = local.modalElements.pop().toggle();
    
    // set modal content
    setModalContent(modalEl, id);
    modalEl.attachKeytrap();
    
    // show modal
    modalEl.classList.toggle('modal--active', modalEl.isShown);
    
    // attach modal close listener once
    modalEl.addEventListener('onclose', function(evt) {
      evt.target.classList.toggle('modal--active', false);
      local.modalElements.pop();
      
      // remove from DOM after transition opacity ended
      modalEl.shadowRoot.querySelector('.window').addEventListener('transitionend', (evt) => {
        if (evt.propertyName == 'opacity') {
          modalEl.remove();
        }
      });
    });
    
    return modalEl;
  }
  
  function setModalContent(modalEl, id) {
    modalEl.querySelector('[slot="content"]').innerHTML = '';
    let docFrag = document.createDocumentFragment();
    let el = $(`[data-modal-id="${id}"]`).content.cloneNode(true);
    docFrag.append(el);
    modalEl.querySelector('[slot="content"]').append(docFrag);
  }
  
  function addItem(id) {
    let index = getItemIndexById(id);
    if (index >= 0) return;
    
    local.items.push({
      id,
    });
  }
  
  function getItemIndexById(id) {
    let items = getAllItems();
    return items.findIndex(item => item.id == id);
  }
  
  function getAllItems() {
    return local.items;
  }
  
  function getItemById(id) {
    let item = local.items.find(x => x.id == id);
    if (item !== undefined) return item;
    
    return null;
  }
  
  return SELF;
  
})();