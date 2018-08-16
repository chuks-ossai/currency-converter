const uri = 'https://free.currencyconverterapi.com/api/v6/currencies';

let head = new Headers();
let req = new Request(uri, {
    method: 'GET', 
    headers: head,
    mode: 'cors'
});

fetch(req).then((res) => {
    if(res.ok) {
        return res.json();
    } else {
        throw new Error('BAD HTTP!!!');
    }
}).then((jsonData) => {
    
    //console.log(jsonData);
    let objArr = Object.keys(jsonData.results).map((key) =>{
        return [key, jsonData.results[key].currencyName];
    });

    for(let arr of objArr) {
        let abvr = arr[0];
        let currencyName = arr[1];
        let options = `${currencyName} (${abvr})`;

        var opt = document.createElement('option');
        opt.value = `${abvr}`;
        
        var opt2 = document.createElement('option');
        opt2.value = `${abvr}`;
        
        document.querySelector('#currencyFrom').appendChild(opt).innerHTML = options;
        document.querySelector('#currencyTo').appendChild(opt2).innerHTML = options;
    }
    
    
}).catch((err) => {

    console.log('ERROR:', err.message);

});


function convertCurrency() {
    
    var amount = document.getElementById('amountFrom').value;
    var fromCurrency = document.getElementById("currencyFrom").value;
    var toCurrency = document.getElementById("currencyTo").value;;
    var query = fromCurrency + '_' + toCurrency;
    var url = `https://free.currencyconverterapi.com/api/v6/convert?q=${query}&compact=y`;
    
    let head = new Headers();
    let req = new Request(url, {
    method: 'GET', 
    headers: head,
    mode: 'cors'
    });

    fetch(req).then((res) => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error('BAD HTTP!!!');
        }
    }).then((jsonData) => {
       let val = jsonData[query].val;
       if (val) {
        var total = val * amount;

        document.getElementById('amountTo').value = Math.round(total * 100) / 100;
      } else {
        var err = new Error("Value not found for " + query);
        console.log(err);
        cb(err);
      }
    }).catch((err) => {
        console.log('ERROR:', err.message);
    });
}
var button = document.getElementById('button');

button.addEventListener('click', convertCurrency, false);