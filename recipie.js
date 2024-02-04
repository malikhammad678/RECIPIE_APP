let searchBox = document.querySelector(".searchbox");
let searchBtn = document.querySelector(".searchbtn");
let recipieContainer = document.querySelector(".recipie-container");
let recipiedetailcontent = document.querySelector(".recipe-cap");
let closeBtn = document.querySelector(".closeBtn");


const fetchRecipie = async (query) => {
    recipieContainer.innerHTML = `<h1>Fetching...</h2>`
    try {
   let data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   let response = await data.json();
   recipieContainer.innerHTML = ``
//    console.log(response)
   response.meals.forEach(meal => {
    // console.log(meal)
    let recipieDiv = document.createElement('div');
    recipieDiv.classList.add('recipie');
    recipieDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal} 😋</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    let button  = document.createElement('button');
    button.innerText = "View Recipie"
    recipieDiv.appendChild(button)

    button.addEventListener('click' , () => {
        openRecipiePopUp(meal);
    })
    recipieContainer.append(recipieDiv);
   })
} catch (error) {
    recipieContainer.innerHTML = `<h1>Please Enter Correct Food Name</h2>`   
}
}


const fetchIngredients = (meal) => {
  console.log(meal)
let IngredientsList = "";
for (let i = 1; i <=20; i++) {
    let Ingredient = meal[`strIngredient${i}`];
    if(Ingredient) {
        let measures = meal[`strMeasure${i}`]
        IngredientsList += `<li>${measures} ${Ingredient}</li>`
    }
    else {
        break;
    }
}
  return IngredientsList;
}

const openRecipiePopUp = (meal) => {
  recipiedetailcontent.innerHTML = `
  <h2 class="recipieName">${meal.strMeal}<h2>
  <h3>Ingredients</h3>
  <ul class="recipieIngredeints">${fetchIngredients(meal)}</ul>
  <div>
  <h3>Instructions:</h3>
  <p class="instructions">${meal.strInstructions}</p>
  </div>
  `
  recipiedetailcontent.parentElement.style.display = "block";
}

closeBtn.addEventListener("click" , () => {
    recipiedetailcontent.parentElement.style.display = "none"; 
})


searchBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    let inputValue = searchBox.value.trim();
    if(inputValue != "") {
        fetchRecipie(inputValue);
    }
    else {
        recipieContainer.innerHTML = `<h1>Please Enter Some Food Name</h1>`
    }
})
