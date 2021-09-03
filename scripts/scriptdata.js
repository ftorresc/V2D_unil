function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

let pagename = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

let countryname = pagename.toString().replace("/", "").split(".")[0];
if (countryname == "northmacedonia") {
    countryname = "north macedonia"
} else if (countryname == "czechrepublic") {
    countryname = "czech republic"
}

console.log(countryname)

d3.csv('../travels.csv').then(data =>{
    console.log("Data",data)
    for (var i= 0; i < data.length; i++) {
        if (data[i].country.toString() == countryname) {
            console.log(capitalizeFirstLetter(data[i].country))
            document.getElementById("title").innerHTML = capitalizeFirstLetter(data[i].country) + "'s travel statistics during Euro 2020";
            document.getElementById("stats").innerHTML = "<b>Travels:</b>" + "<br>" + data[i].travels + "<br><br>" + "<b>Distance traveled during groups phase:</b>" + data[i].distancegroups + " km" + "<br><br>" + "<b>Total distance traveled during the tournament:</b>" + data[i].distancetotal + " km" +"<br><br>" + "<b>Average distance per match:</b>" + data[i].averagedistance + " km";
        }
        else {
            continue
        }
    }
})

