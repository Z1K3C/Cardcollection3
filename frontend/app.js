import "./app.css";
console.log('app.js ready');

var updateon = false;
var idtoedit = false;
var message = false;

function renderall(arr) {
  var prod = "";
  if(arr){
    arr.forEach(function(inf,ind){
      prod += '\
        <div id="'+ inf['_id'] +'" class="col-6 mb-3" >\
          <section id="'+ ind +'" class="card-deck">\
            <div class="card" style="height: 415px; align-self: center;">\
              <img id="img_'+ inf['_id'] +'" src="img/'+ inf['filename'] +'" class="card-img-top" alt="'+ inf['filename'] +'" style="height: 150px;">\
              <div class="card-body pt-3">\
                <h5 id="tti_'+ inf['_id'] +'" class="card-title">\
                  '+ inf['producto'] +' <button class="btn"><i id="btnE_'+ inf['_id'] +'" class="fas fa-edit" style="color: gray"></i></button>\
                </h5>\
                <p id="tma_'+ inf['_id'] +'" class="card-text">'+ inf['marca'] +'</p>\
                <p id="tmo_'+ inf['_id'] +'" class="card-text">'+ inf['modelo'] +'</p>\
                <p id="tde_'+ inf['_id'] +'" class="card-text">'+ inf['descripcion'] +'</p>\
                <p id="tpr_'+ inf['_id'] +'" class="card-text">'+ inf['precio'] +'</p>\
              </div>\
              <div class="card-footer">\
                <small id="tda_'+ inf['_id'] +'" class="text-muted">'+ inf['modified_at'] +'</small>\
              </div>\
            </div>\
          </section>\
        </div>';
    });
  }else
    prod += "No hay datos";

  document.getElementById('productos').innerHTML = prod;
}

/* Mando a almacenar una nueva tarjeta */
async function postformall(items) {
  const res = await fetch('http://localhost:3000/add', {
    method: 'POST',
    body: items
  });
  const data = await res.json();
  if(data.message){
    message = 'saveone';
    console.log(data.message);
    document.getElementById('alert2').style.display = "";
    setTimeout(function() {  document.getElementById('alert2').style.display = "none";  },2000);
  }
  renderall(data.items);
}

/* Envio la tarjeta editada a la DB, el dato que retorna es de la misma DB y lo muestro */
async function postformone(items) {
  const res = await fetch('http://localhost:3000/edited', {
    method: 'POST',
    body: items
  });
  const data = await res.json();
  if(data.items){
    const card = document.getElementById(data.items._id);
    if(card){
      //document.getElementById('tti_' + data.items._id).innerText = data.items.producto;
      document.getElementById('tma_' + data.items._id).innerText = data.items.marca;
      document.getElementById('tmo_' + data.items._id).innerText = data.items.modelo;
      document.getElementById('tde_' + data.items._id).innerText = data.items.descripcion;
      document.getElementById('tpr_' + data.items._id).innerText = data.items.precio;
      document.getElementById('tda_' + data.items._id).innerText = data.items.modified_at;
      document.getElementById('img_' + data.items._id).src = "img/"+ data.items.filename ;
    }
  }
  if(data.message){
    message = 'edited';
    console.log(data.message);
    document.getElementById('alert5').style.display = "";
    setTimeout(function() {  document.getElementById('alert5').style.display = "none";  },2000);
  }
}

/* Almaceno todos los datos de la tarjeta en data.items */
fetch('http://localhost:3000/all')
  .then(response => {return response.json()}).catch(err => {console.log(err);})
  .then(data => {
    if(data.items){
      renderall(data.items);
    }
    if(data.message){
      message = 'all';
      console.log(data.message);
      document.getElementById('alert1').style.display = "";
      setTimeout(function() {  document.getElementById('alert1').style.display = "none";  },2000);
    }
  });


document.getElementById('productform').addEventListener('submit', function(e) {

  let producto = document.getElementById('Producto');
  let marca = document.getElementById('Marca');
  let modelo = document.getElementById('Modelo');
  let descripcion = document.getElementById('Descripcion');
  let precio = document.getElementById('Precio');
  let image = document.getElementById('inputGroupFile01');

  let formData = new FormData();
  formData.append("producto", producto.value);
  formData.append("marca", marca.value);
  formData.append("modelo", modelo.value);
  formData.append("descripcion", descripcion.value);
  formData.append("precio", precio.value);
  formData.append("image", image.files[0]);

  if(updateon){
    formData.append("id", idtoedit);
    postformone(formData);
    updateon = false;
    idtoedit = false;
    document.getElementById('bigbtn').innerHTML="Guardar";
    document.getElementById('Producto').disabled = false;
  }else{
    postformall(formData);
  }
  producto.value = "";
  marca.value = "";
  modelo.value = "";
  descripcion.value = "";
  precio.value = "";
  image = undefined;

  e.preventDefault();
});

/*Inicio la edicion de la tarjeta, mando a llamar los datos de la DB */
document.getElementById('productos').addEventListener('click',function(e){
  let btnidedit = e.target.id
  btnidedit = btnidedit.substr(5);
  if(btnidedit){
    console.log(btnidedit);
    fetch(`http://localhost:3000/edit/${btnidedit}`)
      .then(response => {return response.json()}).catch(err => {console.log(err);})
      .then(data => {
        if(data.items){
          document.getElementById('Producto').value = data.items.producto;
          document.getElementById('Marca').value = data.items.marca;
          document.getElementById('Modelo').value = data.items.modelo;
          document.getElementById('Descripcion').value = data.items.descripcion;
          document.getElementById('Precio').value = data.items.precio;
          updateon = true;
          idtoedit = btnidedit;
          document.getElementById('bigbtn').innerHTML="Actualizar";
          document.getElementById('Producto').disabled = true;
        }
        if(data.message){
          message = 'toedit';
          console.log(data.message);
          document.getElementById('alert4').style.display = "";
          setTimeout(function() {  document.getElementById('alert4').style.display = "none";  },2000);
        }
      });
  }
});