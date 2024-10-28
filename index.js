const jsFile = document.querySelector(".file-js"),
  convertOriginal = document.querySelector(".img-js"),
  convertGrayscale = document.querySelector("#convertGrayscale"),
  canvas = document.querySelector("#grayscaleImage"),
  jsWarning = document.querySelector(".warning-js");

jsFile.value = "";
convertGrayscale.disabled;

jsFile.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      convertOriginal.src = e.target.result;
      convertOriginal.style.display = "block";
    };

    reader.readAsDataURL(file);
    convertGrayscale.disabled = false;
  }
});

convertGrayscale.addEventListener("click", () => {
  if (convertOriginal.src === "") {
    jsWarning.classList.add("active");
  } else {
    jsWarning.classList.remove("active");

    const ctx = canvas.getContext("2d");

    canvas.width = convertOriginal.width;
    canvas.height = convertOriginal.height;

    ctx.drawImage(
      convertOriginal,
      0,
      0,
      convertOriginal.width,
      convertOriginal.height
    );

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    console.log(pixels);

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      const grayscale = 0.3 * r + 0.59 * g + 0.11 * b;

      pixels[i] = grayscale;
      pixels[i + 1] = grayscale;
      pixels[i + 2] = grayscale;
    }
    console.log(pixels);

    ctx.putImageData(imageData, 0, 0);
  }
});
