// console.log("javascript codes loaded");

const fetchingURL = async (seachPhone = "iPhone", isViewAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${seachPhone}`
  );
  const data = await response.json();
  let singlePhone = data.data;
  displyingPhones(singlePhone, isViewAll);
};

function displyingPhones(pdata, isViewAll) {
  let totalPhones = pdata.length;
  const showButton = document.getElementById("showALlButton");
  if (pdata.length > 10 && !isViewAll) {
    showButton.classList.remove("hidden");
  } else {
    showButton.classList.add("hidden");
  }
  // console.log("show all is ", isViewAll);
  if (!isViewAll) {
    pdata = pdata.slice(0, 10);
  }
  // console.log(pdata);

  const phoneContainer = document.getElementById("phoone_container");
  phoneContainer.textContent = " ";
  for (const phone of pdata) {
    const phoneCard = document.createElement("div");
    phoneCard.innerHTML = `
    <div class="card p-5 m-3 bg-base-100 shadow-xl">
          <figure class="px-10 pt-10">
            <img
              src=${phone.image}
              alt="Shoes"
              class="rounded-xl"
            />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h4 class='text-2xl my-3'>$999 </h4> 
            <div class="card-actions">
              <button onclick="showDetails('${phone.slug}') , phoneDetails.showModal()" class="btn btn-primary">Show Details</button>
            </div>
          </div>
        </div>
    `;
    phoneContainer.appendChild(phoneCard);
    loading(false);
  }
}

function specificPhones(isViewAll) {
  const inputfield = document.getElementById("searchINput");
  const inputfieldValue = inputfield.value;
  fetchingURL(inputfieldValue, isViewAll);
  loading(true);
}

const loading = (e) => {
  const loading_conatiner = document.getElementById("loadingCOntainer");
  if (e) {
    loading_conatiner.classList.remove("hidden");
  } else {
    loading_conatiner.classList.add("hidden");
  }
};

// show all button
const displyingShowAll = () => {
  specificPhones(true);
};

// phone show details
const showDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();

  // console.log("id", id);
  console.log("data-", data.data);
  let details = data.data;
  console.log("data-", details.mainFeatures.storage);
  const PhoneDetails = document.getElementById("Phone__details");
  // console.log(details_container);
  PhoneDetails.innerHTML = `
  <div id="Phone__details" class="">
            <div class="flex flex-col justify-center items-center">
              <img
                src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg"
                alt=""
              />
            </div>
            <h3 class="font-bold text-[25px] pt-2 pb-5">${details.name}</h3>
            <p class="py-2"><b>Storage:</b> ${details.mainFeatures.storage}</p>
            <p class="py-2"><b>Display Size:</b> ${details.mainFeatures.displaySize}  </p>
            <p class="py-2"><b>Chipset:</b> ${details.mainFeatures.chipSet}</p>
            <p class="py-2"><b>Memory:</b> ${details.mainFeatures.memory}</p>
            <p class="py-2"><b>Slug:</b> ${details.slug}</p>
            <p class="py-2"><b>Release data:</b> ${details.releaseDate}</p>
            <p class="py-2"><b>Brand:</b> ${details.brand}</p>
            <p class="py-2"><b>GPS:</b> ${details.others.GPS}</p>
          </div> 
  
  `;
};

fetchingURL();
