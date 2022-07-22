let navToggle = document.getElementById('navToggle');
let navLeft = document.getElementById('navLeft');
let navClose = document.getElementById('closeNav-btn');
let cartToggle = document.getElementById('cartToggle');
let cartContent = document.getElementById('cart');
let lightboxToggle = document.getElementById('toggleImg');
let lightbox = document.querySelector('.lightbox');
let closeLightbox = document.querySelector('.close-btn');
let desktopImg = document.querySelector('.desktop-active-img');
const desktopThumbs = Array.from(document.querySelectorAll('.desktop-thumb'));
let lightboxImg = document.querySelector('.lightbox-active-img');
const lightboxThumbs = Array.from(document.querySelectorAll('.lightbox-thumb'));
let minusBtn = document.querySelector('.minus-btn');
let plusBtn = document.querySelector('.plus-btn');
let productQuantity = document.getElementById('product-quantity');

// const ctrlBtns = Array.from(document.querySelectorAll('.ctrl'));
let prevBtn = document.querySelector('.lightbox-prev');
let nextBtn = document.querySelector('.lightbox-next');
let mobilePrevBtn = document.querySelector('.mobile-prev');
let mobileNextBtn = document.querySelector('.mobile-next');
let mobileImg = document.querySelector('.mobile-active-img');
let parentElement = document.querySelector('.content-container');
let addCartBtn = document.querySelector('.add-cart');



// console.log(desktopImg.src);

// NavBar Toggle

navToggle.addEventListener('click', () => {
  navLeft.classList.add('showNav');
  addOverlay();
})

navClose.addEventListener('click', () => {
  navLeft.classList.remove('showNav');
  removeOverlay();
})

// cart toggle

cartToggle.addEventListener('click', () => {
  cartContent.classList.toggle('show-cart-content');
})

// lightbox toggle

lightboxToggle.addEventListener('click', () => {
  lightbox.classList.add('show-lightbox');
  lightbox.style.display = 'grid';
  addOverlay();
})

closeLightbox.addEventListener('click', () => {
  lightbox.classList.remove('show-lightbox');
  lightbox.style.display = 'none';
  removeOverlay();
})

// desktop slide
desktopThumbs.forEach((thumbs) => {
  thumbs.addEventListener('click', (e) => {
    
    let imgSrc = e.currentTarget.dataset.src;
    // check if active class exists and remove from all the elements in the array
    desktopThumbs.map((e) => {
      let active = e.classList;
      if(active.contains('desktop-active-thumb')) {
        active.remove('desktop-active-thumb');
      }
    })
    // Assign active class to clicked thumb and set active imagge src
    thumbs.classList.add('desktop-active-thumb');
    desktopImg.src = imgSrc;
  })
})

// lightbox slide
lightboxThumbs.forEach((thumbs) => {
  thumbs.addEventListener('click', (e) => {
    
    let imgSrc = e.currentTarget.dataset.src;
    // check if active class exists and remove from all the elements in the array
    lightboxThumbs.map((e) => {
      let active = e.classList;
      if(active.contains('lightbox-active-thumb')) {
        active.remove('lightbox-active-thumb');
      }
    })
    // Assign active class to clicked thumb and set active imagge src
    
    lightboxImg.src = imgSrc;
    if(lightboxImg.src = imgSrc){
      thumbs.classList.add('lightbox-active-thumb');
    }
  })
});

// lightbox controls 

let idx = 0;
nextBtn.addEventListener('click', () => {
  idx++;

  lightboxThumbs.map((e) => {
    let active = e.classList;
    if(active.contains('lightbox-active-thumb')) {
      active.remove('lightbox-active-thumb');
    }
  })
  
  if(idx > lightboxThumbs.length - 1){
    idx = 0;
  }
  let targetSrc = lightboxThumbs[idx].dataset.src;
  lightboxImg.src = targetSrc;

  if(lightboxImg.src = targetSrc){
    lightboxThumbs[idx].classList.add('lightbox-active-thumb');
  }

})

prevBtn.addEventListener('click', () => {
  idx--;

  lightboxThumbs.map((e) => {
    let active = e.classList;
    if(active.contains('lightbox-active-thumb')) {
      active.remove('lightbox-active-thumb');
    }
  })
  
  if(idx < 0 ){
    idx = lightboxThumbs.length - 1;
  }

  let targetSrc = lightboxThumbs[idx].dataset.src;
  lightboxImg.src = targetSrc;

  if(lightboxImg.src = targetSrc){
    lightboxThumbs[idx].classList.add('lightbox-active-thumb');
  }
})

// product counter
let initialValue = 0;
minusBtn.addEventListener('click', () => {
  initialValue--;
  productQuantity.value = initialValue;
})

plusBtn.addEventListener('click', () => {
  initialValue++;
  productQuantity.value = initialValue;
})

// mobile slide

mobileNextBtn.addEventListener('click', () => {
  idx++;
  if(idx > lightboxThumbs.length - 1){
    idx = 0;
  }
  let targetSrc = lightboxThumbs[idx].dataset.src;
  mobileImg.src = targetSrc;
  
});

mobilePrevBtn.addEventListener('click', () => {
  idx--;
  if(idx < 0 ){
    idx = lightboxThumbs.length - 1;
  }
  let targetSrc = lightboxThumbs[idx].dataset.src;
  mobileImg.src = targetSrc;
  
});

// add to cart
let productsInCart = [];

addCartBtn.addEventListener('click', () => {
  let newPrice = document.querySelector('.new-price').textContent.slice(1);
  let prodTitle = document.querySelector('.product-title').textContent;
  let quantity = Number(productQuantity.value);
  let cartImg = document.querySelector('.desktop-active-img');
  let total = Number(newPrice) * Number(quantity);
  let cartImagSrc = cartImg.src;
  let itemID = document.querySelector('.product-info').dataset.id;
  
  

  let productToCart = {
    id: itemID,
    price: newPrice,
    name: prodTitle,
    buyQuantity: quantity,
    totalCost: total,
    img: cartImagSrc,
  }

  if(typeof quantity === 'number' && quantity > 0){
    updateProductsInCart(productToCart);
    updateShoppingCartHTML(); 
    cartSpan();
    deleteCart(); 
  } else {
    alert('Item quantity must be above zero');
  }
})




// Main Functions

function deleteCart() {
  let delBtn = parentElement.querySelector('.cart-delete-btn');
  let targetID = delBtn.dataset.id;
  delBtn.addEventListener('click', ()=> {
    for(let i = 0; i < productsInCart.length; i++){
      let productID = productsInCart[i].id;
      if(productID = targetID){
        productsInCart.splice(i, 1);
        // console.log(productsInCart);
      }
    }
    updateShoppingCartHTML();
    cartSpan();
  })
}

function cartSpan() {
  let cartIcon = document.querySelector('.cart-link')
  let cartSpan = document.createElement('span');

  if(cartIcon.contains(cartIcon.querySelector('span'))){
    Array.from(cartIcon.querySelectorAll('span')).map((e) => {
      e.remove();
    })
  }

  if(productsInCart.length > 0){
    cartIcon.appendChild(cartSpan);
    cartSpan.textContent = productsInCart.length;
    // cartSpan.textContent = countCartQuantity();
  
  } 
}

function addOverlay(){
  if(!document.body.contains(document.querySelector(".overlay"))){
      const overlayElement = document.createElement("div");
      overlayElement.classList.add("overlay");
      document.body.append(overlayElement);
  }
}

function removeOverlay() {
  if(document.body.contains(document.body.querySelector(".overlay"))){
    document.body.querySelector(".overlay").remove();
  }
};

function updateProductsInCart(product) {
  for(let i = 0; i < productsInCart.length; i++){
    let item = productsInCart[i];
    if(item.id === product.id){
      item.buyQuantity += product.buyQuantity;
      return;
    } 
  }

  productsInCart.push(product);
};

function updateShoppingCartHTML() {
  if(productsInCart.length > 0){
    

    let result = productsInCart.map((product) => {
      return `

      <div class="cart-filled" data-id="${product.id}">
        <div class="cart-info">
          <div class="cart-item-img">
          <img src="${product.img}" alt="" class="cart-img" width="45px">
          </div>

        <div class="price-info">
          <h4 class="cart-item-title">
            ${product.name}
          </h4>
          
          <div>
            <span class="price">$${product.price}</span>
            <span class="multiply">x</span>
            <span class="quantity">${product.buyQuantity}</span>
            <span class="total-price"> $${product.totalCost}</span>
          </div>
        </div>

        <div class="cart-delete-btn" data-id="${product.id}">
          <i class="fa-solid fa-trash-can"></i>
        </div>
          
        </div>

        <div class="btn-container" id="btn">
          <button class="btn">
            Checkout
          </button>
        </div>  
      </div>
      `
    })

    parentElement.innerHTML = result.join('');

    
  } else {
    parentElement.innerHTML = 
    `
    <div class="cart-empty">
      <p>Your cart is empty</p>
    </div>
    `
  }
};

function countCartQuantity() {
  let totalQuantity = 0;
  productsInCart.forEach((product) => {
    totalQuantity += product.buyQuantity;
  })

  return totalQuantity;
}









// addCartBtn.addEventListener('click', () => {
//   let newPrice = document.querySelector('.new-price').textContent.slice(1);
//   let prodTitle = document.querySelector('.product-title').textContent;
//   let quantity = Number(productQuantity.value);
//   let cartImg = document.querySelector('.desktop-active-img');
//   let total = Number(newPrice) * Number(quantity);
//   let cartImagSrc = cartImg.src;
//   // let cartCount = document.querySelector('.cart-item-list');
//   let cartIcon = document.querySelector('.cart-link')
//   let cartSpan = document.createElement('span');


//   if(typeof quantity === 'number' && quantity > 0) {
//     cartContainer.innerHTML = `
    // <div class="cart-filled">
    // <div class="cart-info">
    //   <div class="cart-item-img">
    //   <img src="${cartImagSrc}" alt="" class="cart-img" width="45px">
    //   </div>

    // <div class="price-info">
    //   <h4 class="cart-item-title">
    //     ${prodTitle}
    //   </h4>
      
    //   <div>
    //     <span class="price">$${newPrice}</span>
    //     <span class="multiply">x</span>
    //     <span class="quantity">${quantity}</span>
    //     <span class="total-price"> $${total}</span>
    //   </div>
    // </div>

    // <div>
    //   <i class="fa-solid fa-trash-can"></i>
    // </div>
      
    // </div>

    // <div class="btn-container" id="btn">
    //   <button class="btn">
    //     Checkout
    //   </button>
    // </div>
    // </div>`

  // if(cartIcon.contains(cartIcon.querySelector('span'))){
  //   Array.from(cartIcon.querySelectorAll('span')).map((e) => {
  //     e.remove();
  //   })
  // }

  // cartIcon.appendChild(cartSpan);
  // cartSpan.textContent = quantity;

//   } else {
//     alert('Item quantity must be above zero');
//   }
// })