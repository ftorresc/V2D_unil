function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

let countryname = window.location.pathname.toString().replace("/", "").split(".")[0];

d3.csv('travels.csv').then(data =>{
    console.log("Data",data)
    for (var i= 0; i < data.length; i++) {
        if (data[i].country.toString() == countryname) {
            console.log(capitalizeFirstLetter(data[i].country))
            document.getElementById("title").innerHTML = capitalizeFirstLetter(data[i].country) + "'s travel statistics during Euro 2020";
            document.getElementById("stats").innerHTML = "Travels:" + "<br>" + data[i].travels + "<br><br>" + "Distance traveled during groups phase:" + data[i].distancegroups + " km" + "<br><br>" + "Total distance traveled during the tournament:" + data[i].distancetotal + " km";
        }
        else {
            continue
        }
    }
})

