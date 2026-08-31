const products=[
  {rbx:'100',price:'Rp 3.000'},
  {rbx:'200',price:'Rp 6.000'},
  {rbx:'300',price:'Rp 9.000'},
  {rbx:'400',price:'Rp 12.000'},
  {rbx:'500',price:'Rp 15.000'},
  {rbx:'800',price:'Rp 24.000'},
  {rbx:'1.000',price:'Rp 30.000'},
  {rbx:'1.500',price:'Rp 45.000'},
  {rbx:'2.000',price:'Rp 60.000'},
  {rbx:'2.500',price:'Rp 75.000'},
  {rbx:'3.000',price:'Rp 90.000'},
  {rbx:'5.000',price:'Rp 150.000'}
];

const grid=document.querySelector('#productGrid');
grid.innerHTML=products.map((p,i)=>`<article class="product-card"><div class="product-top"><div class="mini-orb">R</div><div><h3>${p.rbx} Robux</h3><small>${i<4?'Pilihan cepat':'Nominal populer'}</small></div></div><div class="product-bottom"><strong>${p.price}</strong><button class="buy-btn" data-rbx="${p.rbx}" data-price="${p.price}">Pilih</button></div></article>`).join('');

const toast=document.querySelector('#toast');
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}

document.querySelectorAll('.buy-btn').forEach(btn=>btn.addEventListener('click',()=>{showToast(`Paket ${btn.dataset.rbx} Robux dipilih (${btn.dataset.price}). Hubungkan tombol ini ke checkout/API kamu.`)}));

document.querySelector('#checkForm').addEventListener('submit',(e)=>{e.preventDefault();const id=document.querySelector('#trxId').value.trim();showToast(id?`Mencari transaksi ${id}...`:'Masukkan ID transaksi terlebih dahulu.');});

document.querySelector('.menu-toggle').addEventListener('click',()=>{const nav=document.querySelector('.nav-links');const open=nav.style.display==='flex';nav.style.display=open?'none':'flex';if(!open){nav.style.position='absolute';nav.style.top='64px';nav.style.left='0';nav.style.right='0';nav.style.padding='18px';nav.style.background='#0b0810';nav.style.flexDirection='column';nav.style.borderBottom='1px solid var(--line)';}});
