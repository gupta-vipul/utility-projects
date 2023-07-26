DEFAULT_TOAST_MESSAGE = 'Toast Message';
const toastContainer = document.getElementById('toastContainer');

const addNewToast = document.getElementById('addToast');
addNewToast.addEventListener('click', addingToast);

function addingToast() {
    const {
        toastMessage, 
        toastDuration, 
        isToastCancellable, 
        toastType,
        error
    } = getToastInputs();

    const toastBody = generateToast(toastMessage, toastDuration, isToastCancellable, toastType);

    toastContainer.prepend(toastBody);
}

function getToastInputs(){
    const toastMessage = document.getElementById('toastMessage').value;
    const toastDuration = document.getElementById('toast-duration').value;
    const isToastCancellable = document.getElementById('isCancellable').checked;
    const toastType = document.querySelector('input[name="toast-type"]:checked').value;
    if(!toastMessage){
        return {error : 'toast message needs to be created'};
    }
    return {toastMessage, toastDuration, isToastCancellable, toastType};
}

function generateToast (toastMessage, toastDuration, isToastCancellable, toastType) {
    const toastBody = document.createElement('div');
    const toastpara = document.createElement('p');
    toastpara.textContent = toastMessage;
    toastBody.appendChild(toastpara);
    toastBody.classList.add('toast', `${toastType}Toast`);
    if(isToastCancellable){
        const closeToastBtn = document.createElement('span');
        closeToastBtn.textContent = 'x';
        closeToastBtn.classList.add('closeToastBtn');
        toastBody.appendChild(closeToastBtn);

        closeToastBtn.addEventListener('click', ()=>{
            toastBody.remove();
            clearTimeout(timeoutTracker);
        });
    }

    let timeoutTracker = setTimeout(()=>{
        toastBody.remove();
    }, toastDuration);
    return toastBody;
}

const removeAllBtn = document.getElementById('removeAllToast');
removeAllBtn.addEventListener('click', removeAllToast);

function removeAllToast() {
    toastContainer.innerHTML = "";
}