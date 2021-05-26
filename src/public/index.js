let socket = io();
let not_div = document.getElementById('not');
let cadena = document.getElementById('cadena');
let operaciones = document.getElementById('operaciones');
let alerts_div = document.getElementById('alerts');

socket.on('notificacion', function(data) {
    notificacion(data);
});

let notificacion = (data)=>{
    switch (data.type) {
        case 'C':
            not_div.innerHTML+=  '<div class="alert alert-info" role="alert">'+
                        data.alert+
                    '</div>';
            break;
        case 'D':
            not_div.innerHTML+=  '<div class="alert alert-danger" role="alert">'+
                        data.alert+
                    '</div>';
            break;
        default:
            break;
    }

}


let validarCadena = ()=>{
    if(cadena.value.length > 20){
        alertas('CADENA MAYOR A 20 CARACTERES.')
    }else{
        alerts_div.innerHTML = '';
    }
    validarErrores(cadena.value);
    jerarquia1(cadena.value);
}

let alertas = (msg) =>{
    alerts_div.innerHTML =  '<div class="alert alert-danger" role="alert" id="alerts">'+
                            msg+
                            '</div>'; 
}

String.prototype.replaceAtIndexes = function(aIndex, bIndex, replacement) {
    if (aIndex >= this.length) {
        return this.valueOf();
    }
    return this.substring(0, aIndex) + replacement + this.substring(bIndex);
}

let xxx = '(10*3-(3/4+2*8)';
let xx2 = '(10-(3/4)+2*8)';



let validarErrores = (cadena)=>{
    let errores = []
    if(cadena.search('([+-])+([+-])+') > -1){
        errores.push('++ +- -+ --');
    }else if(cadena.search('([+/])+([+/])+') > -1){
        errores.push('++ +/ /+ //');
    }else if(cadena.search('([+])+([+*])+') > -1){
        errores.push('++ +*');
    }else if(cadena.search('([*]){1}([+])+') > -1){
        errores.push('*+');
    }else if(cadena.search('([*]){1}([-])+') > -1){
        errores.push('*-');
    }else if(cadena.search('([*]){1}([/])+') > -1){
        errores.push('*/');
    }else if(cadena.search('([-/])+([-/])+') > -1){
        errores.push('// -- -/ /-');
    }else if(cadena.search('([-])+([*])+') > -1){
        errores.push('-*');
    }else if(cadena.search('([/])+([*])+') > -1){
        errores.push('/*');
    }
    console.log(errores);
    return errores;
}
7/8*7
let potencias = (cadena)=>{
    console.log(cadena);
    if(cadena.search('([0-9])+([*]){2}[0-9]+') > -1){
        let {0:operacion, index} = cadena.match('([0-9])+([*]){2}[0-9]+');
        return cadena.replaceAtIndexes(index, index+operacion.length,ejecutarOperacion({o:operacion,xxx:'**'}));
    }else{
        return cadena;
    }
}

let sumas = (cadena)=>{
    console.log(cadena);
    if(cadena.search('([-]){0,1}([0-9])+([+]){1}[0-9]+') > -1){
        let {0:operacion, index} = cadena.match('([-]){0,1}([0-9])+([+]){1}[0-9]+');
        return cadena.replaceAtIndexes(index, index+operacion.length,ejecutarOperacion({o:operacion,xxx:'+'}));
    }else{
        return cadena;
    }
}

let restas = (cadena)=>{
    console.log(cadena);
    if(cadena.search('([-]){0,1}([0-9])+([-]){1}[0-9]+') > -1){
        let {0:operacion, index} = cadena.match('([-]){0,1}([0-9])+([-]){1}[0-9]+');
        return cadena.replaceAtIndexes(index, index+operacion.length,ejecutarOperacion({o:operacion,xxx:'-'}));
    }else{
        return cadena;
    }
}

let multiplicaciones = (cadena)=>{
    console.log(cadena);
    if(cadena.search('([-]){0,1}([0-9])+([*]){1}[0-9]+') > -1){
        let {0:operacion, index} = cadena.match('([-]){0,1}([0-9])+([*]){1}[0-9]+');
        return cadena.replaceAtIndexes(index, index+operacion.length,ejecutarOperacion({o:operacion,xxx:'*'}));
    }else{
        return cadena;
    }
}

let divisiones = (cadena)=>{
    console.log(cadena);
    if(cadena.search('([-]){0,1}([0-9])+([/]){1}[0-9]+') > -1){
        let {0:operacion, index} = cadena.match('([-]){0,1}([0-9])+([/]){1}[0-9]+');
        return cadena.replaceAtIndexes(index, index+operacion.length,ejecutarOperacion({o:operacion,xxx:'/'}));
    }else{
        return cadena;
    }
}


// '([-]){0,1}([0-9])+([-+]){1}[0-9]+' suma resta
// '([0-9])+([/*]){1}[0-9]+' division, multiplicacion
// '([0-9])+([*]){2}[0-9]+' potencia

// (10-3/4+2*8)
// (10-(3/4)+2*8)
// (13-3/4+2**8)
// 16-3/(4+2)*8
// ((10-3)/4+2*8**5)


let separador = ['[',']','(',')'];
let operacion = ['/','-','+','*'];
let numero = ['0','1','2','3','4','5','6','7','8','9'];

let ejecutarOperacion = (cadena)=>{   
    let i = (cadena.o[0] === '-')?1:0;
    switch (cadena.xxx) {
        case '**':
            values = cadena.o.split('**');
            a = Number(values[0])**Number(values[1]);
        break;
        case '*':
            values = cadena.o.split('*');
            a = Number(values[0])*Number(values[1]);
        break;
        case '+':
            values = cadena.o.split('+');
            a = Number(values[0])+Number(values[1]);
        break;
        case '-':
            values = cadena.o.substring(i,cadena.o.length).split('-');
            a = Number(i===1?-values[0]:values[0])-Number(values[1]);
        break;
        default:
            values = cadena.o.split('/');
            a = Number(values[0])/Number(values[1]);
        break;
    }
    return a;
}



let jerarquia1 = (cadena)=>{
    while (cadena.search('([0-9])+([*]){2}[0-9]+') > -1) {
        cadena = potencias(cadena);
    }
    //let {0:operacion, index} = cadena.match('([-]){0,1}([0-9])+([-]){1}[0-9]+');
    console.log(cadena);
}

let jerarquia2 = (cadena)=>{
    let {index:iMultiplicacion} = cadena.match('([*])+').index || -1;
    let {index:iDivision} = cadena.match('([/])+') || -1;

    do {
        if (iMultiplicacion > iDivision) {
            while (cadena.search('([-]){0,1}([0-9])+([*]){1}[0-9]+') > -1) {
                cadena = multiplicaciones(cadena);
                break;
            }
        }else if(iMultiplicacion < iDivision){
            while (cadena.search('([-]){0,1}([0-9])+([/]){1}[0-9]+') > -1) {
                cadena = divisiones(cadena);
                break;
            }
        }else{
            break;
        }
    
         {index:iMultiplicacion} = cadena.match('([*])+') || -1;
        let {index:iDivision} = cadena.match('([/])+') || -1;
        
    } while (condition);
    
    
    console.log(cadena);
}