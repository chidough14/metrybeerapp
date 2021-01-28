var rate 
const userAction = async (value, page) => {
    const res = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${value}`);
    const myres = await res.json(); 

    const response = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${value}&page=${page}&per_page=10`);
    const myJson = await response.json(); 
    
    rate = Math.round((myres.length)/10)

    document.getElementById('table-rows').innerHTML = myJson.map((item) => {
        return '<tr><td>' + item.name + '</td><td>' + item.tagline + '</td><td><img style="height: 100px;"  src=' + item.image_url + ' /></td></tr>'
    }).join('');

}

document.getElementById('submit-button').addEventListener('click', function() {
    var value = document.getElementById('gsearch').value;
    //console.log(value)
    var a = []
    a = JSON.parse(localStorage.getItem('values')) || [];
    //console.log(a)

    a.push(value)
    localStorage.setItem('values', JSON.stringify(a));

    userAction(value, 1)

    document.getElementById('ddn').style.display = '';
    document.getElementById('last').hidden=true;

}); 

var i = 1

document.getElementById('next').addEventListener('click', function() {
    var value = document.getElementById('gsearch').value;

    i++
    userAction(value, i)
    document.getElementById('last').hidden=false;
    console.log(rate)

     if(i > rate) {
        document.getElementById('next').hidden=true;
    }
    

});

document.getElementById('last').addEventListener('click', function() {
    var value = document.getElementById('gsearch').value;
    document.getElementById('next').hidden=false;

    i--
    userAction(value, i)

    if(i === 1) {
        document.getElementById('last').hidden=true;
    }

});


var typingTimer;             
var doneTypingInterval = 2000;
var inp = document.getElementById('gsearch');

inp.addEventListener('keyup', function() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);

    var a = JSON.parse(localStorage.getItem('values')) || [];

    var arr = a.filter(function(item, pos) {  //remove duplicates
        return a.indexOf(item) == pos;
    })

    //console.log(arr)
    //.slice(-5).reverse()

    //var uniqueArray = arr.filter((b) =>  b === inp);

    document.getElementById('par').innerHTML = arr.slice(-5).reverse().map((item) => {
        return '<p>'+item+'</p>'
    })

    document.getElementById('ddn').style.display = 'block';
})

inp.addEventListener('keydown', function() {
    clearTimeout(typingTimer);
})



function doneTyping () {
    var inp = document.getElementById('gsearch').value;
    
    //document.getElementById('ddw:hover').style.display = 'block';
    var a = JSON.parse(localStorage.getItem('values')) || [];

    var arr = a.filter(function(item, pos) {  //remove duplicates
        return a.indexOf(item) == pos;
    })

    var uniqueArray = arr.filter((b) =>  b === inp);



    document.getElementById('par').innerHTML = uniqueArray.map((item) => {
        return '<p>'+item+'</p>'
    })

    document.getElementById('ddn').style.display = 'block';


}
