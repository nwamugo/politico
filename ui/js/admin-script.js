// Toggle between hiding and showing the dropdown Content
function toggleDropDown(target) {
  let open = 0;
  if (target.parentNode.querySelector('.dropdown-content').classList.contains('show')) {
    open = 1;
  }
  closeOpenItems();
  if (open != 1) {
<<<<<<< HEAD
    target.parentNode.querySelector('.dropdown-content').classList.add('show');
=======
    target.parentNode.querySelector('.dropdown-content').classList.add("show");
>>>>>>> admin features added
  }
  event.stopPropagation();
}


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
<<<<<<< HEAD
    let dropdowns = document.getElementsByClassName('dropdown-content');
=======
    let dropdowns = document.getElementsByClassName("dropdown-content");
>>>>>>> admin features added
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function closeOpenItems() {
    let openMenus = document.querySelectorAll('.dropdown-content');
    openMenus.forEach(function(menu) {
      menu.classList.remove('show');
    });
}


//  Image upload and preview
function previewFile(){
       let preview = document.querySelector('.img__upload');
       let file    = document.querySelector('input[type=file]').files[0];       let reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
<<<<<<< HEAD
           preview.src = '';
=======
           preview.src = "";
>>>>>>> admin features added
       }
  }

previewFile();  //calls the function named previewFile()
<<<<<<< HEAD
=======



//Close modal
>>>>>>> admin features added
