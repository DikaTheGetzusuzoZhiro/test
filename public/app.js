const $ = s => document.querySelector(s);

function openOrderTab() {
  const base = window.location.href.split('#')[0];
  window.open(`${base}#recovery`, '_blank', 'noopener,noreferrer');
}

function applyPageMode() {
  const isOrderPage = window.location.hash === '#recovery';
  document.body.classList.toggle('order-page', isOrderPage);
  const home = $('#home');
  const product = $('.product-info');
  const strip = $('.service-strip');
  const how = $('.how-it-works');
  const recovery = $('#recovery');
  [home, product, strip, how].forEach(el => el?.classList.toggle('hidden', isOrderPage));
  recovery?.classList.toggle('hidden', !isOrderPage);
  if (isOrderPage) {
    setTimeout(() => $('#usernameInput')?.focus(), 120);
  }
}

applyPageMode();
window.addEventListener('hashchange', applyPageMode);

$('#orderRecovery')?.addEventListener('click', openOrderTab);
$('#orderRecovery2')?.addEventListener('click', openOrderTab);

const lookupForm = $('#lookupForm');
lookupForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const username = $('#usernameInput').value.trim().replace(/^@/, '');
  if (!username) return;

  $('#lookupError').classList.add('hidden');
  $('#profileCard').classList.add('hidden');
  $('#recoveryForm').classList.add('hidden');
  $('#lookupLoading').classList.remove('hidden');

  try {
    const r = await fetch('/api/roblox', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Username tidak ditemukan.');

    const u = data.user;
    $('#avatar').src = u.avatar || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='420'%3E%3Crect width='100%25' height='100%25' fill='%23160b24'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3ERBX%3C/text%3E%3C/svg%3E";
    $('#displayName').textContent = u.displayName || u.username;
    $('#usernameText').textContent = `@${u.username}`;
    $('#userId').textContent = u.id;

    const isOnline = Number(u.presenceType) > 0;
    const status = isOnline ? 'Online' : 'Offline';
    $('#statusText').textContent = status;
    $('#banText').textContent = u.banned ? 'Moderated' : 'Normal';
    $('#createdText').textContent = u.created ? new Date(u.created).toLocaleDateString('id-ID', {day:'2-digit', month:'long', year:'numeric'}) : '-';

    const badge = $('#presenceBadge');
    badge.textContent = status;
    badge.className = `status ${isOnline ? 'online' : 'offline'}`;
    $('#recoveryUsername').value = u.username;

    $('#lookupLoading').classList.add('hidden');
    $('#profileCard').classList.remove('hidden');
    $('#profileCard').scrollIntoView({behavior:'smooth', block:'center'});
  } catch (err) {
    $('#lookupLoading').classList.add('hidden');
    $('#lookupError').textContent = err.message;
    $('#lookupError').classList.remove('hidden');
  }
});

$('#recoverBtn')?.addEventListener('click', () => {
  $('#recoveryForm').classList.remove('hidden');
  $('#recoveryForm').scrollIntoView({behavior:'smooth', block:'center'});
});

$('#sendRecovery')?.addEventListener('click', () => {
  const username = $('#recoveryUsername').value.trim();
  const problem = $('#problem').value;
  const duration = $('#duration').value;
  const story = $('#story').value.trim();
  if (!username) return;
  if (!story) {
    $('#story').focus();
    $('#story').setCustomValidity('Mohon isi kronologi terlebih dahulu.');
    $('#story').reportValidity();
    $('#story').setCustomValidity('');
    return;
  }

  const msg = encodeURIComponent(
    `Halo TAMA, saya ingin order Jasa Pemulihan Akun Roblox.\nUsername: ${username}\nMasalah: ${problem}\nSudah berapa lama: ${duration}\nKronologi: ${story}`
  );
  window.open(`https://wa.me/62895328044863?text=${msg}`, '_blank', 'noopener,noreferrer');
});

// v15: lightweight custom purple dropdowns (avoids native gray menus on mobile)
(function setupCustomSelects(){
  const selects = document.querySelectorAll('.custom-select');
  const closeAll = except => selects.forEach(s => { if (s !== except) { s.classList.remove('open'); s.querySelector('.select-trigger')?.setAttribute('aria-expanded','false'); } });
  selects.forEach(box => {
    const trigger = box.querySelector('.select-trigger');
    const value = box.querySelector('.select-value');
    const hidden = box.querySelector('input[type="hidden"]');
    trigger?.addEventListener('click', e => { e.stopPropagation(); const open = !box.classList.contains('open'); closeAll(box); box.classList.toggle('open', open); trigger.setAttribute('aria-expanded', String(open)); });
    box.querySelectorAll('.select-menu button').forEach(option => option.addEventListener('click', () => {
      hidden.value = option.dataset.value || option.textContent.trim();
      value.textContent = option.textContent.trim();
      box.querySelectorAll('[role="option"]').forEach(o => o.setAttribute('aria-selected','false'));
      option.setAttribute('aria-selected','true');
      box.classList.remove('open'); trigger.setAttribute('aria-expanded','false');
    }));
  });
  document.addEventListener('click', () => closeAll(null));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(null); });
})();
