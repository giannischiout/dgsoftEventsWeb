

const form = document.getElementById('login-form');
form.addEventListener('submit', fetchAPI)




async function fetchAPI(e) {
  e.preventDefault();
  let password = document.getElementById('password').value;
  let username = document.getElementById('username').value;
  console.log(password, username)

  let data = JSON.stringify({
    username: username,
    password: password,
  })

  let requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow'
  };

  const res = await fetch('https://ccmde1.cloudon.gr/BNI/login.php?validationToken=123', requestOptions)
    .then(response => response.json())
    .then(res => {
      console.log(res)
      return res;
    })
    .catch(error => console.log('error', error));

  try {
    if (res !== null) {
      sessionStorage.setItem("soneURL", res.soneURL);
      sessionStorage.setItem("cccEventCompany", res.cccEventCompany);
      sessionStorage.setItem("cccMembers", res.cccMembers);

      if (res.result === 'OK') {
        alert('ok')
        // window.location.href = "../bniApp/registeredEvents";
        window.location.href = "/bniApp/registered-events/index.php";
        // window.location.replace("./registerd-events");

      } else {
        alert('login error')
      }

    }
  } catch (e) {
    console.log(e)
  }
  return res;
}





