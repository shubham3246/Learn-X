window.document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector(".payment-box").style.display = "none";

    
    let corousalItems = document.querySelectorAll('.carousel .carousel-item')

    corousalItems.forEach((el) => {
        const minPerSlide = 4;
        let next = el.nextElementSibling;
        for (var i=1; i<minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = corousalItems[0];
            }
            let cloneChild = next.cloneNode(true);
            el.appendChild(cloneChild.children[0]);
            next = next.nextElementSibling;
        }
    });
})




function open_payment_box(){
    document.querySelector(".payment-box").style.display = "block";
}
function close_payment_box(){
    document.querySelector(".payment-box").style.display = "none";
}

