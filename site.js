// Screenshots open at full size in a <dialog>; it closes with the button, Esc or a click on the backdrop.
document.addEventListener('DOMContentLoaded', function () {
  var box = document.getElementById('lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var body = box.querySelector('.lightbox-body');
  box.addEventListener('close', function () { body.innerHTML = ''; });
  box.querySelector('.lightbox-close').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  document.querySelectorAll('.shot img').forEach(function (img) {
    img.classList.add('zoomable');
    img.addEventListener('click', function () {
      var big = document.createElement('img');
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      body.appendChild(big);
      box.setAttribute('aria-label', img.alt || 'Screenshot');
      box.showModal();
    });
  });
});
