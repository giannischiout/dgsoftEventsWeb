
// Retrieve the data we save to session storage after the login verification:
let soneURL = sessionStorage.getItem("soneURL");
let eventCompany = sessionStorage.getItem("cccEventCompany");
let members = sessionStorage.getItem("cccMembers");
let username = sessionStorage.getItem("username");
let count = 0;

async function fetchAPI(url, raw) {
  let requestOptions = {
    method: 'POST',
    body: JSON.stringify(raw),
    redirect: 'follow'
  };

  const res = await fetch(url, requestOptions)
    .then(response => response.json())
    .then(res => res)
    .catch(error => console.log('error', error));

  return res;

}




//NAVIGATE TO ADD EVENT PAGE:
// let btn = document.getElementById('join-event');
// console.log(btn)
// btn.addEventListener('click', () => {
//   window.location.href = "../upcomingEvents/upcomingEvents.html";
// })

let eventContainer = document.querySelector('.events-wrapper');

const handleEvents = async () => {

  let raw = {
    url: soneURL,
    cccEventCompany: eventCompany,
    cccmembers: members,
  }
  console.log(raw)
  const res = await fetchAPI("https://ccmde1.cloudon.gr/BNI/fetchEvents.php", raw).then(res => res.result)
  console.log(res)
  //get all document elements:
  //all events container: 


  console.log(eventContainer)
  for (let event of res) {

    createHeader(event);
    createBody(event);
  }
}

//Both functions use these:
let singleEvent = document.createElement('div');
singleEvent.classList.add('event-single-wrapper')


function createHeader(event) {

  let eventHeader = document.createElement('div');
  let eventTimeContainer = document.createElement('div');
  let eventTime = document.createElement('p')
  let eventTimeIcon = document.createElement('i');
  let expandIcon = document.createElement('i');
  // console.log(eventTimeIcon)

  eventContainer.classList.add('events-wrapper')

  eventHeader.classList.add('event-header')
  eventTimeContainer.classList.add('event-time')
  eventTimeIcon.classList.add('fa-regular', 'fa-clock');
  expandIcon.classList.add('fa-solid', 'fa-arrow-down');

  eventContainer.appendChild(singleEvent);
  singleEvent.appendChild(eventHeader);
  eventHeader.appendChild(eventTimeContainer);
  eventTimeContainer.appendChild(eventTimeIcon);
  eventTimeContainer.appendChild(eventTime);
  eventHeader.appendChild(expandIcon);
  eventTime.innerHTML = event.eventDATE
}



function createBody(event) {
  let eventBody = document.createElement('div');
  eventBody.classList.add('event-body');

  singleEvent.appendChild(eventBody);

  let eventBodyRow1 = document.createElement('div');
  let eventBodyRow2 = document.createElement('div');
  let eventBodyRow3 = document.createElement('div');
  let eventBodyRow3Left = document.createElement('div');
  let eventBodyRow3Right = document.createElement('div');
  let eventBodyRow4 = document.createElement('div');
  let eventBodyRow4PriceDiv = document.createElement('div');

  eventBodyRow1.classList.add('event-body-row');
  eventBodyRow2.classList.add('event-body-row');
  eventBodyRow3.classList.add('flex-row');
  eventBodyRow4.classList.add('flex-row');
  eventBodyRow3Left.classList.add('guest-left-item');
  eventBodyRow4PriceDiv.classList.add('price-div')

  //append all rows:
  eventBody.appendChild(eventBodyRow1)
  eventBody.appendChild(eventBodyRow2)
  eventBody.appendChild(eventBodyRow3)
  eventBody.appendChild(eventBodyRow4)

  //creation of elements inside the rows and divs:
  //create the buttons:
  let editBtn = document.createElement('button');
  let saveBtn = document.createElement('button');
  editBtn.classList.add('btn', 'edit-button');
  saveBtn.classList.add('btn', 'save-button');
  editBtn.textContent = 'edit';
  saveBtn.textContent = 'save';



  //titles:
  let pTitle1 = document.createElement('p');
  let pTitle2 = document.createElement('p');
  let pTitle3 = document.createElement('p');
  let pTitle4 = document.createElement('p');
  //create all titles:
  pTitle1.innerHTML = "Comments:";
  pTitle2.innerHTML = "Location:";
  pTitle3.innerHTML = "Guests:";
  pTitle4.innerHTML = "Total Cost:";
  //create all body paragraph elements:

  //1. create the comment section:
  let pBody1 = document.createElement('p');
  if (event.sxolia === '') {
    pBody1.innerHTML = 'No comments for this event'
  } else {
    pBody1.innerHTML = event.sxolia;
  }

  //2.  gps coordinates for the event:
  let a = document.createElement('a');
  a.classList.add('gps-location')
  let link = document.createTextNode('Event Space: gps coordinates')
  a.appendChild(link);
  a.href = event.eventSpace;

  //3. paragraph for the dynamic number of guests
  let numGuests = document.createElement('p');
  numGuests.innerHTML = event.guests;
  numGuests.classList.add('guestNumber')

  let plusBtn = document.createElement('button');
  let minusBtn = document.createElement('button');
  plusBtn.classList.add('mathBtn');
  minusBtn.classList.add('mathBtn');
  plusBtn.textContent = '+';
  minusBtn.textContent = '-';


  //4:  price div:
  let totalCost = document.createElement('span');
  let costNum = parseInt(event.eventCost) + (parseInt(event.guests) * parseInt(event.guestCost));
  totalCost.innerHTML = costNum;
  totalCost.classList.add('total-cost')
  let euro = document.createElement('span');
  euro.textContent = '€'
  euro.classList.add('euro');


  //Append all elements
  eventBodyRow1.appendChild(pTitle1);
  eventBodyRow1.appendChild(pBody1);
  eventBodyRow2.appendChild(pTitle2);
  eventBodyRow2.appendChild(a);
  //Append elements to Guest Row:
  eventBodyRow3.appendChild(eventBodyRow3Left);
  eventBodyRow3.appendChild(eventBodyRow3Right);


  eventBodyRow3Left.appendChild(pTitle3);
  let changeGuest = document.createElement('div');
  changeGuest.classList.add('change-guests')
  eventBodyRow3Left.appendChild(changeGuest);

  changeGuest.appendChild(plusBtn)
  changeGuest.appendChild(numGuests)
  changeGuest.appendChild(minusBtn)


  eventBodyRow3Right.appendChild(editBtn);
  eventBodyRow3Right.appendChild(saveBtn);

  //Total Cost Row:
  eventBodyRow4.appendChild(pTitle4);
  eventBodyRow4.appendChild(eventBodyRow4PriceDiv);
  eventBodyRow4PriceDiv.appendChild(totalCost);
  eventBodyRow4PriceDiv.appendChild(euro);
  // eventBodyRow4PriceDiv.appendChild()



  // login

  // let count = 0;
  let totalGuests = parseInt(event.guests);
  const handleFunc = () => {
    console.log('edit')
    plusBtn.classList.add('show-mathBtn');
    minusBtn.classList.add('show-mathBtn');

    plusBtn.addEventListener('click', () => {
      totalGuests += 1;
      numGuests.innerHTML = totalGuests;

      costNum = costNum + parseInt(event.guestCost);
      totalCost.innerHTML = costNum;
    })


    minusBtn.addEventListener('click', () => {
      if (totalGuests == 0) {
        return;
      }
      totalGuests -= 1;
      numGuests.innerHTML = totalGuests;
      costNum = costNum - parseInt(event.guestCost);
      totalCost.innerHTML = costNum;
    })


  }
  editBtn.addEventListener('click', handleFunc);

  let rawUpdate = {
    cccBNIevents: event.cccBNIevents,
    cccEventCompany: eventCompany,
    username: username,
    guests: totalGuests,
    cost: costNum,
    url: soneURL,
    cccMembers: members,
    cccParousies: event.cccParousies,
  }
  console.log(rawUpdate)

  const handleUpdate = async () => {
    const res = await fetchAPI("https://ccmde1.cloudon.gr/BNI/updateRegistrations.php", rawUpdate)
    console.log(res)
  }
  saveBtn.addEventListener('click', handleUpdate)



}




handleEvents();





