const loadData=()=>{
    fetch(' https://taxi-kitchen-api.vercel.app/api/v1/categories')
    .then((res)=>res.json())
    .then(data=>displaydata(data.categories))
    .error(err=>console.log(err))
};
const displaydata=(categories)=>{
    const categoryContainer=document.getElementById('category-container');
    console.log(categoryContainer);
    categoryContainer.innerHTML='';
    categories.forEach(category=>{
        const categoryCard=document.createElement('div');
        categoryCard.innerHTML=`
        <button class="btn justify-start btn-block shadow btn-category">
            <img
              src="${category.categoryImg}"
              alt=""
              class="w-10"
            />${category.categoryName}
          </button>
        `;
        categoryContainer.appendChild(categoryCard);
    })

}
loadData();