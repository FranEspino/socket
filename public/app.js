
const socket = io();
const namespace = io.of('/location_driver');
    namespace.on('connection', function (socket ) {
        socket.on('driver_location', function (data ) {
            socket.broadcast.emit('driver_location', JSON.parse(data));
            const j = JSON.parse(data)
            namespace.emit(`position/${j.id_driver}`, {id: j.id_driver,lat: j.lat, lng: j.lng})
        });
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
    