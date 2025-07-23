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
  });

  $("#cancel-btn").on("click", () => {
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

  // Handle limit selector change
  $("#limit-selector").on("change", function () {
    const newLimit = $(this).val();
    const url = new URL(window.location.href);
    url.searchParams.set("limit", newLimit);
    // Reset to first page when changing limit
    url.searchParams.set("page", 1);
    window.location.href = url.toString();
  });

  // Preserve other query parameters when paginating
  $(document).on("click", ".page-link", function (e) {
    e.preventDefault();
    const url = new URL($(this).attr("href"), window.location.origin);
    const currentParams = new URLSearchParams(window.location.search);

    // Preserve all existing query parameters except page/limit
    currentParams.forEach((value, key) => {
      if (key !== "page" && key !== "limit") {
        url.searchParams.set(key, value);
      }
    });

    window.location.href = url.toString();
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
// In your route file (e.g., routes/admin.js)
router.get("/product/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await Product.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.total = await Product.countDocuments();
    results.products = await Product.find()
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.render("admin/products", {
      products: results.products,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(results.total / limit),
        totalResults: results.total,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
