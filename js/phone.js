const loadData = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  phoneStorage(phones, isShowAll);
};

// show phones
const phoneStorage = (phones, isShowAll) => {
  // step-1: add parent
  const phoneContainer = document.getElementById("phone-container");

  // clear search container
  phoneContainer.textContent = "";

  // if phone card is >> 12 then show button
  const showBtn = document.getElementById("show-all");
  if (phones.length > 12 && !isShowAll) {
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
  }

  // display first 12 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // step-2: create a div
    const phoneCard = document.createElement("div");

    // add classes from daisy ui
    phoneCard.classList = `card  bg-slate-600	 p-4 shadow-xl`;

    // set inner HTML
    phoneCard.innerHTML = `
    <figure class="bg-slate-700 py-2"><img src="${phone.image}" alt="phone" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>There are many variations of passages of available, but the majority have suffered</p>
      <div class="card-actions justify-center mt-4 ">
        <button onclick="showDetails('${phone.slug}')" class="btn btn-primary w-full">Show Details</button>
      </div>
    </div>
    `;

    // append child
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggle(false);
};

// search handler
const search = (isShowAll) => {
  toggle(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadData(searchText, isShowAll);
};

// loading
const toggle = (isLoading) => {
  const loading = document.getElementById("loading");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};



// show details
const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  modal(phone);
};

const modal = (phone) => {
  console.log(phone);

  // phone details
  const mainDiv = document.getElementById("all");
  mainDiv.innerHTML = `
  <div class=" bg-white rounded-lg ">
  <img class="mx-auto  " src="${phone.image}" alt="">
  </div>
  <h2 class="my-2 text-lg font-bold">${phone.name}</h2>
  <h2 class="text-sm md:text-base lg:text-base"><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage} </h2>
  <h2 class="my-1 md:my-2 lg:my-2 text-sm md:text-base lg:text-base"><span class="font-bold">Display-size:</span> ${phone?.mainFeatures?.displaySize} </h2>
  <h2 class="text-sm md:text-base lg:text-base"><span class="font-bold ">Chip-set:</span> ${phone?.mainFeatures?.chipSet} </h2>
  <h2 class="mt-1 md:mt-2 lg:mt-2 text-sm md:text-base lg:text-base"><span class="font-bold">Memory:</span> ${phone?.mainFeatures?.memory} </h2>
  `;

  show_details_modal.showModal();
};

loadData();
