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