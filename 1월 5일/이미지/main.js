const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();

img.onload = () => {
    ctx.drawImage(img, 100, 100);
}
img.src = "canvas_scale_image.png";