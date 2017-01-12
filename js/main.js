
const button = document.getElementsByTagName('button')[0];

button.addEventListener('click', function(e) {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    window.scroll(0, h);

});
