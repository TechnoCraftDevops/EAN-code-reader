import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

function displayEanCode(inputElement) {
    if (inputElement.files && inputElement.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            const imageElement = document.getElementById('ean-code-image');
            imageElement.src = e.target.result;
        };

        reader.readAsDataURL(inputElement.files[0]);
    }
}

function getIt(inputElement) {
    const html5QrCode = new Html5Qrcode(
        "ean-code-file",
        {
            verbose: true,
            formatsToSupport: [
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.CODE_39,
                Html5QrcodeSupportedFormats.EAN_8,
                Html5QrcodeSupportedFormats.EAN_13
            ]
        }
    );

    html5QrCode.scanFile(inputElement.files[0], true)
        .then(decodedText => {
            console.log('success :!', decodedText);
        })
        .catch(err => {
            // failure, handle it.
            console.log(`Error scanning file. ERROR :! ${err}`)
        });
}



window.displayEanCode = displayEanCode;
window.getIt = getIt;

