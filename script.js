let cardData = document.getElementById("card");
let categoryDiv = document.getElementById("catButton");
let emptyDiv = document.getElementById("no-img");
let array = [];

const loadCategory = () => {
  const url = `https://openapi.programming-hero.com/api/videos/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      categoryDiv.textContent = "";
      data?.data?.forEach((d, index) => {
        categoryDiv.innerHTML += `
            <button
                class="px-4 nav-item py-2 rounded ${
                  index === 0 && "bg-[#FF1F3D] text-white"
                } "
                onclick="loadData('${d?.category_id}'); activeNav(this)"
                >
                ${d?.category}
            </button>
            `;
      });
    });
};

const activeNav = (ele) => {
  const items = document.getElementsByClassName("nav-item");
  for (let item of items) {
    item.classList.remove("bg-[#FF1F3D]", "text-white");
  }
  ele.classList.add("bg-[#FF1F3D]", "text-white");
};

const loadData = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      array = data?.data;
      displayData(array);
    });
};

const sortData = () => {
  const sorted = array.sort((a, b) => {
    return parseFloat(b?.others?.views.split("K")[0]) >
      parseFloat(a?.others?.views.split("K")[0])
      ? 1
      : -1;
  });
  displayData(sorted);
};
const displayData = (data) => {
    console.log(data);
    cardData.textContent = "";
    if (data.length === 0) {
      emptyDiv.style.display = "block";
      return;
    }
    emptyDiv.style.display = "none";
    data?.forEach((data) => {
      cardData.innerHTML += `
      <div class="card product-card bg-base-100 shadow-xl rounded-md">
          <div class='relative'>
            <img class='h-[200px] w-full rounded-md' src="${
              data?.thumbnail
            }" alt="img loading" />
            ${
              data?.others?.posted_date &&
              `<p class='absolute right-2 mt-[-38px] px-2 py-1 text-sm text-right text-white bg-black rounded'>${secToMin(
                data?.others?.posted_date
              )}</p>`
            }
          </div>
          <div class=" p-4 bg-white">
          <div class="flex gap-4">
              <div>
              <img class="w-12 h-12 rounded-full" src="${
                data?.authors[0]?.profile_picture
              }" alt="" />
              
              </div>
              <div>
              <h2 class="card-title">
              ${data?.title}
              </h2>
              <p class='flex gap-2'>${data?.authors[0]?.profile_name} 
              ${
                data?.authors[0]?.verified === true &&
                `<img class="w-5 h-5 rounded-full" src="./download.png" alt="" />`
              }
              </p>
              <p>${data?.others?.views} Views</p>
              </div>
          </div>
          </div>
      </div>
      `;
    });
  };
  
  const secToMin = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    if (hours === 0) {
      return `${minutes} min ago`;
    } else if (minutes === 0) {
      return `${hours} hrs ago`;
    } else {
      return `${hours} hrs ${minutes} min ago`;
    }
  };
  
  //default
  loadCategory();
  loadData(1000);
  