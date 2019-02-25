const publicKey = 'BNgnYEzROU071K4cQdNmqvnmsX23YiHIfXtLAiFCMjelkhAy25wEPosSXrV8Y31e3mVFtfFIbWJS4_0tVEJiLVY';

// check for service worker
if ('serviceWorker' in navigator) {
    send().catch(err => console.log(err));
}

// Register service worker, Register Push, Send Push
async function send() {
    // register service worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    // register push
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    });

    // send push
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });

    console.log('push send!!');

    
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }