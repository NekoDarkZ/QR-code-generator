// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si estamos en la página index.html
    if (window.location.pathname === '/QA-code-generator/index.html') {
      // Esta lógica se ejecuta en la página index.html
      document.getElementById('generateQR').addEventListener('click', function () {
        var url = document.getElementById('urlInput').value;
        if (url.trim() !== '') {
          // Redirigir a qrpage.html con el parámetro URL
          window.location.href = 'qrpage.html?url=' + encodeURIComponent(url);
        }
      });
    } else if (window.location.pathname === '/QA-code-generator/qrpage.html') {
      // Esta lógica se ejecuta en la página qrpage.html
      // Obtener la URL pasada como parámetro en la URL actual
      var url = obtenerURL();
      console.log("URL obtenida:", url);
      // Mostrar el código QR con la URL obtenida
      var qrcode = new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
        border: 4,
      });
  
      // Lógica para descargar el código QR (puedes usar bibliotecas o implementar tu propia lógica)
      document.getElementById('downloadQR').addEventListener('click', function () {
        // Obtener el contenido del código QR como una URL de datos (base64)
        var qrCodeDataURL = document.getElementById('qrcode').querySelector('canvas').toDataURL('image/png');
      
        // Utilizar la biblioteca download.js para descargar la imagen
        download(qrCodeDataURL, 'qrcode.png', 'image/png');
      });
  
      // Lógica para compartir el código QR
      document.getElementById('shareQR').addEventListener('click', function () {
        var url = obtenerURL();
        var qrCodeDataURL = document.getElementById('qrcode').querySelector('canvas').toDataURL('image/png');

        // Comprobar si la Web Share API es compatible
        if (navigator.share) {
          navigator.share({
            title: 'Compartir Código QR',
            text: '¡Mira este código QR!',
            url: window.location.search,
          })
          .then(() => {
            console.log('Contenido compartido con éxito');
          })
          .catch((error) => {
            console.error('Error al compartir contenido:', error);
          });
        } else {
          // Si la Web Share API no es compatible, proporciona un enlace de copiado al portapapeles
          var shareLink = 'Comparte este enlace junto con el código QR:\n' + url;
          var tempInput = document.createElement('textarea');
          tempInput.value = shareLink;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          alert('El enlace se ha copiado al portapapeles. Puedes compartirlo manualmente.');
        }
      });

    }
  
    // Función para obtener la URL del parámetro 'url' de la URL actual
    function obtenerURL() {
      var urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('url');
    }
  });
  