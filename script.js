const products = [
 {id:1,name:"The Everyday Black",category:"Men",price:1499,oldPrice:2199,rating:4.8,badge:"BESTSELLER",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",description:"A timeless black frame designed for all-day comfort. Clean lines make this an easy everyday essential."},
 {id:2,name:"Studio Round Tortoise",category:"Women",price:1799,oldPrice:2499,rating:4.9,badge:"NEW",image:"https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=85",description:"A soft round silhouette with a warm tortoise finish. Made to bring a little character to every look."},
 {id:3,name:"Coastline Aviator",category:"Sunglasses",price:2299,oldPrice:2999,rating:4.7,badge:"TRENDING",image:"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=85",description:"Classic aviator-inspired sunglasses with a modern, lightweight feel for bright days outdoors."},
 {id:4,name:"Soft Focus Blue Light",category:"Computer Glasses",price:1299,oldPrice:1899,rating:4.6,badge:"WORKDAY PICK",image:"https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=85",description:"A versatile frame for your desk-to-dinner routine. Minimal styling meets comfortable everyday wear."},
 {id:5,name:"Sunday Clear",category:"Women",price:1599,oldPrice:2199,rating:4.8,badge:"POPULAR",image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",description:"Light, bright and easy to style. A subtle frame that keeps your look fresh and effortless."},
 {id:6,name:"Metro Matte",category:"Men",price:1899,oldPrice:2599,rating:4.7,badge:"JUST IN",image:"https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=85",description:"A confident shape with a matte finish. A contemporary frame that works with every wardrobe."},
 {id:7,name:"Little Explorer",category:"Kids",price:999,oldPrice:1399,rating:4.8,badge:"KIDS FAVOURITE",image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85",description:"A fun everyday look for growing personalities. Lightweight styling with a playful feel."},
 {id:8,name:"After Hours Square",category:"Sunglasses",price:2499,oldPrice:3299,rating:4.9,badge:"LIMITED",image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85",description:"Bold square styling for days when your accessories do the talking. A statement-making pair."},
 {id:9,name:"The Minimalist",category:"Computer Glasses",price:1399,oldPrice:1999,rating:4.5,badge:"EVERYDAY",image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",description:"A clean, understated silhouette that pairs easily with workwear and weekend outfits."},
 {id:10,name:"Weekend Club",category:"Men",price:1999,oldPrice:2799,rating:4.8,badge:"BESTSELLER",image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85",description:"Relaxed proportions and a versatile shape make this a go-to frame for off-duty days."},
 {id:11,name:"Petite Pop",category:"Kids",price:899,oldPrice:1299,rating:4.6,badge:"PLAYFUL",image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85",description:"A bright, personality-filled frame for little trendsetters. Made for everyday adventures."},
 {id:12,name:"Golden Hour",category:"Sunglasses",price:2199,oldPrice:2899,rating:4.9,badge:"STAFF PICK",image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=85",description:"A warm-toned statement pair inspired by late-afternoon light and slow weekends."}
];

const $ = (s,root=document) => root.querySelector(s);
const $$ = (s,root=document) => [...root.querySelectorAll(s)];
const money = n => "₹" + n.toLocaleString("en-IN");
const readStore = (key,fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
let cart = readStore("vision-cart",[]);
let wishlist = readStore("vision-wishlist",[]);
let activeCategory = "All";
let searchTerm = "";
let sortMode = "featured";
let toastTimer;

function saveState(){localStorage.setItem("vision-cart",JSON.stringify(cart));localStorage.setItem("vision-wishlist",JSON.stringify(wishlist));}
function notify(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);}
function productById(id){return products.find(p=>p.id===Number(id));}
function filteredProducts(){
 let list=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(`${p.name} ${p.category}`.toLowerCase().includes(searchTerm)));
 if(sortMode==="price-low")list.sort((a,b)=>a.price-b.price);
 if(sortMode==="price-high")list.sort((a,b)=>b.price-a.price);
 if(sortMode==="rating")list.sort((a,b)=>b.rating-a.rating);
 return list;
}
function renderProducts(){
 const list=filteredProducts(),grid=$("#product-grid");
 $("#results-count").textContent=`Showing ${list.length} of ${products.length} frames`;
 grid.innerHTML=list.map(p=>`<article class="product-card" data-product="${p.id}">
  <div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-badge">${p.badge}</span>
  <button class="heart-btn ${wishlist.includes(p.id)?"saved":""}" data-wish="${p.id}" aria-label="Toggle wishlist">${wishlist.includes(p.id)?"♥":"♡"}</button></div>
  <div class="product-info"><div class="product-category">${p.category}</div><h3 class="product-title">${p.name}</h3><div class="product-rating">★ ${p.rating} &nbsp;·&nbsp; Free delivery</div><div class="product-price"><strong>${money(p.price)}</strong><span class="old-price">${money(p.oldPrice)}</span><span class="discount">${Math.round((1-p.price/p.oldPrice)*100)}% OFF</span></div></div>
 </article>`).join("");
 $("#empty-state").classList.toggle("hidden",list.length!==0);
}
function setCategory(category){
 activeCategory=category;
 $$(".filter-chip").forEach(b=>b.classList.toggle("active",b.dataset.filter===category));
 renderProducts();
}
function updateCounts(){
 $("#cart-count").textContent=cart.reduce((n,item)=>n+item.qty,0);
 $("#wishlist-count").textContent=wishlist.length;
 $("#drawer-cart-count").textContent=`(${cart.reduce((n,item)=>n+item.qty,0)})`;
}
function addToCart(id){
 const item=cart.find(x=>x.id===id);
 if(item)item.qty++;else cart.push({id,qty:1});
 saveState();updateCounts();renderCart();notify("Added to your bag");
}
function toggleWishlist(id){
 wishlist=wishlist.includes(id)?wishlist.filter(x=>x!==id):[...wishlist,id];
 saveState();updateCounts();renderProducts();renderWishlist();
 notify(wishlist.includes(id)?"Saved to wishlist":"Removed from wishlist");
}
function renderCart(){
 const host=$("#cart-items");
 if(!cart.length){host.innerHTML='<div class="empty-cart"><div>🛍</div><h3>Your bag is waiting</h3><p>Looks like you have not found your perfect pair yet.</p></div>';$("#cart-footer").classList.add("hidden");return;}
 $("#cart-footer").classList.remove("hidden");
 host.innerHTML=cart.map(item=>{const p=productById(item.id);return `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${p.category}</p><strong>${money(p.price)}</strong><div class="qty-control"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${p.id}">Remove</button></div>`}).join("");
 const total=cart.reduce((sum,item)=>sum+productById(item.id).price*item.qty,0);
 $("#cart-subtotal").textContent=money(total);$("#checkout-total").textContent=money(total);
}
function renderWishlist(){
 const host=$("#wishlist-items");
 if(!wishlist.length){host.innerHTML='<div class="empty-cart"><div>♡</div><h3>Your wishlist is empty</h3><p>Tap the heart on a frame to save it here.</p></div>';return;}
 host.innerHTML=wishlist.map(id=>{const p=productById(id);return `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${p.category}</p><strong>${money(p.price)}</strong><div class="qty-control"><button data-add="${p.id}">Add to bag</button></div></div><button class="remove-item" data-unwish="${p.id}">Remove</button></div>`}).join("");
}
function openDrawer(which){
 closeDrawers();$("#overlay").classList.add("show");$(`#${which}-drawer`).classList.add("open");document.body.style.overflow="hidden";
}
function closeDrawers(){
 $$(".drawer").forEach(d=>d.classList.remove("open"));$("#overlay").classList.remove("show");document.body.style.overflow="";
}
function showProduct(id){
 const p=productById(id);
 $("#product-detail").innerHTML=`<div class="detail-layout"><img src="${p.image}" alt="${p.name}"><div class="detail-copy"><p class="eyebrow">${p.category.toUpperCase()} · ${p.badge}</p><h2>${p.name}</h2><div class="product-rating">★ ${p.rating} / 5 · Loved by customers</div><div class="product-price"><strong>${money(p.price)}</strong><span class="old-price">${money(p.oldPrice)}</span></div><p>${p.description}</p><p>✓ Free delivery&nbsp;&nbsp; ✓ Easy returns</p><button class="btn btn-dark" data-detail-add="${p.id}">Add to bag <span>→</span></button></div></div>`;
 $("#product-dialog").showModal();
}
function changeQty(id,delta){
 const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
 saveState();updateCounts();renderCart();
}

$("#product-grid").addEventListener("click",e=>{
 const wish=e.target.closest("[data-wish]");if(wish){e.stopPropagation();toggleWishlist(Number(wish.dataset.wish));return;}
 const card=e.target.closest("[data-product]");if(card)showProduct(Number(card.dataset.product));
});
$("#product-detail").addEventListener("click",e=>{const b=e.target.closest("[data-detail-add]");if(b){addToCart(Number(b.dataset.detailAdd));$("#product-dialog").close();openDrawer("cart");}});
$("#cart-items").addEventListener("click",e=>{
 const qty=e.target.closest("[data-qty]"),remove=e.target.closest("[data-remove]");
 if(qty)changeQty(Number(qty.dataset.qty),Number(qty.dataset.change));
 if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));saveState();updateCounts();renderCart();}
});
$("#wishlist-items").addEventListener("click",e=>{
 const add=e.target.closest("[data-add]"),remove=e.target.closest("[data-unwish]");
 if(add)addToCart(Number(add.dataset.add));
 if(remove)toggleWishlist(Number(remove.dataset.unwish));
});
$("#filter-row").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(b)setCategory(b.dataset.filter);});
$$("[data-nav-category]").forEach(a=>a.addEventListener("click",()=>setCategory(a.dataset.navCategory)));
$$("[data-category]").forEach(b=>b.addEventListener("click",()=>{setCategory(b.dataset.category);$("#shop").scrollIntoView({behavior:"smooth"});}));
$("#search-input").addEventListener("input",e=>{searchTerm=e.target.value.trim().toLowerCase();renderProducts();});
$("#sort-select").addEventListener("change",e=>{sortMode=e.target.value;renderProducts();});
$("#clear-filter").addEventListener("click",()=>{searchTerm="";$("#search-input").value="";setCategory("All");});
$("#reset-search").addEventListener("click",()=>{$("#clear-filter").click();});
$("#cart-open").addEventListener("click",()=>{renderCart();openDrawer("cart");});
$("#wishlist-open").addEventListener("click",()=>{renderWishlist();openDrawer("wishlist");});
$("#overlay").addEventListener("click",closeDrawers);
$$(".close-drawer").forEach(b=>b.addEventListener("click",closeDrawers));
$("#dialog-close").addEventListener("click",()=>$("#product-dialog").close());
$("#checkout-btn").addEventListener("click",()=>{if(!cart.length)return;closeDrawers();$("#checkout-dialog").showModal();});
$("#checkout-close").addEventListener("click",()=>$("#checkout-dialog").close());
$("#checkout-form").addEventListener("submit",e=>{e.preventDefault();const orderId="VSN"+Math.floor(100000+Math.random()*900000);$("#checkout-dialog").close();cart=[];saveState();updateCounts();renderCart();notify(`Demo order ${orderId} placed!`);e.target.reset();});
$("#newsletter-form").addEventListener("submit",e=>{e.preventDefault();e.target.reset();notify("Thanks for subscribing!");});
$("#account-btn").addEventListener("click",()=>notify("Account sign-in can be connected in the next version."));
$("#mobile-menu-btn").addEventListener("click",()=>$("#main-nav").classList.toggle("mobile-open"));
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#search-input").focus();}if(e.key==="Escape")closeDrawers();});

renderProducts();renderCart();renderWishlist();updateCounts();
