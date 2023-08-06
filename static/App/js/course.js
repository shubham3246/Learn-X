document.addEventListener('DOMContentLoaded', function() {
    let isSubscriber = document.querySelector(".is_sub");
    if(isSubscriber) {
        document.querySelector(".course-inner-lectures").style.display = "block";
    }
})

function likeCourse(){
    user = document.querySelector(".request_user").innerText;
    course = document.querySelector(".course-inner-card-slug").innerText;
    csrf = document.querySelector('[name=csrfmiddlewaretoken]').value;
    document.querySelector(".course-inner-card-top .dislike").style.color = "white";
    document.querySelector(".like").style.color = "red";

    rating = document.querySelector(".rating").innerText.slice(8);
    rating = parseInt(rating);
    if(rating < maxLike)
    document.querySelector(".rating").innerText = "Rating: "+(rating+1);


    fetch("/like", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "X-CSRFToken": csrf,
        },
        body:JSON.stringify({
            course:course,
            user:user
        })
    });
}

function dislikeCourse(){
    user = document.querySelector(".request_user").innerText;
    course = document.querySelector(".course-inner-card-slug").innerText;
    csrf = document.querySelector('[name=csrfmiddlewaretoken]').value;
    document.querySelector(".course-inner-card-top .like").style.color = "white";
    document.querySelector(".dislike").style.color = "red";
    
    rating = document.querySelector(".rating").innerText.slice(8);
    rating = parseInt(rating);
    
    if(rating > minLike)
    document.querySelector(".rating").innerText = "Rating: "+(rating-1);

    fetch("/dislike", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "X-CSRFToken": csrf,
        },
        body:JSON.stringify({
            course:course,
            user:user
        })
    });
}
function showLecture(counter){
    var allCards = document.querySelectorAll(".card");

    allCards.forEach(function(card) {
        var cardCounter = card.dataset.counter;
        var card = document.querySelector(".course-inner-lectures-card-"+cardCounter);
        var cardDetail = document.querySelector(".course-inner-lectures-card-detail-"+cardCounter);
        var cardDetailLeft = document.querySelector(".course-inner-lectures-card-detail-left-"+cardCounter);
        var cardDetailRight = document.querySelector(".course-inner-lectures-card-detail-right-"+cardCounter);
        var cardDetailRightTitle = document.querySelector(".course-inner-lectures-card-detail-right-title-"+cardCounter);
        var cardLink = document.querySelector(".course-inner-lectures-link-"+cardCounter);
        var cardDetailRightButton = document.querySelector(".course-inner-lectures-card-detail-right-button-"+cardCounter);

        if (cardCounter === counter) {
            card.classList.toggle("course-inner-lectures-card-after");
            card.classList.toggle("course-inner-lectures-card-before");
            cardDetail.classList.toggle("course-inner-lectures-card-detail-after");
            cardDetail.classList.toggle("course-inner-lectures-card-detail-before");
            cardDetailLeft.classList.toggle("course-inner-lectures-card-detail-left-after");
            cardDetailLeft.classList.toggle("course-inner-lectures-card-detail-left-before");
            cardDetailRight.classList.toggle("course-inner-lectures-card-detail-right-after");
            cardDetailRight.classList.toggle("course-inner-lectures-card-detail-right-before");
            cardDetailRightTitle.classList.toggle("course-inner-lectures-card-detail-right-title-after");
            cardDetailRightTitle.classList.toggle("course-inner-lectures-card-detail-right-title-before");
            cardLink.classList.toggle("course-inner-lectures-link-after");
            cardLink.classList.toggle("course-inner-lectures-link-before");
            cardDetailRightButton.classList.toggle("course-inner-lectures-card-detail-right-button-after");
            cardDetailRightButton.classList.toggle("course-inner-lectures-card-detail-right-button-before");
            if(cardDetailRightButton.innerText === "View lecture"){
                cardDetailRightButton.innerText = " X ";
            }
            else {
                cardDetailRightButton.innerText = "View lecture";
            }
        } else {
            card.classList.remove("course-inner-lectures-card-after");
            cardDetail.classList.remove("course-inner-lectures-card-detail-after");
            cardDetailLeft.classList.remove("course-inner-lectures-card-detail-left-after");
            cardDetailRight.classList.remove("course-inner-lectures-card-detail-right-after");
            cardDetailRightTitle.classList.remove("course-inner-lectures-card-detail-right-title-after");
            cardLink.classList.remove("course-inner-lectures-link-after");
            cardDetailRightButton.classList.remove("course-inner-lectures-card-detail-right-button-after");
            card.classList.add("course-inner-lectures-card-before");
            cardDetail.classList.add("course-inner-lectures-card-detail-before");
            cardDetailLeft.classList.add("course-inner-lectures-card-detail-left-before");
            cardDetailRight.classList.add("course-inner-lectures-card-detail-right-before");
            cardDetailRightTitle.classList.add("course-inner-lectures-card-detail-right-title-before");
            cardLink.classList.add("course-inner-lectures-link-before");
            cardDetailRightButton.classList.add("course-inner-lectures-card-detail-right-button-before");
            cardDetailRightButton.innerText = "View lecture";
        }
    });
}
function colorIt() {
    leftParts = document.getElementsByClassName("course-inner-lectures-card-left");

    fetch("https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=json&mode=analogic&count="+leftParts.length.toString())
    .then(response => response.json())
    .then(data => {
        // Extract the color values from the fetched data
        var colors = data.colors.map(color => color.hex.value);
        console.log(colors);
        for(let i=0; i<leftParts.length; i++) {
            leftParts[i].style.backgroundColor = colors[i];
        }
    })
    .catch(error => {
        console.log("Error fetching color scheme:", error);
    });
}

function subscribe(){
    console.log("sub");
    is_pro = document.querySelector(".pro-card");
    console.log(is_pro);
    
    if(is_pro) {
        console.log("premium required");  
        open_payment_box();      
    }
    else {
        slug = document.querySelector(".course-inner-card-slug").innerText;
        csrf = document.querySelector(".course-inner-card-csrf").innerText;
        // console.log(slug);
        fetch('/course/'+slug, {
            method:"post",
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf
            },
            body:JSON.stringify({
                "is_member":true
            })
        })
        .then(()=>{
            var element = document.querySelector(".course-inner-card-body-subscription a");
            var opacity = 1;
            var interval = setInterval(function() {
                opacity -= 0.05;
                element.style.opacity = opacity;
                if (opacity <= 0) {
                clearInterval(interval);
                element.style.display = "none";
                }
            }, 50);

            setTimeout(function() {
                var textElement = document.querySelector(".course-inner-card-body-subscription");
                textElement.style.color = "#03e9f4";
                var targetText = "Subscribed to the current course.";
                var currentIndex = 0;
                var interval = setInterval(function() {
                    textElement.textContent = targetText.substr(0, currentIndex);
                    currentIndex++;
                    if (currentIndex > targetText.length) {
                    clearInterval(interval);
                    }
                }, 100);
            }, 700);   
            
            setTimeout(function(){
                document.querySelector(".course-inner-lectures").style.display = "block";    
            }, 700);
        });
    }
}