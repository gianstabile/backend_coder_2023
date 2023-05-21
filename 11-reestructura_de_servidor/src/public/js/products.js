// FORM
const form = document.getElementById("productForm");
const submitButton = document.getElementById("submitForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const product = {};

  // Obtener los datos del formulario y agregarlos al objeto product
  for (const [key, value] of formData.entries()) {
    product[key] = value;
  }

  try {
    // Realizar la solicitud POST
    let response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    let result = await response.json();
    console.log(result);

    if (response.ok) {
      toastr.success("Product added successfully!");

      setTimeout(() => {
        location.href = "/products";
      }, 2000);
    } else {
      toastr.error("An error has occurred. Try again.");
    }
  } catch (error) {
    console.error("Error adding the product:", error);
  }
});

//DELETE BUTTON
async function handleDeleteButtonClick(e) {
  const deleteButton = e.target;
  const productId = deleteButton.getAttribute("data-id");
  e.preventDefault();
  console.log(productId);

  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toastr.success("Product successfully removed.");
      console.log("Product successfully removed.");
      setTimeout(() => {
        location.href = "/products";
      }, 1000);
    } else {
      toastr.error("Error deleting the product.");
      console.error("Error deleting the product");
    }
  } catch (err) {
    console.error("Error deleting the product:", err);
  }
}
