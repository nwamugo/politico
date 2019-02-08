// Toggle between hiding and showing the dropdown Content
function toggleDropDown(target) {
  let open = 0;
  if (target.parentNode.querySelector('.dropdown-content').classList.contains('show')) {
    open = 1;
  }
  closeOpenItems();
  if (open != 1) {
    target.parentNode.querySelector('.dropdown-content').classList.add('show');
  }
  event.stopPropagation();
}


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName('dropdown-content');
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
           preview.src = '';
       }
  }

previewFile();  //calls the function named previewFile()


/* =================== */

// const viewParties = document.getElementById('viewParties');
const urlGetAllParties = 'http://localhost:3005/api/v1/parties';
// const urlGetAllCandidates;
// const urlGetElectionResults;

const renderParty = (party) => {
  const markup = `
  <div class="col-1-of-4 box">
      <img src="${party.logo_url}" alt="${party.name}">
      <h3 class="party-name">${party.name}</h3>
      <div class="party-size">
          <i class="ion-ios-star icon-small"></i>
          ${party.hq_address}
      </div>
      <div class="party-size">
          <i class="ion-social-twitter icon-small"></i>
          <button onclick="toggleDropDown(this)" class="dropbtn menu3__button">
            <svg class="dropbtn menu3">
                <use xlink:href="resources/img/sprite.svg#icon-menu3" class="dropbtn"></use>
            </svg>
          </button>
          <div id="myDropdown" class="dropdown-content font-fix">
            <a href="#">View Party</a>
            <a href="#modify">Modify</a>
          </div>
    </div>
  `;
  document.querySelector('.main-row').insertAdjacentHTML('beforeend', markup);
};


const getAllParties = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTU0OTUwMzE4MCwiZXhwIjoxNTQ5NzYyMzgwfQ.vq4xJ0BjNxo16WhtxeIn8zqRLGPa1V6dHmHCPKd0vBo';

  fetch(urlGetAllParties, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    }
  })
    .then(res => res.json())
    .then((json) => {
      console.log(json.data);
      const parties = json.data.allParties;
      parties.forEach(renderParty);
    })
    .catch(err => console.log(err));
};

// viewParties.addEventListener('click', () => {
//   getAllParties();
// });


getAllParties();

// const renderResults = parties => {
//   getAllParties()
//   parties.forEach(renderParty);
// }

// const modalCreate = document.getElementById('modalCreate');

// modalCreate.addEventListener('click', () => {
//   fetch('http://localhost:3005/api/v1/parties', {
//     headers: { 'Content-Type': 'application/json; charset=utf-8' },
//     method: 'POST',
//     body: JSON.stringify({
//       name: document.getElementById('name').value,
//       hq_address: document.getElementById('hq_address').value,
//       logo_url: document.getElementById('logo_url').value
//     })
//   })
//     .then(res => res.json())
//     .then((json) => {
//       if (json.data[0].token) {
//         localStorage.setItem('token', json.data[0].token);
//         window.location.href = 'ui/profile.html';
//         console.log(json);
//       }
//     })
//     .catch(err => console.log(err));
// });

// const viewParties = document.getElementById('viewParties');
// const urlGetAllParties = 'http://localhost:3005/api/v1/parties';
// const urlGetAllCandidates;
// const urlGetElectionResults;


// getAllParties() {
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTU0OTQ2Nzk0OCwiZXhwIjoxNTQ5NzI3MTQ4fQ.D_p4CLnvRCcGH2VSoUN5oEOljt1UfWkEI3BIjqlfgDI';

//   fetch(urlGetAllParties, {
//     withCredentials: true,
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': `${token}`
//     }
//   })
//     .then(res => res.json())
//     .then(json => {
//       window.location.href = 'ui/profile.html';
//       console.log(json.data.allParties);
//     })
//     .catch(err => console.log(err));
// };

// viewParties.addEventListener('click', () => {
//   getAllParties();
// });


// getParty(party_id) {
//   fetch(`http://localhost:3005/api/v1/parties/${party_id}`, {
//     withCredentials: true,
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': `${token}`
//     }
//   })
//   .then(res => res.json())
//   .then(json => {
//     const party = json.data[0];
//   })
//   .catch(error => console.log(error));
// }



// //Search box
// const controlSearch = async () => {
//     // 1) Get query from view
//     const query = 'pizza' //TODO

//     if (query) {
//       //2 New search object and add to state
//       StaticRange,search = new Search(query);

//       //3 Prepare UI for results

//       //4 Search for recipes
//       await state.search.getResults();

//       //5 Render results on UI
//     }
// }
// document.querySelector('.search').addEventListener('submit', e => {
//   e.preventDefault();
//   controlSearch();
// })
