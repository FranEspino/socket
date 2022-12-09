module.exports  =  ( io : any) => {
    const namespace = io.of('/location_driver');
    namespace.on('connection', function (socket : any) {
        console.log('a user connected');
        socket.on('position', function (data : any) {
            console.log(data)
            const j = JSON.parse(data)
            namespace.emit(`position/${j.id}`, {id: j.id,lat: j.lat, lng: j.lng})
        });

        socket.on('chat', function (data : any) {
            console.log(data)
            const j = JSON.parse(data)
            namespace.emit(`chat/${j.id}`, {id: j.id, message: j.message})
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
}

  