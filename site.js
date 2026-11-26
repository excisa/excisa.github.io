// Screenshots open at full size in a <dialog>; it closes with the button, Esc or a click on the backdrop.
document.addEventListener('DOMContentLoaded', function () {
  var box = document.getElementById('lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var body = box.querySelector('.lightbox-body');
  box.addEventListener('close', function () { body.innerHTML = ''; });
  box.querySelector('.lightbox-close').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  document.querySelectorAll('figure.video[data-full]').forEach(function (fig) {
    var frame = fig.querySelector('.video-frame');
    var play = function () {
      // WebM where it plays (Firefox on Linux often lacks H.264), else the MP4 (Safari)
      var v = document.createElement('video');
      var mp4 = fig.getAttribute('data-full');
      v.src = v.canPlayType('video/webm; codecs="vp9"') ? mp4.replace(/\.mp4$/, '.webm') : mp4;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      body.appendChild(v);
      box.setAttribute('aria-label', (fig.getAttribute('data-title') || 'Demo') + ', full clip');
      box.showModal();
    };
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-expand';
    button.textContent = '\u25B6 Full clip';
    button.addEventListener('click', function (e) { e.stopPropagation(); play(); });
    frame.appendChild(button);
    frame.classList.add('zoomable');
    frame.addEventListener('click', play);
  });
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
