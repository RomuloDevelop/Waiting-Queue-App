//Establecer conexion
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('office')) {
    window.location = 'index.html';
    throw new Error('The office is required');
}

var office = searchParams.get('office');

var h1 = document.getElementsByTagName('h1')[0];
h1.innerHTML = 'Office: '+office;

var button = document.getElementsByTagName('button')[0];
button.addEventListener('click', function(){
    socket.emit('attendTicket',{office: office}, function(resp){
        if(resp.ok){
            var small = document.getElementsByTagName('small')[0];
            if(resp.ticked === 'There is no tickets')
                alert(resp.ticked);
            small.innerHTML = resp.ticked;
        }
        console.log(resp);
    })
})