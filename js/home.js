$(document).ready(function () {
  $("#mySidenav").css({ left: `-${$(".sidenav-content").innerWidth()}px` });
  $("#loader-container").removeClass("d-none");
  $("#present-meal").addClass("d-none");
  $("#searchFood").addClass("d-none");
  $.ajax({
    type: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
    data: {},
    dataType: "json",
    success: function (response) {
      presentMealsData(response);
      $("#loader-container").addClass("d-none");
    },
  });
  $("#nav-btn").on("click", function () {
    if ($("#mySidenav").css("left") == "0px") {
      closeNavbar();
      $(".animate-sidebar-options").css("top", "100px");
    } else {
      $("#mySidenav").animate({ left: `0px` }, 500);
      $("#nav-btn").toggleClass("fa-bars fa-close");
      $(".animate-sidebar-options")
        .eq(0)
        .animate({ "top": "0px" }, 300, function () {
          $(".animate-sidebar-options")
            .eq(1)
            .animate({ "top": "0px" }, 200, function () {
              $(".animate-sidebar-options")
                .eq(2)
                .animate({ "top": "0px" }, 100, function () {
                  $(".animate-sidebar-options")
                    .eq(3)
                    .animate({ "top": "0px" }, 50, function () {
                      $(".animate-sidebar-options").eq(4).animate({ "top": "0px" }, 10);
                    });
                });
            });
        });
    }
  });
  $("#search").on("click", function () {
    closeNavbar();
    $("#main-data").removeClass("d-none");
    $("#searchFood").removeClass("d-none");
    $("#present-meal").addClass("d-none");
    $("#contact-form").addClass("d-none");
    $("#searchByName").val("");
    $("#searchByLetter").val("");
    $("#data").html("");
  });
  $("#categories").on("click", function () {
    closeNavbar();
    $("#main-data").removeClass("d-none");
    $("#searchFood").addClass("d-none");
    $("#present-meal").addClass("d-none");
    $("#contact-form").addClass("d-none");
    $("#loader-container").removeClass("d-none");
    $.ajax({
      type: "GET",
      url: `https://www.themealdb.com/api/json/v1/1/categories.php`,
      data: {},
      dataType: "json",
      success: function (response) {
        presentCatData(response);
        $("#loader-container").addClass("d-none");
      },
    });
  });
  $("#area").on("click", function () {
    closeNavbar();
    $("#main-data").removeClass("d-none");
    $("#searchFood").addClass("d-none");
    $("#contact-form").addClass("d-none");
    $("#present-meal").addClass("d-none");
    $("#loader-container").removeClass("d-none");
    $.ajax({
      type: "GET",
      url: `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
      data: {},
      dataType: "json",
      success: function (response) {
        presentAreaData(response);
        $("#loader-container").addClass("d-none");
        $("#loader-container").removeClass("vh-100");
      },
    });
  });
  $("#ingredient").on("click", function () {
    closeNavbar();
    $("#main-data").removeClass("d-none");
    $("#searchFood").addClass("d-none");
    $("#present-meal").addClass("d-none");
    $("#contact-form").addClass("d-none");
    $("#loader-container").removeClass("d-none");
    $.ajax({
      type: "GET",
      url: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`,
      data: {},
      dataType: "json",
      success: function (response) {
        presentIngredientData(response);
        $("#loader-container").addClass("d-none");
      },
    });
  });
  $("#contact").on("click", function () {
    closeNavbar();
    $("#main-data").removeClass("d-none");
    $("#contact-form").removeClass("d-none");
    $("#present-meal").addClass("d-none");
    $("#searchFood").addClass("d-none");
    $("#loader-container").addClass("d-none");
    $("#main-data").addClass("d-none");
  });

  $("#searchByName").on("input", function (e) {
    $("#loader-container").removeClass("d-none");
    $.ajax({
      type: "GET",
      url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`,
      data: {},
      dataType: "json",
      success: function (response) {
        presentMealsData(response);
        $("#loader-container").addClass("d-none");
      },
    });
  });

  $("#searchByLetter").on("input", function (e) {
    if (e.target.value != "") {
      $("#loader-container").removeClass("d-none");
      $.ajax({
        type: "GET",
        url: `https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value}`,
        data: {},
        dataType: "json",
        success: function (response) {
          presentMealsData(response);
          $("#loader-container").addClass("d-none");
        },
      });
    }
  });

  $("card").on("hover", function () {
    console.log("hover");
    $("hover-title").toggleClass("top-0 top-100");
  });
});

function validInputs() {
  if (/^[A-Za-z]{1,}$/.test($("#name").val())) {
    $("#nameAlert").addClass("d-none");
    if (/^[a-zA-Z]+(?:[\.\-\_][a-zA-Z0-9]+)*@([a-zA-Z0-9]{3,})+\.([a-zA-Z]{3,})$/.test($("#email").val())) {
      $("#emailAlert").addClass("d-none");
      if (/(.*[+0-9].*){8,}/.test($("#phone").val())) {
        $("#phoneAlert").addClass("d-none");
        if ($("#age").val() > 5 && $("#age").val() < 100) {
          $("#ageAlert").addClass("d-none");
          if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($("#password").val())) {
            $("#passwordAlert").addClass("d-none");
            if ($("#password").val() == $("#repassword").val()) {
              $("#repasswordAlert").addClass("d-none");
              $("#submitBtn").attr("disabled", false);
            } else {
              $("#repasswordAlert").removeClass("d-none");
              $("#repasswordAlert").addClass("d-block");
            }
          } else {
            $("#passwordAlert").removeClass("d-none");
            $("#passwordAlert").addClass("d-block");
          }
        } else {
          $("#ageAlert").removeClass("d-none");
          $("#ageAlert").addClass("d-block");
        }
      } else {
        $("#phoneAlert").removeClass("d-none");
        $("#phoneAlert").addClass("d-block");
      }
    } else {
      $("#emailAlert").removeClass("d-none");
      $("#emailAlert").addClass("d-block");
    }
  } else {
    $("#nameAlert").removeClass("d-none");
    $("#nameAlert").addClass("d-block");
  }
}

function closeNavbar() {
  $("#mySidenav").animate({ left: `-${$(".sidenav-content").innerWidth()}px` }, 500);
  $("#nav-btn").toggleClass("fa-bars fa-close");
}

function presentMealsData(data) {
  if (data.meals == null) return;

  $("#data").html(``);
  data.meals.forEach((element) => {
    $("#data").append(`
    <div class="col" onclick="presentMeal(${element.idMeal})">
      <div class="card bg-color3 text-white overflow-hidden">
        <img class="card-img-top" src="${element.strMealThumb}" alt="Card image cap">
        <div class="over-body position-absolute top-0 bottom-0 start-0 end-0 z-2">
          <div class="d-flex flex-column justify-content-center h-100 px-4">
            <h3>${element.strMeal}</h3>
          </div>
        </div>
      </div>
    </div>
  `);
  });
}

function presentMeal(mealId) {
  $("#main-data").addClass("d-none");
  $("#present-meal").removeClass("d-none");
  $.ajax({
    type: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    data: {},
    dataType: "json",
    success: function (response) {
      if (response.meals == null) return;
      let meal = response.meals[0];
      let ingredMeal = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] == null || meal[`strIngredient${i}`] == "") {
          break;
        } else {
          ingredMeal.push(meal[`strMeasure${i}`] + meal[`strIngredient${i}`]);
        }
      }
      console.log(meal);
      $("#present-meal").html(``);
      $("#present-meal").append(`
            <div class="row text-white">
                <div class="col-4">
                    <img src="${meal.strMealThumb}" alt="meal thumb" class="w-100 rounded-3">
                    <h3>${meal.strMeal}</h3>
                </div>
                <div class="col-8 d-flex flex-column text-start">
                    <h4>Instruction</h4>
                    <p>${meal.strInstructions}</p>
                    <h6 class="mt-3 mb-2">Area: <span
                            class="badge text-black bg-color3">${meal.strArea}</span>
                    </h6>
                    <h6 class="my-2">Catergory: <span class="badge text-black bg-color3">${meal.strCategory}</span>
                    </h6>
                    <h6 class="mt-2 mb-1">Recipes: </h6>
                    <div> ${ingredMeal
                      .map(
                        (v) => `<span class="badge text-black bg-color3 m-1">${v}
                        </span>`
                      )
                      .join("")}
                    </div>
                    <h6 class="mt-2 mb-1">Tags : </h6>
                    <div class="d-flex">
                    <a class="btn btn-outline-warning m-2" href="${meal.strSource}" target="_blank">Source</a>
                    <a class="btn btn-outline-danger m-2" href="${meal.strYoutube}" target="_blank">Youtube</a>
                    </div>
                </div>
            </div>
        `);
      $("#loader-container").addClass("d-none");
    },
  });
}

function presentCatData(data) {
  if (data.categories == null) return;

  $("#data").html(``);
  data.categories.forEach((element) => {
    $("#data").append(`
    <div class="col" onclick="presentCat('${element.strCategory}')">
      <div class="card bg-color4 text-white overflow-hidden">
        <img class="card-img-top" src="${element.strCategoryThumb}" alt="Card image cap">
        <div class="over-body position-absolute top-0 bottom-0 start-0 end-0 z-2">
          <div class="d-flex flex-column justify-content-center h-100 px-4">
            <h3 class="cat-title">${element.strCategory}</h3>
            <p class="cat-desc">${element.strCategoryDescription.split(".")[0]}</p>
          </div>
        </div>
      </div>
    </div>
  `);
  });
}

function presentCat(cat) {
  $("#loader-container").removeClass("d-none");
  $.ajax({
    type: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`,
    data: {},
    dataType: "json",
    success: function (response) {
      console.log(cat);
      console.log(response);
      presentMealsData(response);
      $("html,body").animate({ scrollTop: 0 }, 50);
      $("#loader-container").addClass("d-none");
    },
  });
}

function presentAreaData(data) {
  if (data.meals == null) return;

  $("#data").html(``);
  data.meals.forEach((element) => {
    $("#data").append(`
    <div class="col" onclick="presentArea('${element.strArea}')">
      <div class="card bg-color4 text-white overflow-hidden d-flex justify-content-center align-items-center">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${element.strArea}</h3>
      </div>
    </div>
  `);
  });
}

function presentArea(area) {
  $("#loader-container").removeClass("d-none");
  $.ajax({
    type: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
    data: {},
    dataType: "json",
    success: function (response) {
      console.log(area);
      console.log(response);
      presentMealsData(response);
      $("html,body").animate({ scrollTop: 0 }, 50);
      $("#loader-container").addClass("d-none");
    },
  });
}

function presentIngredientData(data) {
  if (data.meals == null) return;

  $("#data").html(``);
  data.meals.forEach((element) => {
    $("#data").append(`
    <div class="col" onclick="presentIngredient('${element.strIngredient}')">
      <div class="card bg-color4 text-white overflow-hidden d-flex justify-content-center align-items-center p-3">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h5 class="cat-title">${element.strIngredient}</h5>
        <p class="cat-desc text-center">${element.strDescription.split(".")[0]}</p>
      </div>
    </div>
  `);
  });
}

function presentIngredient(ingred) {
  $("#loader-container").removeClass("d-none");
  $.ajax({
    type: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`,
    data: {},
    dataType: "json",
    success: function (response) {
      console.log(area);
      console.log(response);
      presentMealsData(response);
      $("html,body").animate({ scrollTop: 0 }, 50);
      $("#loader-container").addClass("d-none");
    },
  });
}
