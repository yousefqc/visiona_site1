(() => {
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');

  function setMobile(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileNav.style.display = open ? 'block' : 'none';
    mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  if (burger && mobileNav) {
    let open = false;
    burger.addEventListener('click', () => {
      open = !open;
      setMobile(open);
    });

    mobileNav.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        open = false;
        setMobile(open);
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) setMobile(false);
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // WhatsApp order form -> open chat with prefilled message
  const form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get('name') || '').toString().trim();
      const area = (fd.get('area') || '').toString().trim();
      const model = (fd.get('model') || '').toString().trim();
      const qty = (fd.get('qty') || '1').toString().trim();
      const note = (fd.get('note') || '').toString().trim();

      const lines = [
        'السلام عليكم 👋',
        'حاب أطلب نظارة Visiona',
        '',
        `الاسم: ${name || '-'}`,
        `المنطقة: ${area || '-'}`,
        `الموديل: ${model || '-'}`,
        `الكمية: ${qty || '1'}`,
        note ? `ملاحظة: ${note}` : 'ملاحظة: -'
      ];

      const text = encodeURIComponent(lines.join('\n'));
      const url = `https://wa.me/96551664387?text=${text}`;
      window.open(url, '_blank', 'noopener');
    });
  }
})();
