console.log("Event frontend javascript file");

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

  $("#process-btn").on("click", () => {
    $(".event-form").slideToggle(400);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".event-form").slideToggle(400);
    $("#process-btn").css("display", "block");
  });

  $(".new-event-status").on("change", async function (e) {
    const id = e.target.id;
    const eventStatus = $(`#${id}.new-event-status`).val();
    try {
      const response = await axios.post(`/admin/event/${id}`, {
        eventStatus: eventStatus,
      });
      const result = response.data;
      console.log("response", response);

      if (result) {
        console.log("event updated");
        $(".new-event-status").blur();
      } else {
        alert("Updating failed");
      }
    } catch (err) {
      console.log("Error, eventStatus", err);
      alert("Updating failed");
    }
  });
});

function validateForm() {
  const eventTitle = $(".event-title").val(),
    eventAuthor = $(".event-author").val(),
    eventLocation = $(".event-location").val(),
    eventDate = $(".event-date").val();

  if (
    eventAuthor === "" ||
    eventDate === "" ||
    eventLocation === "" ||
    eventTitle === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }
}
