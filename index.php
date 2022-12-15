

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./style.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet">
  <title>Login</title>
</head>
<body>
  <nav class="nav">
    <div class="login-tagline">
        <h1>BNI <span class="eventsTagline ">Events</span></h1>
        <h2>SW 2022-23</h2>
    </div>
  </nav>
  <section class="container">
    <div class="form-container">
     
 <!-- <div class="login-tagline">
        <h1>BNI <span class="eventsTagline ">Events</span></h1>
        <h2>SW 2022-23</h2>
    </div> -->

      <form id='login-form' method="POST">
        <input type="text" id="username" name="username"  placeholder="Username"  required>
        <input type="password" id="password" name="password"  placeholder="Password"  required>
        <div class="checkbox-container">
          <input type="checkbox" id="login-check">
          <label for="login-check">Remember my password</label>
        </div >
        <input type="submit" value="Login">
      </form>


    </div>
  </section>

  <script type="module" src="index.js"></script>

</body>
</html>


