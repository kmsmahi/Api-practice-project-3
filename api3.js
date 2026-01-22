const loadData=()=>{
    fetch(' https://taxi-kitchen-api.vercel.app/api/v1/categories')
    .then((res)=>res.json())
    .then(data=>displaydata(data.categories))
    .catch(err => console.error("Error loading details:", err));
    
};

const cart=[];
let total=0;

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("btn-category");
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
};
const loadFoodsBycategory=(id)=>{
    removeActiveClass();
    const currentBtn=document.getElementById(`cat-btn-${id}`);
    currentBtn.classList.add('active');
    fetch(` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`)
    .then((res)=>res.json())
    .then((data)=>displayFoodsBycategory(data.foods))
    
};
const displaydata=(categories)=>{
    const categoryContainer=document.getElementById('category-container');
    console.log(categoryContainer);
    categoryContainer.innerHTML='';
    categories.forEach(category=>{
        const categoryCard=document.createElement('div');
        categoryCard.innerHTML=`
        <button id="cat-btn-${category.id}" onclick="loadFoodsBycategory('${category.id}')" class="btn justify-start btn-block shadow btn-category">
            <img
              src="${category.categoryImg}"
              alt=""
              class="w-10"
            />${category.categoryName}
          </button>
        `;
        categoryContainer.appendChild(categoryCard);
    })

};

const loadFoodDetails=(id)=>{
    fetch(` https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`)
    .then((res)=>res.json())
    .then((data)=>displayFoodDetails(data.details))
}
const randomfoods=()=>{
    fetch(' https://taxi-kitchen-api.vercel.app/api/v1/foods/random')
    .then((res)=>res.json())
    .then((data)=>displayFoodsBycategory(data.foods))
    
};

const displayFoodDetails=(food)=>{
    const modalDetails=document.getElementById('foodDetails-container');
    if(!food) return;
    modalDetails.innerHTML=`
    <img src="${food.foodImg}" alt="${food.title}" class="w-full rounded-lg mb-4">
        <h2 class="text-xl font-bold">${food.title}</h2>
        <p class="font-semibold text-lg">Price: ${food.price} BDT</p>
        <p><strong>Category:</strong> ${food.category}</p>
        <p><strong>Area:</strong> ${food.area || 'General'}</p>
        <div class="mt-4">
             <a href="${food.video}" target="_blank" class="btn btn-sm btn-outline btn-error">Watch Video</a>
        </div>
    `;
    const myModal = document.getElementById('my_modal_1');
    myModal.showModal();


};
const displayFoodsBycategory=(foods)=>{
    const foodContainer=document.getElementById('food-container');
    foodContainer.innerHTML='';
    foods.forEach(food=>{
        const foodCard=document.createElement('div');
        foodCard.innerHTML=`
        <div onclick="loadFoodDetails(${food.id})" class="p-5 bg-white flex gap-3 shadow rounded-xl">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover food-img"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold food-title">
                ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price">${food.price}</span> BDT
                </h2>
              </div>
              <button onclick="event.stopPropagation(); displayFoodDetails(${JSON.stringify(food).split('"').join("&quot;")})" class="btn btn-warning">
              View Details
              </button>

              <button onclick="addToCart(this,event)" class="btn btn-warning ">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
        `
        foodContainer.appendChild(foodCard);
    })
}

loadData();
randomfoods();


const addToCart=(e,event)=>{
   event.stopPropagation();
   const card=e.parentNode.parentNode;
   const foodTitle=card.querySelector('.food-title').innerText;
   const foodPrice=card.querySelector('.price').innerText;
   const foodimage=card.querySelector('.food-img').src;
   console.log(foodTitle,foodPrice,foodimage);
    const foodItem={
      title:foodTitle,
      image:foodimage,
      price:parseFloat(foodPrice)
    };
    cart.push(foodItem);
    dicplayCart();
};

const dicplayCart=()=>{
    const newCart=document.getElementById('cart-container');
    newCart.innerHTML='';
    cart.forEach((item)=>{
        const cartItem=document.createElement('div');
        cartItem.innerHTML=`
        <div class="p-5 bg-white flex gap-3 shadow rounded-xl">
            <div class="img flex-1">
              <img
                src="${item.image}"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold">
                ${item.title}
              </h1>
              <div class="badge badge-warning">Category</div>
              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price">${item.price}</span> BDT
                </h2>
              </div>
            </div>
          </div>
        `;
        newCart.appendChild(cartItem);
    })
}