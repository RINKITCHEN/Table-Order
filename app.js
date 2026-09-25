const menuData=[
{id:1,name:"ข้าวผัดหมู",price:55,emoji:"🍳"},
{id:2,name:"กะเพราหมู",price:60,emoji:"🌿"},
{id:3,name:"ผัดไทย",price:65,emoji:"🍜"},
{id:4,name:"ต้มยำกุ้ง",price:120,emoji:"🍲"},
{id:5,name:"ชาเย็น",price:35,emoji:"🧋"},
{id:6,name:"น้ำเปล่า",price:15,emoji:"💧"}];

let cart=[];
const $=s=>document.querySelector(s);
const money=n=>"฿"+n.toLocaleString("th-TH");
const getOrders=()=>JSON.parse(localStorage.getItem("orders")||"[]");
const saveOrders=x=>localStorage.setItem("orders",JSON.stringify(x));

for(let i=1;i<=12;i++) $("#tableSelect").insertAdjacentHTML("beforeend",`<option value="${i}">โต๊ะ ${i}</option>`);

function renderMenu(){
 $("#menu").innerHTML=menuData.map(x=>`<div class="card"><div class="emoji">${x.emoji}</div><h3>${x.name}</h3><div class="price">${money(x.price)}</div><button onclick="add(${x.id})">+ เพิ่มรายการ</button></div>`).join("");
}
function add(id){
 const x=menuData.find(a=>a.id===id), found=cart.find(a=>a.id===id);
 found?found.qty++:cart.push({...x,qty:1}); renderCart();
}
function change(id,d){
 const x=cart.find(a=>a.id===id); if(!x)return;
 x.qty+=d;if(x.qty<=0)cart=cart.filter(a=>a.id!==id);renderCart();
}
function renderCart(){
 $("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><span>${x.name} × ${x.qty}</span><span class="qty"><button onclick="change(${x.id},-1)">−</button> <button onclick="change(${x.id},1)">+</button></span></div>`).join(""):"<p style='color:#777'>ยังไม่มีรายการ</p>";
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 $("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)+" รายการ";$("#cartTotal").textContent=money(total);
}
$("#placeOrder").onclick=()=>{
 if(!cart.length)return toast("เลือกอาหารก่อนครับ");
 const orders=getOrders(), total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 orders.unshift({id:Date.now(),table:+$("#tableSelect").value,items:cart.map(x=>({name:x.name,qty:x.qty,price:x.price})),total,status:"new",time:new Date().toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})});
 saveOrders(orders);cart=[];renderCart();toast("ส่งออเดอร์เรียบร้อย 🎉");renderKitchen();
};
function renderKitchen(){
 const orders=getOrders();
 $("#orderCount").textContent=orders.length;
 $("#newCount").textContent=orders.filter(x=>x.status==="new").length;
 $("#salesTotal").textContent=money(orders.reduce((s,x)=>s+x.total,0));
 $("#orders").innerHTML=orders.length?orders.map(o=>`<div class="order ${o.status==="new"?"new":""}">
 <div class="order-head"><strong>โต๊ะ ${o.table}</strong><span class="badge">${o.status==="new"?"ออเดอร์ใหม่":o.status==="accepted"?"กำลังทำ":"เสิร์ฟแล้ว"} · ${o.time}</span></div>
 <ul>${o.items.map(i=>`<li>${i.name} × ${i.qty}</li>`).join("")}</ul>
 <strong>${money(o.total)}</strong>
 <div class="actions">${o.status==="new"?`<button class="accept" onclick="status(${o.id},'accepted')">รับออเดอร์</button>`:""}${o.status==="accepted"?`<button class="serve" onclick="status(${o.id},'served')">เสิร์ฟแล้ว</button>`:""}</div>
 </div>`).join(""):"<p style='color:#777'>ยังไม่มีออเดอร์</p>";
}
function status(id,s){const x=getOrders();const o=x.find(a=>a.id===id);if(o)o.status=s;saveOrders(x);renderKitchen();toast(s==="served"?"ปิดออเดอร์แล้ว":"รับออเดอร์แล้ว");}
$("#clearOrders").onclick=()=>{if(confirm("ล้างออเดอร์ทั้งหมด?")){saveOrders([]);renderKitchen();}};
function toast(t){$("#toast").textContent=t;$("#toast").style.display="block";setTimeout(()=>$("#toast").style.display="none",1800)}
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));$("#"+b.dataset.page).classList.add("active");if(b.dataset.page==="kitchen")renderKitchen()});
window.add=add;window.change=change;window.status=status;
renderMenu();renderCart();renderKitchen();
