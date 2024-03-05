const socket = io("http://localhost:3010/");
    socket.on('file-changed', () => {
        console.log('File changed. Reloading page...');
        location.reload(true);
    });