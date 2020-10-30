//variables
const car = document.getElementById("carrito");
const course = document.getElementById("lista-cursos");
const listCourse = document.querySelector("#lista-carrito tbody");
const emptyCarBtn = document.getElementById("vaciar-carrito");
const DivBntMercadoPago = document.getElementById("divMercadoPago");
var count = 0;

//listener
EventListener();

function EventListener() {
  //add car
  course.addEventListener("click", addCar);
  //delete car
  car.addEventListener("click", deleteCar);
  //empty car
  emptyCarBtn.addEventListener("click", emptyCar);
  //load localstorage
  document.addEventListener("DOMContentLoaded", readLocalStorage);
  //checkout 
  DivBntMercadoPago.addEventListener('click',Checkout)
}

//funciones
function addCar(e) {
  e.preventDefault();
  //delegation add
  if (e.target.classList.contains("agregar-carrito")) {
    const course = e.target.parentElement.parentElement;
    //send data course
    readDataCouse(course);
    //count
    count +=1;
    counter(count);
    addBtnMercadoPago();
  }
}
//read data course
function readDataCouse(course) {
  const infoCourse = {
    imagen: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".precio span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };
  insertCar(infoCourse);
}
//insert Car
function insertCar(course) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>
            <img src="${course.imagen}" width=100/>
        </td>
        <td>
           ${course.title}
        </td>
        <td>
           ${course.price}
        </td>
        <td>
           <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
        </td>
    `;
  listCourse.appendChild(row);
  saveCourseLocalStorage(course);
  message =`Tu  ${course.title} fue agregado al carrito 🤗`
  sendAlert(message,'success');
}
function sendAlert (message,type){
  Swal.fire({
    position: 'top-end',
    type: type,
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}
//insert BtnMercadoPago 
function addBtnMercadoPago(){
  DivBntMercadoPago.innerHTML= `
  <a href="" id="btnMercadoPago" class="button u-full-width btnMercadoPago">
  Pagar la compra
  </a>`;
}
//delte btnMercadoPago 
function deleteBtnMercadoPago (){
  DivBntMercadoPago.innerHTML= ``;
}
//handlerBtnMercadoPago
function Checkout(e){
  e.preventDefault()
  alert('vamos bien')
}
//delete car
function deleteCar(e) {
  e.preventDefault();
  count -=1;
  let course, courseId;
  if (e.target.classList.contains("borrar-curso")) {
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector("a").getAttribute("data-id");
    console.log(courseId);
    course.remove();
    counter(count);
    sendAlert('Se elimino tu producto 🙄','error')
  }
  deleteLocalStorge(courseId);
  deleteBtnMercadoPago();
}
//empty car
function emptyCar() {
  while (listCourse.firstChild) {
    listCourse.removeChild(listCourse.firstChild);
  }
  emptyLocalStorage();
  counter(0);
}
//save course localstorage
function saveCourseLocalStorage(course) {
  let courses;
  courses = getCourseLoalStorage();
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
}
function getCourseLoalStorage() {
  let couseLS;

  if (localStorage.getItem("courses") === null) {
    couseLS = [];
  } else {
    couseLS = JSON.parse(localStorage.getItem("courses"));
    addBtnMercadoPago();
  }
  return couseLS;
}
//load couses in local storage
function readLocalStorage() {
  let coursesLs;
  coursesLs = getCourseLoalStorage();
  items = coursesLs.length;
  itemStr=items.toString();
  coursesLs.forEach(function (course) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${course.imagen}" width=100/>
            </td>
            <td>
              ${course.title}
            </td>
        <td>
           ${course.price}
        </td>
        <td>
           <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
        </td>
    `;
    listCourse.appendChild(row);
  });
  //marcador
  count = items;
  counter(items); 
  addBtnMercadoPago();
}
//delete id localStorage
function deleteLocalStorge(id) {
  let courseLs;
  courseLs = getCourseLoalStorage();
  courseLs.forEach(function (course, index) {
    if (course.id === id) {
      courseLs.splice(index, 1);
    }
  });
  localStorage.setItem("courses", JSON.stringify(courseLs));
  
}
//empty localStorage
function emptyLocalStorage() {
  localStorage.clear();
  
}

//count 
function counter(value){
  let counter = document.querySelector('#count');
  if(value <= 0 ){
    counter.setAttribute('hidden',"");
  }else{
    value.toString();
    counter.removeAttribute('hidden',"");
    counter.classList = 'count';
    counter = counter.innerText= value;
  }
}