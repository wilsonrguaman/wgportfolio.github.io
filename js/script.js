
 window.addEventListener("load", () =>{
        document.querySelector(".main").classList.remove("hidden");
        document.querySelector(".home-section").classList.add("active");
        /* ------- Page Loader ------ */ 
        document.querySelector(".page-loader").classList.add("fade-out");
        setTimeout(() =>{
            document.querySelector(".page-loader").style.display = "none";
        },600);
 });

/* ------------- Toggle Navbar ------------ */ 
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () =>{
  hideSection();
  toggleNavbar();
  document.body.classList.toggle("hide-scrolling");
});
function hideSection(){
    document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar(){
    document.querySelector(".header").classList.toggle("active");
}

/* ---------------- Active Section ---------------------- */
document.addEventListener("click", (e) =>{
   if(e.target.classList.contains("link-item") && e.target.hash !== ""){
       // activate the overlay to prevent multiple clicks
       document.querySelector(".overlay").classList.add("active");
       navToggler.classList.add("hide");
       if(e.target.classList.contains("nav-item")){
           toggleNavbar();
       }
       else{
           hideSection();
           document.body.classList.add("hide-scrolling");
       }
       setTimeout(() =>{
         document.querySelector("section.active").classList.remove("active","fade-out");
         document.querySelector(e.target.hash).classList.add("active");
         window.scrollTo(0,0);
         document.body.classList.remove("hide-scrolling");
         navToggler.classList.remove("hide");
         document.querySelector(".overlay").classList.remove("active");
       },500);
   }
});

/* -------------- About Tabs ---------------- */ 
const tabsContainer = document.querySelector(".about-tabs"),
aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener("click", (e) =>{
   if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
       tabsContainer.querySelector(".active").classList.remove("active");
       e.target.classList.add("active");
       const target = e.target.getAttribute("data-target");
       aboutSection.querySelector(".tab-content.active").classList.remove("active");
       aboutSection.querySelector(target).classList.add("active");
   }
});

/* ----------------- Portfolio Item Details Popup ------------------ */ 


document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("view-project-btn")){
      togglePortfolioPopup();      
      document.querySelector(".portfolio-popup").scrollTo(0,0);
      portfolioItemDetails(e.target.parentElement);
    }
})
function togglePortfolioPopup(){
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

// hide popup when clicking outside of it
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("pp-inner")){
        togglePortfolioPopup();
    }
}); 

function portfolioItemDetails(portfolioItem){
    document.querySelector(".pp-thumbnail img").src = 
    portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-thumbnail iframe").src = 
    portfolioItem.querySelector(".portfolio-item-thumbnail iframe").src;

    document.querySelector(".pp-header h3").innerHTML = 
    portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = 
    portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}

/*=====================working an a new feature ==========
//Validation to the new contack form
const form = document.getElementById('contact-form');
const name = document.getElementById('Name');
const email = document.getElementById('Email');
const subject = document.getElementById('Subject');
const message = document.getElementById('Message');

contact-form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError =(element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innterText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('error');

    errorDisplay.innterText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs =() => {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();

    if(nameValue == ''){
        setError(name, 'name is required');                                                                                
    }else{
        setSuccess(nameValue);
    }
    if(emailValue== ''){
        setError(email, 'Email is required');
    }else if (!isValidEmail(emailValue)){
        setError(email, 'Provide a valid email address');
    }else{
        setSuccess(email);
    }
}
===============*/