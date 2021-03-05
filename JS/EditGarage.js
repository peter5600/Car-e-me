/* I need to have the ability to update a garage
so get the info from the user in the form and send it to the api
*/
var GarageID =0;
var GarageName;
const Submit = async (e) => {
    e.preventDefault();
    let NewName = document.querySelector("#GarageName").value;
    console.log("The new name will be " + NewName)
    console.log()
    await UpdateGarage(NewName, GarageID)
}

const UpdateGarage = async (NewName, ID) => {
    console.log(NewName + " " + ID)
    await fetch('http://localhost:9092/garage/update/'+ID, {
        method: "put",
        headers: {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({
            name : NewName
        })
    }).then((response) => {
        if(response.status !== 200){
            console.log("Couldn't update the name")
        }
        console.log(response.status)
        return response.json();
    }).then((data) => {
        console.log("new name is " + data.name);
    }).catch((error) => { 
        console.log(error)
    })
}

const LoadGarage = async (ID) => {//async so i can await fetch
    await fetch('http://localhost:9092/garage/read/'+ID, {//wait for this to end before passing on
        method: "get",
        headers: {
            "Content-type" : "application/json",
            "Accept" : "*/*"
        }
    }).then((response) => {
        console.log(response.status)
        if(response.status !== 200){
            if(response.status === 500){
                alert("Internal server error - The garage choosen dosen't exist please check the id")
            }
            else if(response.status === 404){
                alert("Not found - The garage choosen dosen't exist please check the id")
            }
            return;
        }
        return response.json();//needs to be returned ask ed y
    }).then((response) => {
        console.log("The response was "+JSON.stringify(response.name))
        GarageName = response.name;

    }).catch((err) => {
        console.log("Messed Up")
    })
    
}

( async function() {
    const params = new URLSearchParams(window.location.search);
    GarageID = params.get('GarageID');

    console.log("GarageID is " + GarageID)
    document.querySelector("#Submit").addEventListener("click", Submit);

    //load in the existing name
    await LoadGarage(GarageID);//await this so that next line loads properley
    console.log("Current Garage Name is " + GarageName)
    document.querySelector("#GarageName").value = GarageName;
    
 })();



 