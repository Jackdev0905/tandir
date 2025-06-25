console.log("Signup frontend javascript file");

$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let fileName;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0],
        fileType = uploadFile["type"],
        validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(fileType)) {
        alert("Please upload allowed image types");
      } else {
        if (uploadFile) {
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }
        fileName = $(this)[0].files[0].name;
      }
      $(this).siblings(".upload-name").val(fileName);
    }
  });
});

function validateSignup() {
  const memeberNick = $(".member-nick").val(),
    memeberPhone = $(".member-phone").val(),
    memeberPassword = $(".member-password").val(),
    confirmPassword = $(".confirm-password").val();

  if (
    memeberNick === "" ||
    memeberPhone === "" ||
    memeberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }
  if (memeberPassword !== confirmPassword) {
    alert("Passwords are different, please check!");
    return false;
  }
  const memberImage = $(".member-image").get(0).files[0]
    ? $(".member-image").get(0).files[0].name
    : null;

  if (!memberImage) {
    alert("Please, upload image");
    return false;
  }
}
