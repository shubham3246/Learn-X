window.document.addEventListener("DOMContentLoaded", ()=>{
    // form = document.querySelector("#search-form");
    // form.addEventListener('submit', search_form);

})

function search_form(event){
    event.preventDefault();
}

function searchKeyPress(event) {
    if (event.key === "Enter") {
        search_data();
    }
}

function search_data(){
    const searchInput = document.getElementById("search-course");
    const resultDiv = document.getElementById("result");



    console.log(searchInput.value);
    fetch("/courses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            search: searchInput.value 
        })
    })
    .then((response) => response.json()) 
    .then((data) => {
        searched_cards = document.querySelectorAll(".courses-inner .card");
        searched_cards.forEach(card => {
            card.style.display = "none";
        });
        console.log(searched_cards);
        console.log(data.response); 
        for(i in data.response){
            document.getElementById(data.response[i]).style.display = "block";
        }
    })
}