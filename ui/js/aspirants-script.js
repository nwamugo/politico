let modal = document.querySelector('.voting');
let trigger = document.querySelectorAll('.vote-begin');
let closeButton = document.querySelector('.close-button');

function toggleModal() {
    modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
    if (event.target === modal) {
        console.log('how we do');
        toggleModal();
    }
}

for (let i = 0; i < trigger.length; i++) {
    trigger[i].addEventListener('click', toggleModal);
}

closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);