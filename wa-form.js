// Contact form -> WhatsApp. Delegated off document so it survives the
// client-side render swapping the form node in and out.
(function () {
  function val(form, name) {
    var el = form.elements[name];
    return el && el.value ? el.value.trim() : '';
  }
  function mark(form, name, bad) {
    var el = form.elements[name];
    var field = el && el.closest ? el.closest('.wa-field') : null;
    if (field) field.classList.toggle('is-invalid', !!bad);
    return !bad;
  }
  document.addEventListener('submit', function (e) {
    var form = e.target.closest ? e.target.closest('.wa-form') : null;
    if (!form) return;
    e.preventDefault();

    var name = val(form, 'name');
    var phone = val(form, 'phone');
    var need = val(form, 'need');
    var company = val(form, 'company');

    var ok = true;
    ok = mark(form, 'name', !name) && ok;
    ok = mark(form, 'phone', !phone) && ok;
    ok = mark(form, 'need', !need) && ok;
    var err = form.querySelector('.wa-error');
    if (!ok) {
      if (err) { err.textContent = 'Please fill in your name, number and what you are looking for.'; err.hidden = false; }
      var first = form.querySelector('.is-invalid input, .is-invalid textarea');
      if (first) first.focus();
      return;
    }
    if (err) err.hidden = true;

    var lines = [
      'New enquiry from foxie.media',
      '',
      'Name: ' + name,
    ];
    if (company) lines.push('Company: ' + company);
    lines.push('Phone: ' + phone);
    lines.push('Looking for: ' + need);

    var url = 'https://wa.me/' + (form.dataset.wa || '917338178311') +
              '?text=' + encodeURIComponent(lines.join('\n'));
    var win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;
  });
})();
