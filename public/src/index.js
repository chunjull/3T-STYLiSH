// 基本 API URL
const url = "https://api.appworks-school.tw/api/1.0/products/";

// 宣告全域變數
const main = document.querySelector(".container__main");
const cards = document.querySelector(".cards");
const loader = document.getElementById("loading");

// 宣告全域變數，定義狀態
let loading = false;
let nextPaging;

// 宣告全域變數，用來儲存 AbortController
let controller;

// 完全載入後執行的事件
document.addEventListener("DOMContentLoaded", () => {
  const formMobile = document.querySelector(".search__form");

  // 更新手機版的表單顯示狀態
  function updateFormDisplay() {
    if (window.innerWidth <= 1279) {
      formMobile.style.display = "none";
    } else {
      formMobile.style.display = "flex";
    }
  }

  // 註冊視窗大小改變事件
  window.addEventListener("resize", updateFormDisplay);
  updateFormDisplay();

  // 建立手機版搜尋點擊事件
  const searchMobile = document.querySelector(".search__icon__mobile");
  searchMobile.addEventListener("click", () => {
    const searchInput = document.getElementById("search");
    if (formMobile.style.display === "none") {
      formMobile.style.display = "flex";
      searchInput.focus();
    } else {
      formMobile.style.display = "none";
      searchInput.blur();
    }
  });

  // 搜尋表單提交事件
  const searchForm = document.getElementById("search__form");
  const searchInput = document.getElementById("search");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = searchInput.value.trim();
    history.pushState(null, null, `?keyword=${keyword}`);
    searchProducts(keyword);
  });

  // 使用 Fetch API 請求行銷活動資料
  fetch("https://api.appworks-school.tw/api/1.0/marketing/campaigns")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      initCarousel(data.data);
    })
    .catch(error => {
      console.error(`Network error: ${error.message}`);
    });

  // 根據 URL 參數載入初始資料
  const currentUrl = new URL(window.location.href);
  let category = currentUrl.searchParams.get("category");
  let keyword = currentUrl.searchParams.get("keyword")

  if (category === null && keyword === null) {
    category = "all";
  } else {
    const categoryLink = document.querySelectorAll(`a[href="?category=${category}"]`);
    categoryLink?.forEach(item => {
      item.classList.add("category__link--active");
      item.classList.add("category__link__mobile--active");
    });
  }

  // 建立初始加載的 URL
  let initialUrl;
  if (category) {
    initialUrl = `${url}${category}?`;
  } else if (keyword) {
    initialUrl = `${url}search?keyword=${keyword}`;
  } else {
    initialUrl = `${url}all?`;
  }
  fetchData(initialUrl);

  // 設定滾動事件監聽器
  window.addEventListener("scroll", scrollHandler);

  const badge = document.querySelector(".menu__cart__badge");
  const badgeMobile = document.querySelector(".function__cart__badge__mobile");
  badge.textContent = localStorage.getItem("cartQuantity") || 0;
  badgeMobile.textContent = localStorage.getItem("cartQuantity") || 0;
});

// 建立新的 AbortController 並返回信號
function createAbortController() {
  const httpTimeout = 3000;
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  
  setTimeout(() => {
    controller.abort();
  }, httpTimeout);

  return controller.signal;
}

// 建立輪播效果
function initCarousel(data) {
  const bannerFirst = document.querySelector(".banner__first");
  const bannerSecond = document.querySelector(".banner__second");
  const dotsContainer = document.querySelector(".carousel__dots");

  data.forEach((campaign, index) => {
    // 動態生成 dots
    const dot = document.createElement("li");
    dot.className = "carousel__dot";
    dot.setAttribute('data-index', index);
    dotsContainer.appendChild(dot);
  });

  let i = 0;
  const speed = 3000;
  let currentBanner = bannerFirst;
  let nextBanner = bannerSecond;

  function updateCarousel(index) {
    const mainText = nextBanner.querySelector(".banner__content__main");
    const subText = nextBanner.querySelector(".banner__content__source");

    nextBanner.style.backgroundImage = `url("${data[index].picture}")`;
    nextBanner.href = `/product.html?id=${data[index].product_id}`;
    let str = `${data[index].story}`;
    let lastIndex = str.lastIndexOf("\r\n");
    let mainContent = str.substring(0, lastIndex + 2);
    let subContent = str.substring(lastIndex + 2);
    let story = mainContent.replaceAll("\r\n", "<br />");
    mainText.innerHTML = story;
    subText.innerHTML = subContent;

    currentBanner.classList.remove('banner__active');
    currentBanner.classList.add('banner__fadeout');

    nextBanner.classList.remove('banner__fadeout');
    nextBanner.classList.add('banner__active');

    // 切換 banners
    [currentBanner, nextBanner] = [nextBanner, currentBanner];

    // 更新 dots 狀態
    dotsContainer.querySelectorAll('.carousel__dot').forEach(dot => dot.classList.remove('carousel__dot__active'));
    dotsContainer.querySelectorAll('.carousel__dot')[index].classList.add('carousel__dot__active');
  }

  function startCarousel() {
    updateCarousel(i);
    i = (i + 1) % data.length;
    setTimeout(startCarousel, speed);
  }
  startCarousel();

  // 點擊事件
  dotsContainer.querySelectorAll('.carousel__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      i = parseInt(dot.getAttribute('data-index'), 10);
      updateCarousel(i);
    });
  });
}

// 判斷滾動狀態
function scrollHandler() {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 500 && typeof nextPaging === "number" && !loading) {
    loader.style.display = "block";

    // 根據當前 category 或 search 來決定加載的 URL
    const currentUrl = new URL(window.location.href);
    let category = currentUrl.searchParams.get("category");
    let keyword = currentUrl.searchParams.get("keyword");

    let apiUrl;
    if (category) {
      apiUrl = `${url}${category}?paging=${nextPaging}`;
    } else if (keyword) {
      apiUrl = `${url}search?keyword=${keyword}&paging=${nextPaging}`;
    } else {
      apiUrl = `${url}all?paging=${nextPaging}`;
    }
    fetchData(apiUrl);
  }
}

// 使用 Fetch API 請求資料
function fetchData(apiUrl = `${url}all?paging=${nextPaging}`) {
  const signal = createAbortController();

  if (loading) {
    return;
  }
  loading = true;
  loader.style.display = "block";
  addSkeletons();

  fetch(apiUrl, { signal })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.data.length === 0) {
        displayNoResults();
      } else {
        displayData(data.data);
        nextPaging = data.next_paging;
        if (nextPaging === undefined) {
          removeScroll();
        }
      }
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error(`Network error: ${error.message}`);
        loader.innerHTML = "<p>Network error occurred. Please try again later.</p>";
      }
    })
    .finally(() => {
      loading = false;
      loader.style.display = "none";
      removeSkeletons();
    });
}

// 添加骨架
function addSkeletons() {
  for (let i = 0; i < 6; i++) {
    const skeletonItem = document.createElement("li");
    skeletonItem.className = "card__item skeleton__container";
    skeletonItem.innerHTML = `
      <a href="#" class="card__item__link">
        <div class="skeleton card__item__img"></div>
        <ul class="skeleton skeleton__text card__item__colors"></ul>
        <h4 class="skeleton skeleton__text card__item__title"></h4>
        <p class="skeleton skeleton__text card__item__price"></p>
      </a>
    `;
    cards.appendChild(skeletonItem);
  }
}

// 移除骨架
function removeSkeletons() {
  const skeletons = document.querySelectorAll(".skeleton__container");
  skeletons.forEach(skeleton => skeleton.remove());
}

// 顯示搜尋不到結果的訊息
function displayNoResults() {
  main.innerHTML = '<p class="search__no__result">搜尋不到您輸入的商品</p>';
}

// 顯示取得的產品資料
function displayData(items) {
  removeSkeletons();
  items.forEach((item) => {
    const cardItem = document.createElement("li");
    cardItem.className = "card__item";
    const colorsList = item.colors
      .map(
        (color) =>
          `<li class="card__item__color" style="background-color: #${color.code}"></li>`
      )
      .join("");
    cardItem.innerHTML = `
      <a href="/product?id=${item.id}" class="card__item__link">
        <img
          src="${item.main_image}"
          alt="product-image"
          class="card__item__img"
        />
        <ul class="card__item__colors">
          ${colorsList}
        </ul>
        <h4 class="card__item__title">${item.title}</h4>
        <p class="card__item__price">TWD.${item.price}</p>
      </a>
    `;
    cards.appendChild(cardItem);
  });
}

// 根據關鍵字搜尋產品
function searchProducts(keyword) {
  const searchUrl = `${url}search?keyword=${keyword}`;
  nextPaging = 0;
  cards.innerHTML = "";
  if (keyword) {
    fetchData(searchUrl);
  } else {
    fetchData(`${url}all`);
  }
}

// 移除滾動事件監聽器
function removeScroll() {
  window.removeEventListener("scroll", scrollHandler);
}