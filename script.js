      // Get the parent container where you want to append the nested divs
      let parentContainer = document.body; // You can replace this with the actual container element you want

      var container_div = document.createElement("div");
      container_div.setAttribute("class", "container");

      var h=document.createElement("h1");
      h.id="title";
      h.classList.add("text-center");
      h.innerText="Weather Forecast";

      // Create the new div with rows class
      var row = document.createElement("div");
      row.setAttribute("class", "row");

      // Rest Countries API fetch
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => {
          // console.log("data fetched");
          return response.json();
        })
        .catch(() => {
          console.log("not feteched");
        })
        .then((data) => {
        //   console.log(data);
          var data_len = data.length;

          data.forEach(ele => {
            var name= ele.name.common;
            var capital = ele.capital;
            var flag = ele.flags.png;
            var region = ele.region;
            var lat = ele.latlng[0];
            var lng = ele.latlng[1];
            var country_code = ele.cca3;

            var cols = document.createElement("div");
            cols.setAttribute("class", "col-lg-4  col-sm-12");

            // Create the card div with Bootstrap classes
            var card = document.createElement("div");

            // card.setAttribute("class","card mt-2"); either
            card.classList.add("card", "mt-2","bg-transparent");
            
            //  Create the card header div
            var card_header = document.createElement("div");
            // card_header.setAttribute("class","card-header  d-flex justify-content-center"); either
            card_header.classList.add(
              "card-header",
              "d-flex",
              "justify-content-center",
            );
            card_header.setAttribute("style","background-color:lightsteelblue"); //#ce71af
            card_header.textContent = name;

            // To create the Card body
            var card_body = document.createElement("div");
            card_body.setAttribute("class", "card-body");

            // Card title with inside imge tag to center the  image
            var card_title = document.createElement("h5");
            card_title.setAttribute("class", "card-title");

            var image = document.createElement("img");
            // Set attributes for the image
            image.src = flag; // Set the path to your image
            image.alt = "flag";
            image.setAttribute("class", "image");
            card_title.appendChild(image);

            // Create the paragraph tag
            var p = document.createElement("p");
            p.setAttribute("class", "card-text");
            p.innerHTML = `<b>Capital: ${capital}<br>Region: ${region}<br>Country Code: ${country_code}<br>Latitude: ${lat}<br>Longitude: ${lng}</b>`;

            // Create the button div with a link button
            var button_cont=document.createElement("div");
            button_cont.setAttribute("class","btn_cont");
            var button_div = document.createElement("button");
            button_div.id = "button";
            button_div.innerText = "Wheather_details";
            button_div.classList.add("btn", "btn-outline-secondary");
            button_cont.appendChild(button_div);

            // promise automaticall call fun while running.
            // so it automatically run and fetch for every loop to avoid this called the fetch_data funtion inside the function

            button_div.addEventListener("click", function() {
                    fetch_data(lat, lng);
                });
     
            // Appending Nested elements from inside to outside (or) Append elements to build the hierarchy
            container_div.append(h);
            card_body.appendChild(card_title);
            card_body.appendChild(p);
            card_body.appendChild(button_cont);

            card.appendChild(card_header);
            card.appendChild(card_body);

            cols.appendChild(card);
            row.appendChild(cols);
            container_div.append(row);
         

            //  Append the main container to the body of the document
            document.body.append(container_div);
            parentContainer = container_div;
        });
          
        });

        // function call end of the loop return the lat,lng of clicked country
        function fetch_data(lat,lng)
        {
            // Wheather API fetch
            var api_key = "dd233cc1d3570bad7488dadc51d7e682";
            var base_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`;

            // Get the response data from the api using fetch method. To show the wheather
            //  in seperate container

            fetch(base_url)
            .then((response) => response.json())

            .then((wheather_data) => {  
            var image = `https://openweathermap.org/img/w/${wheather_data.weather[0].icon}.png`;
            console.log(image);
            document.getElementById('infoModalLabel').innerHTML=`Wheather is <img src=${image}>`;
            document.getElementById("infoModalBody").innerHTML =`<p><b>City: </b>${wheather_data.name}<br>
            <b>weather: </b>${wheather_data.weather[0].main}<br>
            <b>description: </b>${wheather_data.weather[0].description}<br>
            <b>temp: </b>${wheather_data.main.temp}<br>
            <b>humidity: </b>${wheather_data.main.humidity}<br>
            <b>wind speed: </b>${wheather_data.wind.speed}<br>
            </p>`;      

            // Show the modal
            $('#infoModal').modal('show');
                })
                .catch((error)=>console.log("Error:",error));
            
        }
