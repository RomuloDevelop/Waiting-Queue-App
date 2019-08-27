var socket = io();

socket.on('actualState', function(data){
    var last4 = data.last4;
    for(var i = 1; i<5; i++) {
        var ticket = document.getElementById('lblTicket'+i);
        var office = document.getElementById('lblEscritorio'+i);
        ticket.innerHTML = 'Ticket ' + last4[i-1].number;
        office.innerHTML = 'Office ' + last4[i-1].office;
    }
    console.log(data);
})