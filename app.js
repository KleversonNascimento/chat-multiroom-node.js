//Importar as configurações do servidor
var app = require('./config/server');

//Definir porta de escuta
var server = app.listen(3000, function(){
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);
app.set('io', io);

//Criar a conexão por websocket
io.on('connection', function(socket){
    console.log('Usuário se conectou');

    socket.on('disconnect', function(){
        console.log('Usuário se desconectou');
    });

    socket.on('msgParaServidor', function(data){
        socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
        socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit('participantesParaCliente', {apelido: data.apelido});
            socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
        }
    });
})