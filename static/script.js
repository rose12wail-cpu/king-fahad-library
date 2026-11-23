
document.addEventListener('DOMContentLoaded', function () {

  /* ── Active Nav Link ── */
  var currentPath = window.location.pathname;
  document.querySelectorAll('nav a').forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.style.color = '#e8c97a';
      link.style.borderBottom = '2px solid #c9a84c';
      link.style.paddingBottom = '10px';
    }
  });

  /* ── Contact Form (index.html) ── */
  var contactForm   = document.getElementById('contactForm');
  var contactMsgBox = document.getElementById('messageBox');

  if (contactForm && contactMsgBox) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = document.getElementById('name')?.value.trim();
      var email   = document.getElementById('email')?.value.trim();
      var address = document.getElementById('address')?.value.trim();
      var phone   = document.getElementById('phone')?.value.trim();

      if (!name || name.length < 3) {
        showMsg(contactMsgBox, 'Please enter your full name.', 'error'); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg(contactMsgBox, 'Please enter a valid email.', 'error'); return;
      }
      if (!address || address.length < 2) {
        showMsg(contactMsgBox, 'Please enter your address.', 'error'); return;
      }
      if (!/^(05\d{8}|(\+?966)(5\d{8}))$/.test(phone.replace(/\s/g, ''))) {
        showMsg(contactMsgBox, 'Please enter a valid phone number.', 'error'); return;
      }

      showMsg(contactMsgBox, '✓ Submitted successfully! Thank you, ' + name + '.', 'success');
      contactForm.reset();
    });
  }

  /* ── Input Focus Animation ── */
  document.querySelectorAll('.form-group input').forEach(function (input) {
    var label = input.previousElementSibling;
    input.addEventListener('focus', function () { if (label) label.style.color = '#c9a84c'; });
    input.addEventListener('blur',  function () { if (label) label.style.color = ''; });
  });

  /* ── Header Scroll Shadow ── */
  var header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(13,27,42,0.35)'
        : '0 6px 24px rgba(13,27,42,0.15)';
    }, { passive: true });
  }

  /* ── Scroll Reveal ── */
  var mainEl = document.querySelector('main');
  if (mainEl) {
    Array.from(mainEl.children).forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      el.style.transitionDelay = (i * 60) + 'ms';
      setTimeout(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 + i * 60);
    });
  }

  /* ── Back to Top ── */
  var backBtn = document.createElement('button');
  backBtn.innerHTML = '&#8679;';
  backBtn.style.cssText = 'position:fixed;bottom:32px;right:32px;width:44px;height:44px;border-radius:50%;background:#0d1b2a;color:#e8c97a;border:2px solid #c9a84c;font-size:1.4rem;cursor:pointer;box-shadow:0 4px 14px rgba(13,27,42,0.25);opacity:0;pointer-events:none;transition:opacity 0.3s,transform 0.3s;z-index:999;display:flex;align-items:center;justify-content:center;';
  document.body.appendChild(backBtn);

  window.addEventListener('scroll', function () {
    var show = window.scrollY > 300;
    backBtn.style.opacity = show ? '1' : '0';
    backBtn.style.pointerEvents = show ? 'auto' : 'none';
  }, { passive: true });

  backBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  backBtn.addEventListener('mouseenter', function () {
    backBtn.style.transform = 'translateY(-3px)';
    backBtn.style.background = '#c9a84c';
    backBtn.style.color = '#0d1b2a';
  });
  backBtn.addEventListener('mouseleave', function () {
    backBtn.style.transform = 'translateY(0)';
    backBtn.style.background = '#0d1b2a';
    backBtn.style.color = '#e8c97a';
  });

});

/* ── Helper ── */
function showMsg(box, text, type) {
  box.textContent = text;
  box.className = type;
  box.style.display = 'block';
  if (type === 'error') {
    setTimeout(function () { box.style.display = 'none'; box.className = ''; }, 5000);
  }
}

/* ── Accordion ── */
function toggleAcc(btn) {
  var item = btn.parentElement;
  var isOpen = item.classList.contains('active');
  document.querySelectorAll('.acc-item').forEach(function(i) { i.classList.remove('active'); i.querySelector('.acc-btn span').textContent = '+'; });
  if (!isOpen) { item.classList.add('active'); btn.querySelector('span').textContent = '−'; }
}

/* ── Logout ── */
function logOut() {
  window.location.href = '/logout';
}