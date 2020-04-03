import "./app.css";
console.log('app.js ready');

function renderall(arr) {
  var prod = "";
  arr.forEach(function(inf,ind){
    prod += '\
      <div id="'+ inf['_id'] +'" class="col-6 mb-3" >\
        <section id="'+ ind +'" class="card-deck">\
          <div class="card" style="height: 415px; align-self: center;">\
            <img src="img/'+ inf['filename'] +'" class="card-img-top" alt="..." style="height: 150px;">\
            <div class="card-body pt-3">\
              <h5 class="card-title">\
                '+ inf['producto'] +' <button id="b'+ inf['_id'] +'" class="btn"><i class="fas fa-edit" style="color: gray"></i></button>\
              </h5>\
              <p class="card-text">'+ inf['marca'] +'</p>\
              <p class="card-text">'+ inf['modelo'] +'</p>\
              <p class="card-text">'+ inf['descripcion'] +'</p>\
              <p class="card-text">'+ inf['precio'] +'</p>\
            </div>\
            <div class="card-footer">\
              <small class="text-muted">'+ inf['modified_at'] +'</small>\
            </div>\
          </div>\
        </section>\
      </div>';
  });
  document.getElementById('productos').innerHTML = prod;
}

async function postform1(items) {
  const res = await fetch('http://localhost:3000/add', {
    method: 'POST',
    body: items
  });
  const data = await res.json();
  renderall(data.items);
}

fetch('./all')
  .then(response => {return response.json()}).catch(err => {console.log(err);})
  .then(items => {
    renderall(items);
  });


document.getElementById('productform')
  .addEventListener('submit', function(e) {

    const producto = document.getElementById('Producto');
    const marca = document.getElementById('Marca');
    const modelo = document.getElementById('Modelo');
    const descripcion = document.getElementById('Descripcion');
    const precio = document.getElementById('Precio');
    const image = document.getElementById('inputGroupFile01');

    const formData = new FormData();
    formData.append("producto", producto.value);
    formData.append("marca", marca.value);
    formData.append("modelo", modelo.value);
    formData.append("descripcion", descripcion.value);
    formData.append("precio", precio.value);
    formData.append("image", image.files[0]);
    postform1(formData);

    producto.value = "";
    marca.value = "";
    modelo.value = "";
    descripcion.value = "";
    precio.value = "";
    image = undefined;

    e.preventDefault();
  });

/*

fetch('./all')
  .then(response => {return response.json()}).catch(err => {console.log(err);})
  .then(items => {
    var prod = "";
    items.forEach(function(inf,ind){
      prod += '\
        <div id="'+ inf['_id'] +'" class="col-6 mb-3" >\
          <section id="'+ ind +'" class="card-deck">\
            <div class="card" style="height: 415px; align-self: center;">\
              <img src="img/'+ inf['filename'] +'" class="card-img-top" alt="..." style="height: 150px;">\
              <div class="card-body pt-3">\
                <h5 class="card-title">\
                  '+ inf['producto'] +' <button id="b'+ inf['_id'] +'" class="btn"><i class="fas fa-edit" style="color: gray"></i></button>\
                </h5>\
                <p class="card-text">'+ inf['marca'] +'</p>\
                <p class="card-text">'+ inf['modelo'] +'</p>\
                <p class="card-text">'+ inf['descripcion'] +'</p>\
                <p class="card-text">'+ inf['precio'] +'</p>\
              </div>\
              <div class="card-footer">\
                <small class="text-muted">'+ inf['modified_at'] +'</small>\
              </div>\
            </div>\
          </section>\
        </div>';
    });
    document.getElementById('productos').innerHTML = prod;

  }); 

*/
