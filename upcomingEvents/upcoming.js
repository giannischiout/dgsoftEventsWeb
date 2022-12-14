// alert('upcmoming js');

let soneURL = sessionStorage.getItem("soneURL");
let eventCompany = sessionStorage.getItem("cccEventCompany");
let members = sessionStorage.getItem("cccMembers");

console.log(soneURL, eventCompany)

async function fetchUpcoming(soneURL, eventCompany, members) {

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

  const res = await fetch("https://ccmde1.cloudon.gr/BNI/featuredEvents.php", requestOptions)
    .then(response => response.json())
    .then(res => {
      // console.log('-------- UPCOMING EVENTS -------')
      // console.log(res)
      return res;
    })
    .catch(error => console.log('error', error));

  return res;

}

const handleFetch = async () => {
  const data = await fetchUpcoming(soneURL, eventCompany, members)
  showdata(data.result);

}

function showdata(res) {
  console.log('inner data')
  let guestInput = document.querySelector('.guest-input');
  let addBtn = document.querySelector('.guest-btn-add');
  let removeBtn = document.querySelector('.guest-btn-remove');

  //STEP 1: CREATE THE SELECT DROPDOWN TO SHOW EVENT TIME 
  let select = document.getElementById('select-event');
  let checkboxDiv = document.getElementById('participate-checkbox');
  let priceInput = document.querySelector('.price-input')
  checkboxDiv.addEventListener('click', participateFunc)

  let totalCost = 0;


  function participateFunc() {
    if (checkboxDiv.checked === true) {
      totalCost += parseInt(res[0].eventCost);
      priceInput.innerHTML = totalCost;
    }
  }



  for (let event of res) {
    let option = document.createElement("option")
    option.value = event.eventDate;
    option.text = event.eventDate;
    select.appendChild(option);
  }


  let count = 0;

  addBtn.addEventListener('click', () => {
    ++count

    guestInput.innerHTML = count;
    totalCost += parseInt(res[0].guestCost)
    priceInput.innerHTML = totalCost;
  })


  removeBtn.addEventListener('click', () => {
    if (count !== 0) {
      --count
      guestInput.innerHTML = count;
      totalCost -= parseInt(res[0].guestCost)
      priceInput.innerHTML = totalCost;
    }


  })


}


handleFetch();


let upcomingBtn = document.getElementById('upcoming-event')




