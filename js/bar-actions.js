var cerveceria;

$(function() {
  $.get("data/cervecerias.json", function(data, status) {
    var id = getQueryVariable("id");
    if (id === false) { // Si se quiso acceder a bar.html sin ningun id
      window.location.replace("index.html");
    } else {
      var obj = $.grep(data, function(obj){return obj.id === id;})[0]; // Buscar elemento usando jQuery
      if (obj === undefined) { // Si no se encontro el id
        document.getElementById("main-container").innerHTML = "No se encontro";
      } else {
        cerveceria = obj;
        mostrarInfo();
        $("body").append("<script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC6UheGSM6zHbQvf0MU5zSrdZNJCdMrZoQ&callback=initMap'></script>");
      }
    }
  });
});

function mostrarInfo() {
  var hoy = new Date().getDay();

  $("#info-bar-logo").attr("src", cerveceria.logo);
  $("#info-bar-logo").attr("alt", "Logo " + cerveceria.nombre);
  $("#info-bar-picture").attr("src", cerveceria.foto);
  $("#info-bar-picture").attr("alt", "Foto " + cerveceria.nombre);

  if (cerveceria.direccion.localeCompare("") != 0) {
    $("#info-address-text").html("Dirección: " + cerveceria.direccion + "<br>");
  } else {
    $("#info-address-text").hide();
  }
  if (cerveceria.telefono.localeCompare("") != 0) {
    $("#info-phone-text").html("Teléfono: " + cerveceria.telefono + "<br>");
  } else {
    $("#info-phone-text").hide();
  }
  if (cerveceria.horario[hoy].localeCompare("") != 0) {
    var weekdays = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    if (cerveceria.horario[hoy].localeCompare("Cerrado") != 0) {
      $("#info-time-text").html("Horario: " + weekdays[hoy] + " " + cerveceria.horario[hoy] + "<br>");
    } else {
      $("#info-time-text").html("Horario: " + weekdays[hoy] + " esta cerrado<br>");
    }
  } else {
    $("#info-time-text").hide();
  }
  if (cerveceria.happyHour.localeCompare("") != 0) {
    $("#info-happyhour-text").html("Happy hour: " + cerveceria.happyHour + "<br>");
  } else {
    $("#info-happyhour-text").hide();
  }
  if (cerveceria.web.localeCompare("") != 0) {
    $("#info-web-text").html("Web: <a class='info-link' href='http://" + cerveceria.web + "/' target='_blank'>" + cerveceria.web + "</a><br>");
  } else {
    $("#info-web-text").hide();
  }
  if (cerveceria.email.localeCompare("") != 0) {
    $("#info-email-text").html("Email: <a class='info-link' href='mailto:" + cerveceria.email + "'>" + cerveceria.email + "</a><br>");
  } else {
    $("#info-email-text").hide();
  }
  if (cerveceria.instagram.localeCompare("") != 0) {
    $("#info-social-network-links").append("<a id='info-instagram-icon' href='https://www.instagram.com/" + cerveceria.instagram + "/' target='_blank'></a>");
  }
  if (cerveceria.facebook.localeCompare("") != 0) {
    $("#info-social-network-links").append("<a id='info-facebook-icon' href='https://www.facebook.com/" + cerveceria.facebook + "/' target='_blank'></a>");
  }
  mostrarPuntaje(cerveceria);
}

function mostrarPuntaje(cerveceria) {
  var rating = 0;
  if (cerveceria.cantidadPuntajes > 0) {
    rating = cerveceria.sumaPuntajes / cerveceria.cantidadPuntajes;
  }
  rating = rating.toFixed(1);

  var stars = rating + " ";
  for (var index = 0; index < Math.floor(rating); index++) {
    stars += "<span class='full-star-icon'></span>";
  }
  var remaining = 5 - Math.floor(rating);
  if (rating - Math.floor(rating) != 0) {
    stars += "<span class='half-star-icon'></span>";
    remaining--;
  }
  for (var index = 0; index < remaining; index++) {
    stars += "<span class='empty-star-icon'></span>";
  }
  $("#rating-container").html(stars);
}

function initMap() {
  var cerveceriaCoordenadas = new google.maps.LatLng(cerveceria.latitud, cerveceria.longitud);
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: cerveceriaCoordenadas,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ]
  });
  var marker = new google.maps.Marker({
    position: cerveceriaCoordenadas,
    map: map
  });
}

// Obtener parametro de la URL
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return(false);
}
