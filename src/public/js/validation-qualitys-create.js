const qualityName = document.getElementById('qualityName').value;
const submitAction = document.getElementById('submit');
const formSubmit = document.getElementById('form_quality_create');



qualityName.addEventListener("blur",function(e) {const field = e.target;
console.log(field)
const fieldQuality = e.target.value;
if(fieldQuality.trim().value === ""){
    field.classList.add("invalid")
    field.nextElementSibling.classList.add("Error");
    field.nextElementSibling.innerText=e;
}else{
    field.classList.remove("invalid")
    field.nextElementSibling.classList.remove("Error");
    field.nextElementSibling.innerText="";
}})


submitAction.addEventListener("submit",function(e){
    e.preventDefault();
});