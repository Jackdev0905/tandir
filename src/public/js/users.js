console.log("Users frontend javascript file");

$(function () {
    $(".member-status").on("change", function(e) {
        const id = e.target.id;
        const memberStatus = $(`#${id}.member-status`).val();
        axios.post(`/admin/user/edit/`, {
            memberStatus: memberStatus,
            _id: id
          }).then((response)=>{
            const  result = response.data;
            if (result) {
                console.log("Product updated");
                $(".member-status").blur();
              } else {
                alert("Updating failed");
              }
          })
          .catch((err)=>{
            console.log("Error, memberStatus", err);
            alert("Updating failed");
          })
      });
})