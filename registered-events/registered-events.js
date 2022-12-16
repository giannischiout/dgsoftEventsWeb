
//Retrieve the data we save to session storage after the login verification:
let soneURL = sessionStorage.getItem("soneURL");
let eventCompany = sessionStorage.getItem("cccEventCompany");
let members = sessionStorage.getItem("cccMembers");



let soneElement = document.getElementById('soneURL');
async function fetchRegistered(soneURL, eventCompany, members) {
  let data = JSON.stringify({
    url: soneURL,
    cccEventCompany: eventCompany,
    cccmembers: members,
  })

  let requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow'
  };

  const res = await fetch("https://ccmde1.cloudon.gr/BNI/fetchEvents.php", requestOptions)
    .then(response => response.json())
    .then(res => {
      console.log(res)
      return res;
    })
    .catch(error => console.log('error', error));

  return res;

}

const registeredResult = fetchRegistered(soneURL, eventCompany, members)

let btn = document.getElementById('join-event');
console.log(btn)
btn.addEventListener('click', () => {
  window.location.href = "../upcomingEvents/upcomingEvents.html";
})
