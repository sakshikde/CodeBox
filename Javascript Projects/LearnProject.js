const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected="selected";
        }else if(select.name === "to" && currcode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (event)=>{
        updateFlag(event.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png` ;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate =  async(event) =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }

    //fetching the rate
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let rate = await response.json();
    let exactRate = rate[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    console.log(exactRate);
    let finalAmount = amount.value * exactRate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

button.addEventListener("click", async (event)=>{
    event.preventDefault(); 
});

window.addEventListener("load", ()=>{
    updateExchangeRate();
});


