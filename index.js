const bcrEl = document.querySelector('bar-code-reader');

function sendEvent(eventName) {
  bcrEl?.dispatchEvent(new Event(eventName));
}

function initModal(id){
  const myModal = new bootstrap.Modal(`#${id}`, {
    keyboard: false,
    backdrop: 'static',
    focus: false
  });

  const myModalEl = document.getElementById(id);
  myModalEl.addEventListener('show.bs.modal', () => { sendEvent('bcr:init') });
  myModalEl.addEventListener('hidden.bs.modal', () => { sendEvent('bcr:stop') });

  const openModalBtn = document.querySelector('.open-modal');
  openModalBtn?.addEventListener('click', () => { myModal.show() });

  const stopModalBtn = document.querySelector('.close-modal');
  stopModalBtn.addEventListener('click', () => { myModal.hide() });

  return myModal;
}

initModal('bcr-modal');

// reset items
const resetItem = document.querySelector('.bcr-reset');
resetItem?.addEventListener('click', () => { sendEvent('bcr:reset') });

// submit items
const submitItem = document.querySelector('.bcr-submit');
submitItem?.addEventListener('click', () => { sendEvent('bcr:submit') });

const bodyEl = document.querySelector('body');
bodyEl?.addEventListener('bcr:has-result', (event) => { console.log(event.detail?.code) });
