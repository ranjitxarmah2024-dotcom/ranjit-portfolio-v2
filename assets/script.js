document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {

    const header = document.querySelector('header');

    if(window.scrollY > 50){
        header.style.background = "#020617";
        header.style.boxShadow = "0 8px 30px rgba(0,0,0,.4)";
    }else{
        header.style.background = "rgba(5,8,22,.95)";
        header.style.boxShadow = "none";
    }

})
