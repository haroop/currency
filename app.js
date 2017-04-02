
const form = document.getElementById('weather');
const ls = localStorage;

window.onload = function (e){
    document.getElementById('first').value = "";
    document.getElementById('second_curr').value = "CAD";
}

const url = 'https://api.fixer.io/latest?base=';

form.addEventListener('submit', e => {
    e.preventDefault();
    const DIV = document.getElementById('display');
    while (DIV.hasChildNodes()) {
        DIV.removeChild(DIV.lastChild);
    }
    let first_curr = document.getElementById("first_curr").value;
    let first_value = document.getElementById('first').value;
    let second_curr = document.getElementById("second_curr").value;

    fetch(`${url}${first_curr}`)
    .then((res) => res.json())
    .then((data) => {
        let rate = `data.rates.${second_curr}`;
        let amt = first_value * eval(rate);
        if(second_curr === "CAD"){
            ls.setItem('rate', JSON.stringify(eval(rate)));
            show_data(second_curr,0,amt,first_value);
        }
        else{
            show_data(second_curr,eval(rate),amt,first_value);
        }        

    })
    .catch((e) => console.log(`${e} something is donkin' up your wiz biz`));
})

function show_data(second,rate,amt,first)
{
    const t_div = document.getElementById('display');
    const t_rate = document.createElement('h3');
    const t_amt = document.createElement('h3');
    if(rate === 0){
        rate = JSON.parse(ls.getItem('rate'));
    }
    t_rate.textContent = `Rate = ${rate}`;
    t_amt.textContent = `Total = ${amt}`;
    t_div.appendChild(t_rate);
    t_div.appendChild(t_amt);
}
 
