var searchElementId=document.querySelector('.header__search-history');
console.log(searchElementId);
searchElementId.onmousedown=function(e) {
    e.preventDefault();
}
// Bài tập thêm sửa xóa khóa học với fetch và Rest API
var modals  = document.querySelector('.modals');
var openid  = document.getElementById('openid');
var exit  = document.getElementById('exit');
function showBuyTickets(){
modals.classList.add('open')
    
}
function hideBuyTickets(){
   
    modals.classList.remove('open')
    
}
openid.addEventListener('click',showBuyTickets)

exit.addEventListener('click',hideBuyTickets)


var courseApi ='http://localhost:3000/spbanhang';


function start() {
    getCourses(function(courses){
        renderCourses(courses);
    });
    handleCreateForm();
}
// start : đưa nội dung lên
start();



// Functions

function getCourses(callback) {
    fetch(courseApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function createCourse(data,callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(courseApi,options)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function renderCourses(courses){
    var listCoursesBlock = document.getElementById('list-courses');
    var html=courses.map(function(course){
        return `
        <div class="col l-2-4 m-4 c-6 ">
        <a href="" class="home-product-item">
            <div class="home-product-item__img " style="background-image: url(${course.imglink});"></div>
            <h4 class="home-product-item__name">${course.name}</h4>
            <div class="home-product-item__price">
                <span class="home-product-item__price-old">${course.description}đ</span>
                <span class="home-product-item__price-current">${course.newdescription}đ</span>
            </div>
            <div class="home-product-item__action">
                <span class="home-product-item__like home-product-item__like--liked">
                    <i class="home-product-item__like-icon-empty fa-regular fa-heart"></i>
                    <i class="home-product-item__like-icon-fill fa-solid fa-heart"></i>
                </span>
                <div class="home-product-item__rating">
                    <i class="home-product-item__star--gold fa-solid fa-star"></i>
                    <i class="home-product-item__star--gold fa-solid fa-star"></i>
                    <i class="home-product-item__star--gold fa-solid fa-star"></i>
                    <i class="home-product-item__star--gold fa-solid fa-star"></i>
                    <i class="home-product-item__star--gold fa-solid fa-star"></i>
                </div>
                <span class="home-product-item__sold">1,9k đã bán</span>
            </div>
            <div class="home-product-item__origin">
                <span class="home-product-item__brand">Whoo</span>
                <span class="home-product-item__origin-name">Japan</span>
            </div>
            <div class="home-product-item__favourite">
                <i class="fa-solid fa-check"></i>
                <span>Yêu thích</span> 
            </div>
            <div class="home-product-item__sale-off">
                <span class="home-product-item__sale-off-percent">${course.sale}%</span>
                <span class="home-product-item__sale-off-label">Giảm</span>
            </div>
        </a>
    </div>
        `
    })
    listCoursesBlock.innerHTML = html.join('');

}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var newdescription = document.querySelector('input[name="newdescription"]').value;
        var imglink = document.querySelector('input[name="linkimg"]').value;
        var sale = document.querySelector('input[name="sale"]').value;
        var formData ={
            name:name,
            description:description,
            imglink:imglink,
            newdescription:newdescription,
            sale:sale

        }
        createCourse(formData,function(){
            getCourses(function(courses){
                renderCourses(courses);
            });
        });

    }
}