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
    $(".new-dish-txt").text("NEW PRODUCT DETAIL");
    $("#create-btn").text("Create");
    $(".dish-container").attr("action", "/admin/product/create");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(400);
    $("#process-btn").css("display", "block");
  });

  $(".new-product-status").on("change", async function (e) {
     e.stopPropagation();
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



async function editHandler(data) {
  $(".dish-container").show(400);
  $("#process-btn").css("display", "none");
  $("#create-btn").text("Edit");
  $(".new-dish-txt").text("PRODUCT DETAIL");

  const product = JSON.parse(data);
  console.log(product);

  $(".product-name").val(product.productName);
  $(".product-price").val(product.productPrice);
  $(".product-left-count").val(product.productLeftCount);
  $(".product-collection").val(product.productCollection);
  $(".product-desc").val(product.productDesc);

  product.productImages.map((ele, key) => {
    $(`#image-section-${key + 1}`).attr("src", `http://localhost:3003/${ele}`);
  });
  $(".dish-container").attr("action", `/admin/product/${product._id}`);

  // try {
  //   const response = await axios.post(`/admin/product/${product._id}`, {
  //     productName: $(".product-name").val(),
  //     productPrice: $(".product-price").val(),
  //     productCollection: $(".product-collection").val(),
  //     productLeftCount: $(".product-left-count").val(),
  //     productDesc: $(".product-desc").val(),
  //     productSize: $(".product-size").val(),
  //     productVolume: $(".product-volume").val(),
  //   });
  //   const result = response.data;
  //   console.log("response", response);

  // } catch (err) {
  //   console.log("Error, productStatus", err);
  //   alert("Updating failed");
  // }
}

function validateForm() {
  const productName = $(".product-name").val(),
    productPrice = $(".product-price").val(),
    productLeftCount = $(".product-left-count").val(),
    productCollection = $(".product-collection").val(),
    productDesc = $(".product-desc").val();

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
