document.addEventListener("DOMContentLoaded", function () {
  (() => {
    let cart = [];

    const cartBtn = document.getElementById("cart");
    const modal = document.getElementById("modal");
    const sectionList = document.getElementById("products-list");

    const clearCart = document.getElementById("clear");

    cartBtn.addEventListener("click", () => {
      let dataJson = JSON.stringify(cart);
      localStorage.setItem("Carrito", dataJson);
      console.log(cart);
      if (cart.length < 1) {
        Swal.fire({
          title: "No agregaste nada a tu carrito",
          text: "",
          icon: "error",
        });
      } else {
        modal.classList.remove("modal-invisible");
        modal.classList.add("modal-visible");
        sectionList.classList.add("modal-invisible");
        sectionList.classList.remove("products-list");
        const title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = "Tu carrito:";
        modal.appendChild(title);
        let finalPrice = 0;
        const finalPriceDiv = document.createElement("div");
        const finalPriceContent = document.createElement("p");
        finalPriceDiv.classList.add("final-price");
        finalPriceDiv.appendChild(finalPriceContent);
        modal.appendChild(finalPriceDiv);

        cart.forEach((product) => {
          if (cart.length < 2) {
            finalPrice = product.cantidad * product.price;

            console.log(cart);
          } else {
            finalPrice += product.cantidad * product.price;
            console.log(cart);
          }
          console.log(product.cantidad, product.price);

          finalPriceContent.textContent = `Precio final: ${finalPrice}`;

          const article = document.createElement("article");
          const h2 = document.createElement("h2");
          const buttonDelete = document.createElement("button");
          const buttonAdd = document.createElement("button");
          const buy = document.createElement("button");
          buy.classList.add("buy");

          buttonDelete.classList.add("delete");
          buttonAdd.classList.add("add");
          buy.textContent = "Comprar";
          buttonDelete.textContent = "X";
          buttonAdd.textContent = "+";
          h2.textContent = `Producto: ${product.title} $${product.price} ${product.cantidad}`;
          article.appendChild(h2);
          article.appendChild(buy);
          article.appendChild(buttonDelete);
          article.appendChild(buttonAdd);

          modal.appendChild(article);

          //
          buy.addEventListener("click", () => {
            Swal.fire({
              title: "Confirmar compra?",
              text: "Te redireccionaremos a los metodos de pago!",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              cancelButtonText: "Cancelar",
              confirmButtonText: "Comprar!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "<strong> <u>Seguimos en desarrollo :(</u></strong>",
                  icon: "info",
                  html: `
               Te invitamos a ver <a href="../../index.html"><b>Nuestra lista de productos</b></a><br> 
              `,

                  focusConfirm: false,
                });
              }
            });
          });

          clear.addEventListener("click", () => {
            article.remove();
            buttonAdd.remove();
            buttonDelete.remove();
            localStorage.clear();

            h1.textContent = "Carrito eliminado.\n\nRedireccionandote al home.";
            setTimeout(() => {
              location.reload();
              localStorage.clear();
            }, 2000);
          });
          buttonDelete.addEventListener("click", () => {
            const productDeleted = product;

            //

            if (product.cantidad < 2) {
              product.cantidad--;
              finalPrice -= product.price;
              finalPriceContent.textContent = `Precio final: ${finalPrice}`;
              article.remove();
              buttonAdd.remove();
              buttonDelete.remove();
              product.stock++;
              h2.textContent = `Producto: ${product.title} $${product.price} ${product.cantidad}`;
              cart = cart.filter((product) => {
                return product.id !== productDeleted.id;
              });
              console.log(cart);
            } else {
              product.stock++;
              product.cantidad--;
              finalPrice -= product.price;
              finalPriceContent.textContent = `Precio final: ${finalPrice}`;
              localStorage.clear();
              dataJson = JSON.stringify(cart);
              localStorage.setItem("Carrito", dataJson);

              h2.textContent = `Producto: ${product.title} $${product.price} ${product.cantidad}`;

              console.log(cart);
            }
            if (cart.length < 1) {
              article.appendChild(h2);
              modal.appendChild(article);
              h2.textContent =
                "Carrito eliminado.\n\nRedireccionandote al home.";
              setTimeout(() => {
                location.reload();
                localStorage.clear();
              }, 2000);
            }
          });
          buttonAdd.addEventListener("click", () => {
            finalPriceContent.textContent = ``;
            if (product.stock > 0) {
              finalPrice += product.price;
              finalPriceContent.textContent = `Precio final: ${finalPrice}`;
              product.stock--;
              product.cantidad++;

              localStorage.clear();
              dataJson = JSON.stringify(cart);
              localStorage.setItem("Carrito", dataJson);
              h2.textContent = `Producto: ${product.title} $${product.price} ${product.cantidad}`;
            } else {
              Swal.fire({
                title: "No queda mas stock de " + product.title,
                text: "",
                icon: "error",
              });

              finalPriceContent.textContent = `Precio final: ${finalPrice}`;
            }

            console.log(product);
          });
        });
      }
    });
    async function findAll() {
      return new Promise((resolve, reject) => {
        fetch("../../json/products.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener los datos");
            }
            return response.json();
          })
          .then((products) => {
            resolve(products); // Resuelve la promesa con los datos obtenidos
          })
          .catch((error) => {
            console.error("Hubo un problema con la petición Fetch:", error);
            reject(error); // Rechaza la promesa con el error
          });
      });
    }

    // Llamar a la función obtenerProductos
    findAll().then((products) => {
      products.forEach((product) => {
        const sectionList = document.getElementById("products-list");
        const article = document.createElement("article");
        article.classList.add("product-card");
        const h2 = document.createElement("h2");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const button = document.createElement("button");
        button.classList.add("add-cart");
        h2.textContent = product.title;
        h3.textContent = `$${product.price}`;
        button.textContent = "Agregar";
        img.src = product.img;
        img.style.width = "200px";
        //

        article.appendChild(h2);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(button);

        button.name = product.title;
        button.value = product.id;

        button.addEventListener("click", () => {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
          });
          swalWithBootstrapButtons
            .fire({
              title: `Estas seguro de agregar ${button.name} al carrito?`,
              text: `Apurate! solo quedan ${product.stock}`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Agregar",
              cancelButtonText: "Cancelar",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                function agregarCantidad(id) {
                  return cart.find((product) => {
                    return product.id === id;
                  });
                }
                if (!agregarCantidad(product.id)) {
                  product.cantidad = 1;
                  product.stock--;
                  button.disabled = product.stock < 1;
                  cart.push(product);
                } else {
                  product.cantidad++;
                  product.stock--;
                  button.disabled = product.stock < 1;
                }
                swalWithBootstrapButtons.fire({
                  title: `"${button.name}" ha sido agregado correctamente!`,
                  text: "Puedes ver tu carrito en la esquina superior derecha",
                  icon: "success",
                });
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire({
                  title: "Cancelado",
                  text: `"${button.name}" no ha sido agregado al carrito`,
                  icon: "error",
                });
              }
            });
        });
        sectionList.insertBefore(article, sectionList.firstChild);
      });
    });
  })();
});
