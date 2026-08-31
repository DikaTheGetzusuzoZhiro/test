const products=[
  {rbx:'80',price:3000}, {rbx:'160',price:6000}, {rbx:'240',price:9000}, {rbx:'320',price:12000},
  {rbx:'500',price:15000}, {rbx:'800',price:24000}, {rbx:'1.000',price:30000}, {rbx:'1.500',price:45000},
  {rbx:'2.000',price:60000}, {rbx:'2.500',price:75000}, {rbx:'3.000',price:90000}, {rbx:'5.000',price:150000}
];
const defaultReviews=[
 {id:1,name:'Riz***ng',rating:5,text:'Layout-nya gampang dipahami. Cari nominal yang saya mau juga cepat.',product:'Top Up Robux',approved:true,createdAt:'2026-08-28'},
 {id:2,name:'Nab***',rating:5,text:'Checkout sederhana dan informasi harganya jelas. Enak dipakai dari HP.',product:'Robux',approved:true,createdAt:'2026-08-27'},
 {id:3,name:'Dim***ro',rating:5,text:'Sudah beberapa kali order. Tampilan bersih dan prosesnya tidak ribet.',product:'Robux',approved:true,createdAt:'2026-08-25'}
];
const settingsKey='tama_settings_v2', reviewsKey='tama_reviews_v2', productsKey='tama_products_v2';
const settings=JSON.parse(localStorage.getItem(settingsKey)||'{"storeName":"TAMA","whatsapp":"6280000000000","announcement":"TOP UP ROBUX LEBIH MUDAH BERSAMA TAMA · PROSES CEPAT · SUPPORT SETIAP HARI"}');
let reviews=JSON.parse(localStorage.getItem(reviewsKey)||'null')||defaultReviews;
let productData=JSON.parse(localStorage.getItem(productsKey)||'null')||products;
localStorage.setItem(settingsKey,JSON.stringify(settings));
localStorage.setItem(reviewsKey,JSON.stringify(reviews));
localStorage.setItem(productsKey,JSON.stringify(productData));

document.querySelector('.announcement').textContent=settings.announcement;
document.querySelectorAll('.brand span:last-child').forEach(el=>el.textContent=settings.storeName);
document.querySelector('.footer p').textContent='Platform top up Roblox dengan tampilan sederhana, cepat, dan nyaman.';
const grid=document.querySelector('#productGrid');
const rupiah=n=>new Intl.NumberFormat('id-ID').format(n);
function renderProducts(){
 grid.innerHTML=productData.map((p,i)=>`<article class="product-card"><div class="product-top"><div class="mini-orb">R</div><div><h3>${p.rbx} Robux</h3><small>${i<4?'Pilihan cepat':'Nominal populer'}</small></div></div><div class="product-bottom"><strong>Rp ${rupiah(p.price)}</strong><button class="buy-btn" data-rbx="${p.rbx}" data-price="${p.price}">Pilih</button></div></article>`).join('');
 document.querySelectorAll('.buy-btn').forEach(btn=>btn.onclick=()=>{showToast(`Paket ${btn.dataset.rbx} Robux dipilih • Rp ${rupiah(Number(btn.dataset.price))}`); document.querySelector('#checkoutModal')?.classList.add('show'); document.querySelector('#checkoutProduct').textContent=`${btn.dataset.rbx} Robux — Rp ${rupiah(Number(btn.dataset.price))}`;});
}
renderProducts();
const toast=document.querySelector('#toast'); let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)}
function save(){localStorage.setItem(reviewsKey,JSON.stringify(reviews));localStorage.setItem(productsKey,JSON.stringify(productData));localStorage.setItem(settingsKey,JSON.stringify(settings));}
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
function renderReviews(){
 const list=document.querySelector('#reviewList'); if(!list)return;
 const approved=reviews.filter(r=>r.approved).sort((a,b)=>b.id-a.id);
 list.innerHTML=approved.length?approved.map(r=>`<article class="review"><div class="stars">${stars(r.rating)}</div><p>“${escapeHtml(r.text)}”</p><strong>${escapeHtml(r.name)}</strong><span>${escapeHtml(r.product||'Customer')}</span></article>`).join(''):'<div class="empty-state">Belum ada ulasan.</div>';
 const count=document.querySelector('#reviewCount'); if(count)count.textContent=approved.length;
}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));}
renderReviews();

const reviewForm=document.querySelector('#reviewForm');
reviewForm?.addEventListener('submit',e=>{e.preventDefault(); const fd=new FormData(reviewForm); const rating=Math.max(1,Math.min(5,Number(fd.get('rating')))); reviews.push({id:Date.now(),name:String(fd.get('name')).slice(0,30),rating,text:String(fd.get('text')).slice(0,240),product:String(fd.get('product')||'Robux'),approved:false,createdAt:new Date().toISOString().slice(0,10)}); save(); reviewForm.reset(); renderReviews(); showToast('Ulasan berhasil dikirim dan menunggu persetujuan admin.');});

document.querySelector('#checkForm').addEventListener('submit',e=>{e.preventDefault();const id=document.querySelector('#trxId').value.trim();showToast(id?`Mencari transaksi ${id}...`:'Masukkan ID transaksi terlebih dahulu.');});
document.querySelector('.menu-toggle').addEventListener('click',()=>{const nav=document.querySelector('.nav-links');const open=nav.style.display==='flex';nav.style.display=open?'none':'flex';if(!open){nav.style.position='absolute';nav.style.top='64px';nav.style.left='0';nav.style.right='0';nav.style.padding='18px';nav.style.background='#0b0810';nav.style.flexDirection='column';nav.style.borderBottom='1px solid var(--line)';}});

// Checkout demo modal
const modal=document.querySelector('#checkoutModal');
document.querySelector('#closeCheckout')?.addEventListener('click',()=>modal.classList.remove('show'));
document.querySelector('#checkoutBtn')?.addEventListener('click',()=>{modal.classList.remove('show');showToast('Checkout demo. Hubungkan ke payment gateway untuk pembayaran nyata.');});

// Admin panel
const ADMIN_PASSWORD='TAMA2026';
const adminModal=document.querySelector('#adminModal');
document.querySelector('#adminOpen')?.addEventListener('click',()=>{document.querySelector('#adminLogin').classList.remove('hidden');document.querySelector('#adminDashboard').classList.add('hidden');adminModal.classList.add('show');});
document.querySelector('#closeAdmin')?.addEventListener('click',()=>adminModal.classList.remove('show'));
document.querySelector('#adminLoginForm')?.addEventListener('submit',e=>{e.preventDefault(); const pass=document.querySelector('#adminPassword').value; if(pass!==ADMIN_PASSWORD){showToast('Password admin salah.');return;} document.querySelector('#adminLogin').classList.add('hidden');document.querySelector('#adminDashboard').classList.remove('hidden');renderAdmin();});
function renderAdmin(){
 const pending=reviews.filter(r=>!r.approved); document.querySelector('#pendingCount').textContent=pending.length;
 document.querySelector('#adminReviews').innerHTML=(reviews.sort((a,b)=>b.id-a.id)).map(r=>`<div class="admin-row"><div><strong>${escapeHtml(r.name)}</strong><span>${stars(r.rating)} · ${escapeHtml(r.product||'Robux')}</span><p>${escapeHtml(r.text)}</p></div><div class="admin-actions">${r.approved?'<button data-action="unapprove" data-id="'+r.id+'">Sembunyikan</button>':'<button data-action="approve" data-id="'+r.id+'">Setujui</button>'}<button class="danger" data-action="delete" data-id="${r.id}">Hapus</button></div></div>`).join('');
 document.querySelector('#adminProducts').innerHTML=productData.map((p,i)=>`<div class="admin-row"><div><strong>${escapeHtml(p.rbx)} Robux</strong><span>Rp ${rupiah(p.price)}</span></div><div class="admin-actions"><button data-product="minus" data-i="${i}">−</button><button data-product="plus" data-i="${i}">+</button><button class="danger" data-product="delete" data-i="${i}">Hapus</button></div></div>`).join('');
}
document.addEventListener('click',e=>{const a=e.target.closest('[data-action]'); if(a){const id=Number(a.dataset.id); if(a.dataset.action==='approve'){reviews=reviews.map(r=>r.id===id?{...r,approved:true}:r)} else if(a.dataset.action==='unapprove'){reviews=reviews.map(r=>r.id===id?{...r,approved:false}:r)} else {reviews=reviews.filter(r=>r.id!==id)} save(); renderAdmin();renderReviews();return;} const p=e.target.closest('[data-product]'); if(p){const i=Number(p.dataset.i); if(p.dataset.product==='plus')productData[i].price+=1000; if(p.dataset.product==='minus')productData[i].price=Math.max(1000,productData[i].price-1000); if(p.dataset.product==='delete')productData.splice(i,1); save();renderProducts();renderAdmin();}});
document.querySelector('#addProduct')?.addEventListener('click',()=>{const name=prompt('Nominal Robux (contoh 700)');const price=Number(prompt('Harga (angka saja, contoh 21000)'));if(!name||!price)return;productData.push({rbx:name,price});save();renderProducts();renderAdmin();});
document.querySelector('#saveSettings')?.addEventListener('click',()=>{settings.announcement=document.querySelector('#adminAnnouncement').value.trim()||settings.announcement;settings.whatsapp=document.querySelector('#adminWhatsapp').value.trim()||settings.whatsapp;save();document.querySelector('.announcement').textContent=settings.announcement;showToast('Pengaturan tersimpan.');});

document.querySelector('#adminAnnouncement')?.addEventListener('focus',()=>document.querySelector('#adminAnnouncement').value=settings.announcement);
document.querySelector('#adminWhatsapp')?.addEventListener('focus',()=>document.querySelector('#adminWhatsapp').value=settings.whatsapp);
