let originalData;

async function getMenu() {
  try {
    const response = await fetch(
      "https://avivashishta29.github.io/f2-contest-test/db.json"
    );
    const data = await response.json();
    const title = document.getElementById("title");
    title.innerHTML = "Menu";
    console.log(data);
    renderTable(data);
    originalData = data;
  } catch (error) {
    console.log("Error fetching menu:", error);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById("data-body");
  tableBody.innerHTML = "";
  const tbody = document.getElementById("data-body");

  data.forEach((food) => {
    const row = document.createElement("tr");

    const image = document.createElement("td");
    img = document.createElement("img");
    image.appendChild(img);
    img.src = food.imgSrc;
    row.appendChild(image);

    const nameCell = document.createElement("td");
    nameCell.textContent = food.name;
    row.appendChild(nameCell);

    const price = document.createElement("td");
    price.textContent = food.price;
    row.appendChild(price);

    tbody.appendChild(row);
  });
}

function takeOrder(menu) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomBurgers = filterAndRenderData("burger");
      const order = {
        burgers: randomBurgers,
      };
      resolve(order);
    }, 2500);
  });
}

function filterAndRenderData(searchInput) {
  const filteredData = originalData.filter((food) => {
    const nameMatch = food.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    return nameMatch;
  });

  if (filteredData.length < 3) {
    while (filteredData.length < 3) {
      const randomIndex = Math.floor(Math.random() * originalData.length);
      const randomBurger = originalData[randomIndex];
      if (!filteredData.includes(randomBurger)) {
        filteredData.push(randomBurger);
      }
    }
  }
  const title = document.getElementById("title");
  title.innerHTML = "Your Order";
  const tableBody = document.getElementById("data-body");
  tableBody.innerHTML = "";
  renderTable(filteredData);
  return filteredData;
}

function orderPrep() {
  const sub_text = document.getElementById("sub_text");
  sub_text.innerHTML = "Order Placed Successful!! Payment Processing...";
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  const sub_text = document.getElementById("sub_text");
  sub_text.innerHTML = "Payment Successful! Order placed!!! ";
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

async function handlePromises() {
  try {
    await getMenu();
    const order = await takeOrder();
    console.log("Order:", order);
    const prepStatus = await orderPrep();
    console.log("Preparation Status:", prepStatus);
    const paymentStatus = await payOrder();
    console.log("Payment Status:", paymentStatus);
    thankyouFnc();
  } catch (error) {
    console.log("Error:", error);
  }
}

handlePromises();
