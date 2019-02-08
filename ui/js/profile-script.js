const viewParties = document.getElementById('viewParties');
const urlGetAllParties = 'http://localhost:3005/api/v1/parties';
const urlGetAllCandidates;
const urlGetElectionResults;


const getAllParties = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTU0OTQ2Nzk0OCwiZXhwIjoxNTQ5NzI3MTQ4fQ.D_p4CLnvRCcGH2VSoUN5oEOljt1UfWkEI3BIjqlfgDI';

  fetch(urlGetAllParties, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    }
  })
    .then(res => res.json())
    .then(json => {
      window.location.href = 'ui/profile.html';
      console.log(json.data.allParties);
    })
    .catch(err => console.log(err));
};

viewParties.addEventListener('click', () => {
  getAllParties();
});
