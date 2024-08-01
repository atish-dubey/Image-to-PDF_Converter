document.getElementById('convertButton').addEventListener('click', async () => {
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
        alert('Please upload an image.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const imgData = canvas.toDataURL('image/jpeg');
            const pdf = new jsPDF({
                orientation: img.width > img.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [img.width, img.height]
            });
            pdf.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
            const pdfData = pdf.output('blob');

            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = URL.createObjectURL(pdfData);
            downloadLink.classList.remove('hidden');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
