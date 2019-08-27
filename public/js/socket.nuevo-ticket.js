//Establecer conexion
var socket = io();
var label = document.getElementById('lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectado');
});

socket.on('disconnect', function(){
    console.log('Desconectado');
});

socket.on('nextTicket', function(data){
    console.log(data);
});

socket.on('actualState', function(data){
    label.innerHTML = data.ticket;
})

var button = document.getElementsByTagName('button')[0];
button.addEventListener('click', function(){
    socket.emit('nextTicket',null, function(ticket){
        label.innerHTML = ticket;
    });
})