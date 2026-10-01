import "./inputmask.min.js";
function inputMask() {
  const inputMasks = document.querySelectorAll("input[data-fls-input-mask]");
  inputMasks.forEach((inputMask2) => {
    Inputmask({ "mask": `${inputMask2.dataset.flsInputMask}` }).mask(inputMask2);
  });
}
document.querySelector("input[data-fls-input-mask]") ? window.addEventListener("load", inputMask) : null;
