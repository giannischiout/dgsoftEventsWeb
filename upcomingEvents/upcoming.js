// alert('upcmoming js');

let soneURL = sessionStorage.getItem("soneURL");
let eventCompany = sessionStorage.getItem("cccEventCompany");
let members = sessionStorage.getItem("cccMembers");

let totalCost = 0;
let totalGuests = 0;
let cccBNIevents = '';
let eventDate = '';


//GET ELEMENTS:
let submitBtn = document.querySelector('.submit-event-btn');
// console.log(submitBtn)
let checkbox = document.getElementById('participate-checkbox');
let guestBox = document.getElementById('guest-box')
let guestInput = document.querySelector('.guest-input');
let addBtn = document.querySelector('.guest-btn-add');
let removeBtn = document.querySelector('.guest-btn-remove');
let showGuestCost = document.querySelector('#guest-cost');
let checkboxContainer = document.querySelector('.event-checkbox-div');
let option = document.createElement("option")


console.log('1')
console.log(option.value)
//STEP 1: CREATE THE SELECT DROPDOWN TO SHOW EVENT TIME 
let select = document.getElementById('select-event');
let priceInput = document.querySelector('.price-input')

async function fetchAPI(postURL, raw) {
  let requestOptions = {
    method: 'POST',
    body: JSON.stringify(raw),
    redirect: 'follow'
  };

  const res = await fetch(postURL, requestOptions)
    .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(error => console.log('error', error));
  return res;

}

const handleFetch = async () => {
  let raw = {
    url: soneURL,
    cccEventCompany: eventCompany,
    cccmembers: members,
  }

  const data = await fetchAPI("https://ccmde1.cloudon.gr/BNI/featuredEvents.php", raw)
  // const data = await fetchAPI("/BNI/featuredEvents.php", raw)
  showdata(data.result);

}
handleFetch();

select.addEventListener('change', () => {
  console.log(select.value)
  if (select.value !== 'Choose Event') {
    checkboxContainer.classList.remove('hide')
  }
})


function showdata(res) {

  showGuestCost.innerHTML = `(cost per guest: ${res[0].guestCost}€)`;


  //Loop throught data from post request: handlefetch and add items to select input: 
  for (let event of res) {

    option.value = event.eventDate;
    option.text = event.eventDate;
    select.appendChild(option);
    cccBNIevents = event.cccBNIevents;
    eventDate = event.eventDate;

  }


  function participateFunc() {
    if (checkbox.checked === true) {

      guestBox.classList.remove('hide')
      checkbox.disabled = true;
      submitBtn.classList.remove('disabled-btn');
      submitBtn.classList.add('enabled-btn');
      submitBtn.removeAttribute('disabled')
      totalCost += parseInt(res[0].eventCost);
      priceInput.innerHTML = totalCost;
    }
  }




  checkbox.addEventListener('click', participateFunc)




  let count = 0;
  addBtn.addEventListener('click', () => {
    ++count
    guestInput.innerHTML = count;
    totalGuests += count
    totalCost += parseInt(res[0].guestCost)
    priceInput.innerHTML = totalCost;
  })

  removeBtn.addEventListener('click', () => {
    if (count !== 0) {
      --count
      guestInput.innerHTML = count;
      totalGuests -= count
      totalCost -= parseInt(res[0].guestCost)
      priceInput.innerHTML = totalCost;
    }


  })


}





// if user participates, enable submit button:


const handlePostEvent = async () => {
  console.log('click submit')
  let raw = {
    url: soneURL,
    cccEventCompany: eventCompany,
    cccmembers: members,
    guests: totalGuests,
    cost: totalCost,
    cccBNIevents: cccBNIevents,
    eventDate: eventDate,
  }

  const data = await fetchAPI("https://ccmde1.cloudon.gr/BNI/postNewRegistrations.php", raw)
  console.log(data)

}




submitBtn.addEventListener('click', handlePostEvent)










