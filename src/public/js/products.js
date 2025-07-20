console.log("Products frontend javascript file");

$(function () {
  $(".product-collection").on("change", () => {
    const selected = $(".product-collection").val();
    if (selected === "DRINK") {
      $("#product-volume").show();
      $("#product-size").hide();
    } else {
      $("#product-volume").hide();
      $("#product-size").show();
    }
  });

  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(400);
    $("#process-btn").css("display", "none");
    $(".dish-container").attr("onsubmit", " return validateForm()");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").attr("onsubmit", "");
    $(".dish-container").slideToggle(400);
    $("#process-btn").css("display", "block");
  });

  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const productStatus = $(`#${id}.new-product-status`).val();
    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });
      const result = response.data;
      console.log("response", response);

      if (result) {
        console.log("Product updated");
        $(".new-product-status").blur();
      } else {
        alert("Updating failed");
      }
    } catch (err) {
      console.log("Error, productStatus", err);
      alert("Updating failed");
    }
  });
});

function validateForm() {
  const productName = $(".product-name").val(),
    productPrice = $(".product-price").val(),
    productLeftCount = $(".product-left-count").val(),
    productCollection = $(".product-collection").val(),
    productDesc = $(".product-desc").val(),
    productStatus = $(".product-status").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === "" ||
    productStatus === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }
}

function previewFileHandler(input, order) {
  const imgClassName = input.className,
    file = $(`.${imgClassName}`).get(0).files[0],
    fileType = file["type"],
    validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (!validImageTypes.includes(fileType)) {
    alert("Please upload allowed image types");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
