console.log("javascript codes loaded");

const fetchingURL = async (seachPhone) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${seachPhone}`
  );
  const data = await response.json();
  let singlePhone = data.data;
  displyingPhones(singlePhone);
};

function displyingPhones(pdata) {
  let totalPhones = pdata.length;
  const showButton = document.getElementById("showALlButton");
  if (pdata.length > 10) {
    showButton.classList.remove("hidden");
  } else {
    showButton.classList.add("hidden");
  }
  pdata = pdata.slice(0, 10);
  console.log(pdata);

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
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
    `;
    phoneContainer.appendChild(phoneCard);
  }
}

function specificPhones() {
  const inputfield = document.getElementById("searchINput");
  const inputfieldValue = inputfield.value;
  fetchingURL(inputfieldValue);
}
