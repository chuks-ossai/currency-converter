// Register Service worker
if(navigator.serviceWorker) {
    navigator.serviceWorker
    .register('./sw_cached.js')
    .then(() => console.log(`Service worker registered!`))
    .catch((e) => console.error(e))
} else {
    console.log(`Service Worker is not supported by this browser.`);
}