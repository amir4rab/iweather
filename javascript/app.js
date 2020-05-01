const addNewWeatherLogic = ()=>{
    const permoteState = document.querySelector(".addNewWeather--permote-state");
    const inputState = document.querySelector(".addNewWeather--input-state");
    permoteState.addEventListener("click",()=>{
        inputState.style = "display:flex;";
        permoteState.style = "display:none;";
    });
    
    const searchBar = ()=>{
        document.getElementById("cityInput").addEventListener('keyup',(e)=>makeResult(e.target.value));
        const makeResult= (data)=>{
            const rSection = document.querySelector(".addNewWeather--result-section");
            rSection.innerHTML = "";
            getCityData().forEach((citydata)=>{
                if(citydata.cityNameEn.toLowerCase().includes(data.toLowerCase()) && data!=""){
                    const div = document.createElement("div");
                    div.className = "addNewWeather--result";
                    const a = document.createElement("a");
                    a.innerHTML = citydata.cityNameEn;
                    a.addEventListener("click",()=>{
                        rSection.innerHTML = "";
                        document.getElementById("cityInput").value = "";
                        inputState.style = "display:none;";
                        permoteState.style = "display:flex;";
                        //Making Card
                        const tempCard = new TempCard(citydata);
                        DataManager.S_setData(citydata);
                    })
                    div.appendChild(a);
                    rSection.appendChild(div);
                }
            });
        }
    }
    searchBar()
}
const Api = async (cityData)=>{
    const data = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${cityData.lat}&lon=${cityData.long}&key=9cb48110d1dc4e6f880c228ada36c00f`);
    const jData = await data.json();
    return jData
}
const iconLogic = (name)=>{
    let iconUrl,icon;
    if(name === "Thunderstorm with light rain" || name === "Thunderstorm with rain" || name === "Thunderstorm with heavy rain" || name === "Thunderstorm with light drizzle" || name === "Thunderstorm with drizzle" || name === "Thunderstorm with heavy drizzle" || name === "Thunderstorm with Hail"){
        icon = "tstorms";
    }else if(name === "Light Drizzle" || name === "Drizzle" || name === "Heavy Drizzle" || name === "Light Rain" || name === "Moderate Rain" || name === "Heavy Rain" || name === "Freezing rain" || name === "Light shower rain" || name === "Shower rain" || name === "Heavy shower rain"){
        icon = "rain";
    }else if(name === "Snow shower" || name === "Heavy snow shower" || name === "Light snow" || name === "Snow" || name === "Heavy Snow" || name === "Mix snow/rain"){
        icon = "snow";
    }else if(name === "Flurries"){
        icon = "flurries";
    }else if(name === "sleet" || name === "Heavy sleet"){
        icon = "sleet";
    }else if(name === "Smoke" || name === "Haze" || name === "Sand/dust" || name === "Fog" || name === "Freezing Fog"){
        icon = "fog";
    }else if(name === "Few clouds"){
        icon = "mostlysunny";
    }else if(name === "Scattered clouds" || name === "Broken clouds"){
        icon = "mostlycloudy";
    }else if(name === "Overcast clouds"){
        icon = "cloudy";
    }else if(name === "Clear sky"){
        icon = "sunny";
    }
    const time = new Date;
    if(6 > time.getHours() && time.getHours() > 18){
        iconUrl = `images/weatherIcon/black/nt_${icon}.svg`;
    }else{
        iconUrl = `images/weatherIcon/black/${icon}.svg`;
    }
    return iconUrl;
}
const timeOffsetLogic = (inputTime)=>{
    const time = new Date();
    const offset = time.getTimezoneOffset();
    const inputTimeInMinutes = inputTime.split(":");
    const minuts = parseInt(inputTimeInMinutes[0]) + parseInt(inputTimeInMinutes[0])*60 - offset;
    let localTimeHour = 0;
    while(localTimeHour*60 + 60 < minuts){
        localTimeHour++
    }
    const localTimeMinutes = minuts - localTimeHour*60;
    if(localTimeHour > 24){
        localTimeHour = localTimeHour -24;
    }
    const chek = (input)=>{
        let outPut;
        if(input<10){
            return 0 + String(input)
        }else{
            return input
        }
    }
    return `${chek(localTimeHour)}:${chek(localTimeMinutes)}`;
}
class TempCard{
    constructor(data){
        //Making the card body
        const card = document.createElement("div");
        card.className = "card";
        //Making close Btn
        const close = document.createElement("div");
        close.className = "close";
        const closeSpan = document.createElement("span");
        closeSpan.className = "material-icons";
        closeSpan.innerHTML = "cancel";
        close.appendChild(closeSpan);
        card.appendChild(close);
        //Making deatils
        const weatherStatus = document.createElement("div");
        weatherStatus.className = "weather-status";
        //Weather icon
        const weatherIcon = document.createElement("div");
        weatherIcon.className = "weather-icon";
        const weatherIconImg = document.createElement("img");
        weatherIconImg.src =  "images/weatherIcon/black/clear.svg";
        weatherIcon.appendChild(weatherIconImg);
        weatherStatus.appendChild(weatherIcon);
        //Weather Temp
        const weatherTemp = document.createElement("div");
        weatherTemp.className = "weather-temp";
        weatherTemp.innerHTML = `0`;
        weatherStatus.appendChild(weatherTemp);
        //City Name
        const cityName = document.createElement("div");
        cityName.className = "weather-cityname";
        cityName.innerHTML = ``;
        weatherStatus.appendChild(cityName);
        //Appending weatherStatus to card
        card.appendChild(weatherStatus);
        //Appending card to page
        const list = document.querySelector(".items-section");
        const lastChild = document.getElementById("NewWeather");
        list.insertBefore(card,lastChild);
        //Show more section
        const moreDetail = document.createElement("div");
        moreDetail.className = "more-detail";
        const moreDetailSun = document.createElement("div");
        moreDetailSun.className = "more-detail--sun";
        const sunSet = document.createElement("div");
        sunSet.className = "sun-set";
        moreDetailSun.appendChild(sunSet);
        const sunRise = document.createElement("div");
        sunRise.className = "sun-rise";
        moreDetailSun.appendChild(sunRise);
        moreDetail.appendChild(moreDetailSun);
        const moreDetailWind = document.createElement("div");
        moreDetailWind.className = "more-detail--wind";
        const windDir = document.createElement("div");
        windDir.className = "wind-dir";
        moreDetailWind.appendChild(windDir);
        const windSpeed = document.createElement("div");
        windSpeed.className = "wind-speed";
        moreDetailWind.appendChild(windSpeed);
        moreDetail.appendChild(moreDetailWind);
        card.appendChild(moreDetail);
        //Show more Btn
        const showMore = document.createElement("div");
        showMore.className = "more-btn";
        const showMoreBtn = document.createElement("a");
        showMoreBtn.innerHTML =  "Show More";
        showMoreBtn.addEventListener("click",()=>{
            if(showMoreBtn.innerHTML === "Show More"){
                moreDetail.style = "display:flex;";
                showMoreBtn.innerHTML = "Show Less";
            }else{
                moreDetail.style = "display:none;";
                showMoreBtn.innerHTML = "Show More";
            }
        });
        showMore.appendChild(showMoreBtn);
        card.appendChild(showMore);
        //Geting data from api 
        async function setData(inputData){
            let apiDat;
            await Api(inputData).then(jData => apiDat = jData).catch(err => console.log(err));
            console.log(apiDat)
            cityName.innerHTML = inputData.cityNameEn;
            weatherTemp.innerHTML = apiDat.data[0].app_temp;
            weatherIconImg.src =  iconLogic(apiDat.data[0].weather.description);
            sunRise.innerHTML = `sun rise: ${timeOffsetLogic(apiDat.data[0].sunrise)}`;
            sunSet.innerHTML = `sun set: ${timeOffsetLogic(apiDat.data[0].sunset)}`;
            windSpeed.innerHTML = `Wind Speed: ${apiDat.data[0].wind_spd} m/s`;
            windDir.innerHTML = `Wind Diriction: ${apiDat.data[0].wind_cdir_full}`;
            close.addEventListener('click',()=>{
                card.parentElement.removeChild(card);
                DataManager.S_deleteData(inputData.cityNameEn);
            })
        }
        setData(data)
    }
}
class DataManager{
    static S_initData(){
        if(window.localStorage.getItem(`toDoList`) === null){
            const data = {
                "Data":[],
                "setting":{
                    "theme": "default"
                }
            };
            const sData = JSON.stringify(data)
            window.localStorage.setItem(`toDoList`, sData);
            return JSON.parse(window.localStorage.getItem(`toDoList`));
        }else{
            return JSON.parse(window.localStorage.getItem(`toDoList`));
        }
    }
    static S_ClearAll(){
        const data = {
            "Data":[],
            "setting":{
                "theme": "default"
            }
        };
        const sData = JSON.stringify(data)
        window.localStorage.setItem(`toDoList`, sData);
    }
    static S_getAllData(){
        return JSON.parse(window.localStorage.getItem(`toDoList`));
    }
    static S_setTheme(name){
        const data = JSON.parse(window.localStorage.getItem(`toDoList`));
        data.setting.theme = name;
        const sData = JSON.stringify(data);
        window.localStorage.setItem(`toDoList`, sData);
    }
    static S_setData(city){
        const data = JSON.parse(window.localStorage.getItem(`toDoList`));
        data.Data.push({"cityNameEn": `${city.cityNameEn}`,"cityNameFa": `${city.cityNameFa}`,"lat": `${city.lat}`,"long": `${city.long}`});
        const sData = JSON.stringify(data);
        window.localStorage.setItem(`toDoList`, sData);
    }
    static S_deleteData(city){
        const data = JSON.parse(window.localStorage.getItem(`toDoList`));
        data.Data.forEach(object => {
            if(object.cityNameEn === `${city}`){
                let index = data.Data.indexOf(object);
                const before = data.Data.slice(0,index);
                const after = data.Data.slice(index + 1 , data.Data.length);
                const newData = []
                newData.push(...before,...after);
                data.Data = newData;
            }
        });
        const sData = JSON.stringify(data);
        window.localStorage.setItem(`toDoList`, sData);
    }
}
window.onload = ()=>{
    const localData = DataManager.S_initData();
    localData.Data.forEach(city=>{const tempcard = new TempCard(city);})
}
addNewWeatherLogic();
