<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://kit.fontawesome.com/4544634ff5.js" crossorigin="anonymous"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="../style.css">
  <title>Register Events</title>
</head>
<body>
  <section id="registered-events">
      <button id="join-event"> join new event</button>  
      <div class="events-wrapper">
          <div class="event-single-wrapper">
            <!-- EVENT TOP -->
            <div class="event-header event-header-shadow">
                <div class="event-time">
                  <i class="fa-regular fa-clock"></i>
                  <p>21-01-2022 05:35</p>
                </div>
                <i class="fa-solid fa-arrow-down"></i>
            </div>
            <!-- EVENT BOTTOM -->
            <div class="event-body">
                <div class="event-body-row">
                    <p>Comments:</p>
                    <p>some random comment</p>
                </div>
                <div class="event-body-row">
                  <p>Location:</p>
                  <p>some random location</p>
                </div>
                <div class="flex-row">
                  <div class="guest-left-item">
                    <p>Guests:</p>
                    <div class="change-guests">
                      <p>5</p>
                    </div>
                   
                  </div>
                  <div>
                    <button  class="btn edit-button">edit</button>
                    <button class="btn save-button">save</button>
                  </div>
                </div>
                <div class="flex-row">
                  <span>Total Cost:</span>
                  <div class="price-div">
                    <span class="total-cost">100</span>
                    <span class="euro">€</span>
                  </div>
                </div>
            </div>
      </div>
      </div>
  </section>
  
  <script src="./registered-events.js" ></script>
</body>
</html>