


// weather API key:
const callUrl="http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&appid=12b347a877126259bdec859a46dc06db&units=metric";


let btn= document.getElementById("generate")

// Start action only on pressing the "Generate" button:
btn.addEventListener("click",startAction);

function startAction(e){
    let warningMsg = document.getElementById("warningMsg");
    const txtZip= document.getElementById("zip");
    const nwZipCd=txtZip.value;
    const userFeelTxt= document.getElementById("feelings");
    const userFeel=userFeelTxt.value;

    //Empty UI items first:
    document.getElementById("date").innerHTML="";
    document.getElementById("temp").innerHTML="";
    document.getElementById("content").innerHTML="";

    //Validation:
    if (nwZipCd=="") {
        warningMsg.innerHTML = "You have to enter a zip code first!";
    }else if(isNaN(nwZipCd)){
        warningMsg.innerHTML = "Zip code must be a number!";

    }else{
        // Empty warning message first:
        warningMsg.innerHTML = "";

        // Get zip code weather data using API:
        getZipCd(callUrl,nwZipCd,apiKey)

            //Then add data to post request:
            .then(function (data){
                postDta("/postDt", {date:data.dt, temp: data.main.temp, userFeel:userFeel});

                // Updating user interface with new weather data:
                updateUI();
            })

                const  updateUI=async ()=>{
                    const request = await fetch('/alldt');
                    try{
                        const allZipData= await request.json();
                        // Create a new date instance dynamically with JS
                        let d = new Date();
                        let curtime=allZipData.date;
                        let curMonth=d.getMonth(curtime) + 1;
                        let newDate = curMonth+'.'+ d.getDate(curtime)+'.'+ d.getFullYear(curtime);

                        let curTemp=allZipData.temp;
                        let curFeel=allZipData.userFeel;

                        //Update UI items with new weather data:
                        document.getElementById("date").innerHTML=`Current date: ${newDate}`;
                        document.getElementById("temp").innerHTML=`Current temperature: ${curTemp}`;
                        document.getElementById("content").innerHTML=`Your feeling: ${curFeel}`;
                    }catch (err){
                        console.log(err);
                    }
                }
    }
}


const getZipCd = async (callUrl,nwZipCd,apiKey)=>{
    const res = await fetch(callUrl+nwZipCd+apiKey)
    try {
        const data = await res.json();
        return data;
    }  catch(error) {
        console.log("Error:", error)
    }

}


const postDta= async (url="", data={})=>{
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers:
            {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(data),
    })
    try {
        const nwData = await response.json();
        return nwData;
    }catch(error) {
        // To handle an error:
        console.log("Error:", error)
    }
}












