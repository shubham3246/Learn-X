document.addEventListener("DOMContentLoaded", ()=>{
    let contact = document.querySelector("#contact-form");
    contact.addEventListener("submit", contactUs);
    document.querySelector(".done").style.opacity = 0;

    let feedback_text = document.querySelector("#contact-feedback");
    feedback_text.addEventListener("focus", feedbackActive);
    feedback_text.addEventListener("blur", feedbackInactive);
});
function feedbackInactive(){
    let feedback_label = document.querySelector("#feedback-label");
    let feedback_text = document.querySelector("#contact-feedback")
    if(feedback_text.value === ''){
        feedback_label.style.position = "absolute";
        feedback_label.style.top = "5px";
        feedback_label.style.color = "#fff";
        feedback_label.style.fontSize = "16px";
    };
};
function feedbackActive(){
    let feedback_label = document.querySelector("#feedback-label");
    let feedback_text = document.querySelector("#contact-feedback")
    if(feedback_text.value === ''){
        feedback_label.style.position = "absolute";
        feedback_label.style.top = "-35px";
        feedback_label.style.color = "#03e9f4";
        feedback_label.style.fontSize = "12px";
    };
};

function contactUs(event){
    event.preventDefault();

    let name = document.querySelector("#contact-name");
    let email = document.querySelector("#contact-email");
    let feedback = document.querySelector("#contact-feedback");

    // if(name.value.length < 5){
    //     console.log(1)
    //     name.value = "";
    //     name.placeholder = "please put valid name";
    // }
    // if(email.value.length < 7) {
    //     console.log(2)
    //     email.value = "";
    //     email.placeholder = "please enter a valid email";
    // } 
    // if(feedback.value.length < 15) {
    //     console.log(3)
    //     feedback.value = "";
    //     feedback.placeholder = "please enter a valid email";
    // }
    if(name.value.length >= 5 && email.value.length >= 7 && feedback.value.length >= 15) {
        csrfToken = document.querySelector("#csrf_token");

        fetch('/contact', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken.innerText
            },
            body: JSON.stringify({
                name:name.value,
                email:email.value,
                feedback:feedback.value
            })
        })
        .then(()=>{
            buttonAnimation();
        })
    }

}

function buttonAnimation(){
    document.querySelector(".done").style.opacity = 1;
    let name = document.querySelector("#contact-name");
    let email = document.querySelector("#contact-email");
    let feedback = document.querySelector("#contact-feedback");

    name.style.opacity = 1;
    email.style.opacity =1 ;
    feedback.style.opacity =1;

    let t1 = gsap.timeline({ paused: true, reversed: true });
    t1.play();
        
    var intervalId = setInterval(function() {
    // Code to be executed repeatedly
        name.style.opacity-=0.1;
        email.style.opacity-=0.1;
        feedback.style.opacity-=0.1;
        console.log(name.style.opacity);
    }, 200);
    
    // Stop the interval after 5 seconds
    setTimeout(function() {
        clearInterval(intervalId);
        name.value = "";
        email.value = "";
        feedback.value = "";
        name.style.opacity = 1;
        email.style.opacity =1 ;
        feedback.style.opacity =1;
        
    }, 3000);

    // setTimeout(()=> {
        
    // }, 2000);
    setTimeout(()=> {
        t1.reverse();
    }, 5000);

    t1.to("button svg", {
    ease: "power1.out",
    rotate: 45,
    });

    t1.to("button svg", {
    ease: "power1.out",
    xPercent: -150,
    });

    t1.to(
    ".send",
    {
        x: -80,
        opacity: 0,
        duration: 1.5,
        ease: "power1.inOut"
    },
    0.2
    );

    t1.to("button svg", {
    ease: "elastic.in(2, 0.3)",
    x: 100,
    duration: 1.5,
    });

    t1.from(".done", {
    yPercent: -100,
    opacity: 0,
    duration: 1.2,
    ease: "bounce.out"
    });
};