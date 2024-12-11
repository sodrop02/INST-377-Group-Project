

function pollenForcast(){
    const location = document.getElementById("location").value;
    console.log(location);
    const city = location.split(",")[0].trim();
    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CZ", "CO", "CT", "DE", "DC",
        "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY",
        "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE",
        "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR",
        "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI",
        "VA", "WA", "WV", "WI", "WY"
    ];
    const state_or_country = location.split(",")[1].trim();
    if (states.includes(state_or_country)){
        apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=US&state=${state_or_country}`;

    }
    else{
        apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${state_or_country}`;
    }

    const locationapiKey = 'D/fEvDO8izx8y0EtZRBH3w==gJqDGZgxXwWrVrV6';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
        'X-Api-Key': locationapiKey
        }
    })
        .then(response => response.json()) 
        .then(location_data => {
            console.log(location_data);
            const lat = location_data[0]["latitude"];
            const long =location_data[0]["longitude"];
    const pollenAPIkey = "AIzaSyBbIuOmITDop5cmqoFKlgNTdgL50d5ikts";
    console.log(lat);
    console.log(long);
    fetch(`https://pollen.googleapis.com/v1/forecast:lookup?key=${pollenAPIkey}&location.longitude=${long}&location.latitude=${lat}&days=5`)
    .then(response => response.json())
    .then(data => {
       
        data["dailyInfo"][0]["pollenTypeInfo"].forEach((plant) =>{
            const holder = document.createElement("div");
            holder.classList.add("splide__slide");
            const name = document.createElement("p");
            name.innerHTML = plant["displayName"];
            holder.appendChild(name)

            if ('indexInfo' in plant){
                console.log("yes");
                
                const image = document.createElement("img");
                const UPI_value = document.createElement("p");
                UPI_value.innerHTML = `Universal Pollen Index: ${plant['indexInfo']['value']}`
                const UPIbutton = document.createElement("button");
                UPIbutton.innerHTML = "Show Index Description";
                const UPIInfo = document.createElement("p");
                UPIInfo.innerHTML = plant['indexInfo']["indexDescription"];
                UPIInfo.style.display = 'none';
                UPIbutton.addEventListener("click", () => {
                    if (UPIInfo.style.display === 'none') {
                        UPIInfo.style.display = 'block';  
                    } else {
                        UPIInfo.style.display = 'none';  
                    }
                })
                data["dailyInfo"][0]['plantInfo'].forEach((plantInfo) => {
                    if('indexInfo' in plantInfo){
                        if (plantInfo['plantDescription']['type'] == plant['code']){
                            
                            image.src = plantInfo['plantDescription']['pictureCloseup'];
                            image.width = 300;
                            
                        }
                    }
                })
                
                
               
                holder.appendChild(UPI_value);
                holder.appendChild(UPIbutton);
                holder.appendChild(UPIInfo);
                holder.appendChild(image);
                
            }
            const container = document.getElementsByClassName("splide__list")[0];
            container.appendChild(holder);
            console.log(document.querySelector('.splide__list').outerHTML);

            });

            
        });
        

});
}

document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('.splide');
    splide.mount();
  });
window.onload = pollenForcast;