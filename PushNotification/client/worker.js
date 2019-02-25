self.addEventListener('push', e => {
    console.log('service worker loaded!!');
    const data = e.data.json();
    console.log(e);
    console.log(data);
    console.log(`event: ${e}`);
    console.log(`data: ${data}`);
    self.registration.showNotification(data.title, {
        body: 'Notified by',
        icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
    });
});