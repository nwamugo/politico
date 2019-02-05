// Toggle between hiding and showing the dropdown Content
function toggleDropDown(target) {
  let open = 0;
  if (target.parentNode.querySelector('.dropdown-content').classList.contains('show')) {
    open = 1;
  }
  closeOpenItems();
  if (open != 1) {
    target.parentNode.querySelector('.dropdown-content').classList.add("show");
  }
  event.stopPropagation();
}


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
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
           preview.src = "";
       }
  }

previewFile();  //calls the function named previewFile()



//Close modal
