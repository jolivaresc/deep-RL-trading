/*
 *  @author:jo356p
 */


// campo condicional para motivo de salida
$(".campo_cond").hide();
$("#id_preg_1").change(function () {
    var selected = $("#id_preg_1 option:selected").text();
    $(".campo_cond").toggle(selected == "Otro");
    $("#id_preg_cond").val("");
});

// campo condicional para medios
$(".campo_cond_medio").hide();
$("#id_preg_13").change(function () {
    var selected = $("#id_preg_13 option:selected").text();
    $(".campo_cond_medio").toggle(selected == "Otro");
    $("#id_preg_medio").val("");
});


// campo condicional comodidad
$(".campo_cond_comodo").hide();
$("#id_preg_2").change(function () {
    var selected = $("#id_preg_2 option:selected").text();
    $(".campo_cond_comodo").toggle(selected == "No");
    $("#id_preg_2_2").val("");
});


//campo condicional para herramientas necesarias
$(".campo_cond1").hide();
//campo condicional preg21 encuesta de seguimiento
$(".campo_cond_preg_21").hide();

// funciones auxiliares para ocultar/mostrar campos opcionales
function hide_btn(id_container) {
    document.getElementById(id_container).style.display = "none";
}
function show_btn(id1, id2) {
    document.getElementById(id1).style.display = "block";
    document.getElementById(id2).value = "";
}


function confirmar() {
    confirm("¿Enviar formulario?");
}

// DatePicker
/* 
$(function () {
    $('#id_fecha_fin').datepicker({
        todayHighlight: true,
        todayBtn: "linked",
        autoclose: true,
        language: "es",
        format: 'dd/mm/yyyy'
    });
});
*/

// Add the following code if you want the name of the file appear on select
$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    if (!fileName.includes("xlsx")) {
        swal({
            title: "Archivo no válido",
            text: "Sólo se aceptan archivos de Excel (*.xlsx)",
            icon: "error"
        });
        fileName = "";
        $(this).siblings(".custom-file-label").addClass("selected").html("Selecciona un archivo válido");
    }
    else {
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    }
});


// Evento click del botón (id:fill) para realizar un query a BD dado un ATTUID
// busca empleado en liga de asistencia
$('#fill_especialista').click(function () {
    // Obtiene attuid del campo
    var attuid = document.getElementById("id_attuid_esp").value;
    // attuid = attuid.replace(/[^a-z0-9]/gi,'');
    // Si no se ha ingresado ningún valor, manda alerta
    if (attuid.length == 0) {
        document.getElementById("id_nombre_esp").value = "";
        document.getElementById("id_region").value = "";
        swal({
            text: "Ingresa un ATTUID",
            icon: "warning"
        });
    }
    // Si se ingresó un valor dentro del campo
    else {
        // Petición GET para buscar datos dado un ATTUID
        $.ajax({
            // URL para buscar attuid
            url: '/Capacitacion-RH/hardcode-_-find_esp/' + attuid,
            // La petición retorna un JSON
            dataType: 'json',
            // Petición GET
            type: 'GET',
            // Resultado de la petición
            success: function (data) {
                // Si la petición no encontró resultados para el ATTUID dado manda alerta
                if (data["id"] == "Not found") {
                    document.getElementById("id_nombre_esp").value = "";
                    document.getElementById("id_region").value = "";
                    swal("No se han encontrado resultados para «" + attuid + "»", {
                        buttons: {
                            catch: {
                                text: "Más información",
                                value: "catch"
                            }
                        },
                        icon: "warning"
                    })
                        // #TODO mostrar información de contacto
                }
                // Si la petición regresa un resultado se autocompletan los siguientes campos
                else {
                    document.getElementById("id_nombre_esp").value = data["nombre_completo"];
                    document.getElementById("id_attuid_esp").value = data["attuid"];
                    document.getElementById("id_region").value = data["region"];
                }
            }
        });
    }
});


// busca especialista en liga de asistencia
$('#fill_empleado').click(function () {
    // Obtiene attuid del campo
    var attuid = document.getElementById("id_attuid_emp").value;
    // attuid = attuid.replace(/[^a-z0-9]/gi,'');
    // Si no se ha ingresado ningún valor, manda alerta
    if (attuid.length == 0) {
        document.getElementById("id_nombre_emp").value = "";
        swal({
            text: "Ingresa un ATTUID",
            icon: "warning"
        });
    }
    // Si se ingresó un valor dentro del campo
    else {
        // Petición GET para buscar datos dado un ATTUID
        $.ajax({
            // URL para buscar attuid
            url: '/Capacitacion-RH/hardcode-_-find_emp/' + attuid,
            // La petición retorna un JSON
            dataType: 'json',
            // Petición GET
            type: 'GET',
            // Resultado de la petición
            success: function (data) {
                // Si la petición no encontró resultados para el ATTUID dado manda alerta
                if (data["id"] == "Not found") {
                    document.getElementById("id_nombre_emp").value = "";
                    swal("No se han encontrado resultados para «" + attuid + "»", {
                        buttons: {
                            catch: {
                                text: "Más información",
                                value: "catch"
                            }
                        },
                        icon: "warning"
                    })
                        // #TODO mostrar información de contacto
                }
                // Si la petición regresa un resultado se autocompletan los siguientes campos
                else {
                    document.getElementById("id_nombre_emp").value = data["nombre_completo"];
                    document.getElementById("id_attuid_emp").value = data["attuid"];
                }
            }
        });
    }
});


// Enable tooltips everywhere!
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


// busca gerente en encuesta de evaluación gerente
$('#fill_gerente').click(function () {
    // Obtiene attuid del campo
    var attuid = document.getElementById("id_attuid_gerente").value;
    // attuid = attuid.replace(/[^a-z0-9]/gi,'');
    // Si no se ha ingresado ningún valor, manda alerta
    if (attuid.length == 0) {
        document.getElementById("id_nombre_gerente").value = "";
        swal({
            text: "Ingresa un ATTUID",
            icon: "warning"
        });
    }
    // Si se ingresó un valor dentro del campo
    else {
        // Petición GET para buscar datos dado un ATTUID
        $.ajax({
            // URL para buscar attuid
            url: '/Evaluacion-Gerente/hardcode-_-find_gerente/' + attuid,
            // La petición retorna un JSON
            dataType: 'json',
            // Petición GET
            type: 'GET',
            // Resultado de la petición
            success: function (data) {
                // Si la petición no encontró resultados para el ATTUID dado manda alerta
                if (data["id"] == "Not found") {
                    document.getElementById("id_nombre_gerente").value = "";
                    swal("No se han encontrado resultados para «" + attuid + "»", {
                        buttons: {
                            catch: {
                                text: "Más información",
                                value: "catch"
                            }
                        },
                        icon: "warning"
                    })
                        // #TODO mostrar información de contacto
                }
                // Si la petición regresa un resultado se autocompletan los siguientes campos
                else {
                    document.getElementById("id_nombre_gerente").value = data["nombre_completo"];
                    document.getElementById("id_attuid_gerente").value = data["attuid"];
                }
            }
        });
    }
});


// busca ejecutivo en encuesta de evaluación gerente
$('#fill_ejecutivo').click(function () {
    // Obtiene attuid del campo
    var attuid = document.getElementById("id_attuid_ejecutivo").value;
    // attuid = attuid.replace(/[^a-z0-9]/gi,'');
    // Si no se ha ingresado ningún valor, manda alerta
    if (attuid.length == 0) {
        document.getElementById("id_nombre_ejecutivo").value = "";
        swal({
            text: "Ingresa un ATTUID",
            icon: "warning"
        });
    }
    // Si se ingresó un valor dentro del campo
    else {
        // Petición GET para buscar datos dado un ATTUID
        $.ajax({
            // URL para buscar attuid
            url: '/Evaluacion-Gerente/hardcode-_-find_ejecutivo/' + attuid,
            // La petición retorna un JSON
            dataType: 'json',
            // Petición GET
            type: 'GET',
            // Resultado de la petición
            success: function (data) {
                // Si la petición no encontró resultados para el ATTUID dado manda alerta
                if (data["id"] == "Not found") {
                    document.getElementById("id_nombre_ejecutivo").value = "";
                    swal("No se han encontrado resultados para «" + attuid + "»", {
                        buttons: {
                            catch: {
                                text: "Más información",
                                value: "catch"
                            }
                        },
                        icon: "warning"
                    })
                        // #TODO mostrar información de contacto
                }
                // Si la petición regresa un resultado se autocompletan los siguientes campos
                else {
                    document.getElementById("id_nombre_ejecutivo").value = data["nombre_completo"];
                    document.getElementById("id_attuid_ejecutivo").value = data["attuid"];
                }
            }
        });
    }
});


if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}