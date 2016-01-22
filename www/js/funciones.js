var app = angular.module("app", ['onsen']);

app.controller("AppController", function($scope, $http) {
    
    $scope.formServicio = {radio: "EFECTIVO", reparar: false, garantia:false, mantenimiento: false, instalacion: false};
	
    //$scope.url ={defecto: "http://localhost:8082/"};
    $scope.url ={defecto: "http://caribbeancollege.co/online/"};
    
    $scope.urlImg={name:"img/inicio.jpg"};
    
    $scope.empresa = {
        IDENTIFICACION: '',
        NOMBRE: '',
        DIRECCION: '',
        TELEFONO: '',
        CELULAR: '',
        EMAIL: '',
        IMAGEN: '',
        ERROR: ''
    };
    
    $scope.productos = {
        ID: '',
        NOMBRE: '',
        DESCRIPCION: '',
        IMAGEN: '',
        ESTADO: '',
        ERROR: ''
    };
    
    $scope.servicios = {
        ID: '',
        ID_PRODUCTO: '',
        ID_SERVICIO: '',
        ID_TECNICO: '',        
        FORMAPAGO: '',
        FECHA: '',
        MONTO: '',
        NOMBRE_PRODUCTO: '',
        NOMBRE_TECNICO: '',
        CELULAR_TECNICO: '',
        NOMBRE_SERVICIO: '',
        ESTADO: '',
        ERROR: ''
    };
    
    $scope.comentarios = {
        ID: '',
        ID_EMPRESA: '',
        NOMBRE_EMPRESA: '',
        MENSAJE: '',
        FECHA: '',
        ERROR: ''
    };
    
    $scope.payU = {
        URL: '',
        APIKEY:'',
        MERCHANTID:'',
        ACCOUNTID:'',
        DESCRIPTION:'',
        TAX:'',
        TAXRETURNBASE:'',
        CURRENCY:'',
        LNG:'',
        SOURCEURL:'',
        BUTTONTYPE:'',
        ERROR:''
    };
    
    $scope.mensaje = {
        DESCRIPCION:''
    };
    
    $scope.alert = function(material) {
        ons.notification.alert({
            message: $scope.mensaje.DESCRIPCION,
            modifier: material ? 'material' : undefined
        });        
    };
    
    $scope.autologin = function () {    
	if(localStorage.getItem("sIdentificacion") != null && localStorage.getItem("sPassword") != null){
            $http.get($scope.url.defecto+"kcrs_servidor/login.php?sIdentificacion="+localStorage.getItem("sIdentificacion")+"&sPassword="+localStorage.getItem("sPassword"))
            .success(
                function(response){
                    if(response[0].ERROR == 0){
                        $scope.empresa.IDENTIFICACION = response[0].IDENTIFICACION;
                        $scope.empresa.NOMBRE = response[0].NOMBRE;
                        $scope.empresa.DIRECCION = response[0].DIRECCION;
                        $scope.empresa.TELEFONO = response[0].TELEFONO;
                        $scope.empresa.CELULAR = response[0].CELULAR;
                        $scope.empresa.EMAIL = response[0].EMAIL;
                        $scope.empresa.IMAGEN = response[0].IMAGEN;
                        
                        $scope.listar_payu();
                        $scope.listar_productos();
                        $scope.listar_servicios();
                        $scope.listar_comentarios();
						
                        myNavigator.resetToPage('menu_inicio.html', { animation : 'lift' });

                    }else{
                        document.getElementById("myImg_srvcio_3").style.visibility = "hidden";
                    }

                })
                .error(
                function(error, status){
                    document.getElementById("myImg_srvcio_3").style.visibility = "hidden";
                });
	}else document.getElementById("myImg_srvcio_3").style.visibility = "hidden";
    }
	
    $scope.autologin();
	
    $scope.login = function (myNavigator) {
                
		var sIdentificacion = document.getElementById("identificacion_L").value;
		var sPassword = document.getElementById("password_L").value;
		
		if(sIdentificacion.trim()==""){
                        document.getElementById("identificacion_L").value="";
                        $scope.mensaje.DESCRIPCION = 'Digite su Cedula o Nit';
                        $scope.alert(); 
			document.getElementById("identificacion_L").focus();
			return null;
		}
		
		if(sPassword.trim()==""){
                        $scope.mensaje.DESCRIPCION = 'Digite su Password';
                        $scope.alert(); 
			document.getElementById("password_L").value="";
			document.getElementById("password_L").focus();
			return null;
		}                
                $http.get($scope.url.defecto+"kcrs_servidor/login.php?sIdentificacion="+sIdentificacion+"&sPassword="+sPassword)
                .success(
                function(response){
                    if(response[0].ERROR == 0){
                        modal.show();  
                        $scope.empresa.IDENTIFICACION = response[0].IDENTIFICACION;
                        $scope.empresa.NOMBRE = response[0].NOMBRE;
                        $scope.empresa.DIRECCION = response[0].DIRECCION;
                        $scope.empresa.TELEFONO = response[0].TELEFONO;
                        $scope.empresa.CELULAR = response[0].CELULAR;
                        $scope.empresa.EMAIL = response[0].EMAIL;
                        $scope.empresa.IMAGEN = response[0].IMAGEN;
                        
                        $scope.listar_payu();
                        $scope.listar_productos();
                        $scope.listar_servicios();
                        $scope.listar_comentarios();
						
			/*guardar datos local*/
			localStorage.setItem("sIdentificacion", sIdentificacion);
			localStorage.setItem("sPassword", sPassword);
                        
                        modal.hide();
                        myNavigator.resetToPage('menu_inicio.html', { animation : 'lift' });

                    }else{
                        $scope.mensaje.DESCRIPCION = 'Identificación y password incorrectos';
                        $scope.alert(); 
                        document.getElementById("password_L").focus();
                    }

                })
                .error(
                function(error, status){
                    $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                    $scope.alert(); 
                });
                
    }
    
    $scope.form_registrarse = function (myNavigator){
	myNavigator.pushPage('registro.html', { animation : 'fade' } );
    }
    
    $scope.form_recordar_password = function (myNavigator){
        myNavigator.pushPage('recuperar_password.html', { animation : 'fade' } );
    }
    
    $scope.registro = function (){
		var sNombre = document.getElementById("nombre_R").value;
                var sIdentificacion = document.getElementById("identificacion_R").value;
		var sPassword1 = document.getElementById("password1_R").value;
		var sPassword2 = document.getElementById("password2_R").value;
		var sDireccion = document.getElementById("direccion_R").value == "" ? "NULL" : document.getElementById("direccion_R").value;
                var sTelefono = document.getElementById("telefono_R").value == "" ? "NULL" : document.getElementById("telefono_R").value;
		var sCelular = document.getElementById("celular_R").value;
		var sEmail = document.getElementById("email_R").value;
		
		if(sNombre.trim()==""){
                        $scope.mensaje.DESCRIPCION = 'Llene el campo Nombre o Empresa';
                        $scope.alert(); 
			document.getElementById("nombre_R").value="";
			document.getElementById("nombre_R").focus();
			return null;
		}
		
		if(sIdentificacion.trim()==""){
                        $scope.mensaje.DESCRIPCION = 'Llene el campo Cedula o Nit';
                        $scope.alert();
			document.getElementById("identificacion_R").value="";
			document.getElementById("identificacion_R").focus();
			return null;
		}
		
		if(sPassword1.trim()==""){
                        $scope.mensaje.DESCRIPCION = 'Llene el campo Password1';
                        $scope.alert();
			document.getElementById("password1_R").value="";
			document.getElementById("password1_R").focus();
			return null;
		}
		
		if(sPassword2.trim()==""){
                        $scope.mensaje.DESCRIPCION = 'Llene el campo Password2';
                        $scope.alert();
			document.getElementById("password2_R").value="";
			document.getElementById("password2_R").focus();
			return null;
		}
		
		if(sPassword1.length<4){
                        $scope.mensaje.DESCRIPCION = 'El campo Password1 debe tener 4 o más caracteres';
                        $scope.alert();
			document.getElementById("password1_R").focus();
			return null;
		}
		
		if(sPassword1 != sPassword2){
                        $scope.mensaje.DESCRIPCION = 'Sus Passwords no coinciden';
                        $scope.alert();
			document.getElementById("password1_R").focus();
			return null;
		}
		
		if(sCelular.trim()==""){
                        $scope.mensaje.DESCRIPCION = 'Llene el campo Celular';
                        $scope.alert();
			document.getElementById("celular_R").value="";
			document.getElementById("celular_R").focus();
			return null;
		}
		
		if(sEmail.trim()==""){
                        $scope.mensaje.DESCRIPCION = 'Llene el campo Email';
                        $scope.alert();
			document.getElementById("email_R").value="";
			document.getElementById("email_R").focus();
			return null;
		}
		
		var sw=false;
		var x;
		for(x=1; x<sEmail.length; x++){
			if(sEmail[x]=="@"){sw=true;break;}
		}
		
		if(!sw || (sEmail.length-1)<=x){
                        $scope.mensaje.DESCRIPCION = 'Correo incorrecto';
                        $scope.alert();
			document.getElementById("email_R").focus();
			return null;
		}
                
                $http.get($scope.url.defecto+"kcrs_servidor/registrarse.php?sNombre="+sNombre+"&sIdentificacion="+sIdentificacion+"&sPassword1="+sPassword1+"&sDireccion="+sDireccion+"&sTelefono="+sTelefono+"&sCelular="+sCelular+"&sEmail="+sEmail)
                .success(
                function(response){
                    var respuesta = response.trim();
                    if(respuesta == "0"){
                        $scope.mensaje.DESCRIPCION = 'Se ha registrado correctamente';
                        $scope.alert();
                        document.getElementById("nombre_R").value="";
                        document.getElementById("identificacion_R").value="";
                        document.getElementById("password1_R").value="";
                        document.getElementById("password2_R").value="";
                        document.getElementById("direccion_R").value="";
                        document.getElementById("telefono_R").value="";
                        document.getElementById("celular_R").value="";
                        document.getElementById("email_R").value="";
                    }else if(respuesta == "1"){
                        $scope.mensaje.DESCRIPCION = 'Identificación ya se encuentra registrada';
                        $scope.alert();
                    }else{
                        $scope.mensaje.DESCRIPCION = 'Hubo un error con el servidor';
                        $scope.alert();
                    }
                })
                .error(
                function(){
                    $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                    $scope.alert();
                });		
    }
    
    $scope.listar_payu = function (){
        $http.get($scope.url.defecto+"kcrs_servidor/listarPayU.php")
            .success(
            function(response){
                if(response[0].ERROR == 0){                    
                    $scope.payU = response;
                }else{
                    $scope.mensaje.DESCRIPCION = 'Hubo un error con el servidor';
                    $scope.alert();
                }                
            })
            .error(
            function(){
                $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                $scope.alert();
            });
    }
    
    $scope.listar_productos = function (){
        $http.get($scope.url.defecto+"kcrs_servidor/listarProductos.php")
            .success(
            function(response){
                if(response[0].ERROR == 0){
                    $scope.productos = response;                    
                }else{
                    $scope.mensaje.DESCRIPCION = 'Hubo un error con el servidor';
                    $scope.alert();
                }                
            })
            .error(
            function(){
                $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                $scope.alert();
            });
    }
    
    $scope.form_producto = function (myNavigator,sProducto){
        $scope.produto = sProducto;
        myNavigator.pushPage('form_servicio.html', { animation : 'slide' } );
    }
	
    $scope.recuperar_password = function (){
        var sIdentificacion = document.getElementById("identificacion_RC").value;
    
        if(sIdentificacion.trim()==""){
            $scope.mensaje.DESCRIPCION = 'Digite su Cedula o Nit';
            $scope.alert();
            document.getElementById("identificacion_RC").value="";
            document.getElementById("identificacion_RC").focus();
            return null;
	}        
        $http.get($scope.url.defecto + "kcrs_servidor/recuperarPassword.php?sIdentificacion=" + sIdentificacion)
                .success(
                        function (response) {
                            var respuesta = response.trim();
                            if (respuesta == "0") {
                                $scope.mensaje.DESCRIPCION = 'Se ha generado una nueva contraseña y ha sido enviada a su correo';
                                $scope.alert();
                                document.getElementById("identificacion_RC").value="";
                            } else if (respuesta == "1") {
                                $scope.mensaje.DESCRIPCION = 'Su identificación no existe en la base de datos';
                                $scope.alert();
                                document.getElementById("identificacion_RC").focus();
                            } else {
                                $scope.mensaje.DESCRIPCION = 'Hubo un error con el servidor';
                                $scope.alert();
                            }
                        })
                .error(
                        function () {
                            $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                            $scope.alert();
                        });
                        
    }
    
    $scope.generar_servicio = function (myNavigator){
		
		document.getElementById("envia_servicio").hidden = true;
		document.getElementById("myImg_srvcio").style.visibility = "visible";
		
		var sPago = $scope.formServicio.radio;
		var sReparar = $scope.formServicio.reparar;
		var sGarantia = $scope.formServicio.garantia;
		var sMantenimiento = $scope.formServicio.mantenimiento;
		var sInstalacion = $scope.formServicio.instalacion;
		
		if(!sReparar && !sGarantia && !sMantenimiento && !sInstalacion){
                        $scope.mensaje.DESCRIPCION = 'Active un servicio';
                        $scope.alert();
			document.getElementById("envia_servicio").hidden = false;
			document.getElementById("myImg_srvcio").style.visibility = "hidden";
			return null;
		}
                $http.get($scope.url.defecto + "kcrs_servidor/servicio.php?sPago="+sPago+"&sReparar="+sReparar+"&sGarantia="+sGarantia+"&sMantenimiento="+sMantenimiento+"&sInstalacion="+sInstalacion+"&sIdentificacion="+$scope.empresa.IDENTIFICACION+"&sIdProducto="+$scope.produto.ID)
                .success(
                        function (response) {
                            var respuesta = response.trim();
                            if (respuesta == "0") {
                                $scope.mensaje.DESCRIPCION = 'Se ha generado un nuevo servicio';
                                $scope.alert();
                                $scope.formServicio.reparar=false;
                                $scope.formServicio.garantia=false;
                                $scope.formServicio.mantenimiento=false;
                                $scope.formServicio.instalacion=false;
                                myNavigator.popPage();
                            }else {
                                $scope.mensaje.DESCRIPCION = 'Hubo un error con el servidor';
                                $scope.alert();
                            }
                        })
                .error(
                        function () {
                            $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                            $scope.alert();
                        });
						
		document.getElementById("myImg_srvcio").style.visibility = "hidden";				
		document.getElementById("envia_servicio").hidden = false;
    }
	
    $scope.cambiar_radio = function (valor){
        $scope.formServicio.radio=valor;
    }
	
    $scope.cambiar_reparar = function (){

        if($scope.formServicio.reparar)$scope.formServicio.reparar=false;
	else $scope.formServicio.reparar=true;	
		
    }
	
    $scope.cambiar_garantia = function (){

        if($scope.formServicio.garantia)$scope.formServicio.garantia=false;
	else $scope.formServicio.garantia=true;
    }
	
    $scope.cambiar_mantenimiento = function (){

        if($scope.formServicio.mantenimiento)$scope.formServicio.mantenimiento=false;
	else $scope.formServicio.mantenimiento=true;
    }
	
    $scope.cambiar_instalacion = function (){

        if($scope.formServicio.instalacion)$scope.formServicio.instalacion=false;
	else $scope.formServicio.instalacion=true;
    }
	
    $scope.listar_servicios = function (){
        $http.get($scope.url.defecto+"kcrs_servidor/listarServicios.php?sIdEmpresa="+$scope.empresa.IDENTIFICACION)
            .success(
            function(response){
                
                if(response[0].ERROR == 0){
                    $scope.servicios = response;                    
                }else{
                    $scope.servicios=null;
                }                
            })
            .error(
            function(){
                $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                $scope.alert();
            });
    }
        
    $scope.form_comentario = function (myNavigator,sServicios){
        $scope.AtencionServicio=sServicios;
        
        if($scope.AtencionServicio.MONTO!="" && $scope.AtencionServicio.ESTADO=="Realizado"){
            
            document.getElementById("myImg_srvcio_2").style.visibility = "visible";
            
            var f = document.createElement("form");
            f.setAttribute('method',"post");
            f.setAttribute('action',$scope.payU[0].URL);
            
            var a = document.createElement("input"); 
            a.setAttribute('type',"hidden");
            a.setAttribute('name',"merchantId");
            a.setAttribute('value',$scope.payU[0].MERCHANTID);
            
            var b = document.createElement("input"); 
            b.setAttribute('type',"hidden");
            b.setAttribute('name',"accountId");
            b.setAttribute('value',$scope.payU[0].ACCOUNTID);
            
            var c = document.createElement("input"); 
            c.setAttribute('type',"hidden");
            c.setAttribute('name',"description");
            c.setAttribute('value',$scope.payU[0].DESCRIPTION);
            
            var d = document.createElement("input"); 
            d.setAttribute('type',"hidden");
            d.setAttribute('name',"referenceCode");
            d.setAttribute('value',$scope.AtencionServicio.ID);
            
            var e = document.createElement("input"); 
            e.setAttribute('type',"hidden");
            e.setAttribute('name',"amount");
            e.setAttribute('value',$scope.AtencionServicio.MONTO);
            
            var g = document.createElement("input"); 
            g.setAttribute('type',"hidden");
            g.setAttribute('name',"tax");
            g.setAttribute('value',$scope.payU[0].TAX);
            
            var h = document.createElement("input"); 
            h.setAttribute('type',"hidden");
            h.setAttribute('name',"taxReturnBase");
            h.setAttribute('value',$scope.payU[0].TAXRETURNBASE);
            
            var i = document.createElement("input"); 
            i.setAttribute('type',"hidden");
            i.setAttribute('name',"currency");
            i.setAttribute('value',$scope.payU[0].CURRENCY);
            
            var j = document.createElement("input"); 
            j.setAttribute('type',"hidden");
            j.setAttribute('name',"lng");
            j.setAttribute('value',$scope.payU[0].LNG);
            
            var k = document.createElement("input"); 
            k.setAttribute('type',"hidden");
            k.setAttribute('name',"sourceUrl");
            k.setAttribute('value',$scope.payU[0].SOURCEURL);
            
            var l = document.createElement("input"); 
            l.setAttribute('type',"hidden");
            l.setAttribute('name',"buttonType");
            l.setAttribute('value',$scope.payU[0].BUTTONTYPE);
            
            var m = document.createElement("input"); 
            m.setAttribute('type',"hidden");
            m.setAttribute('name',"signature");
            m.setAttribute('value',md5($scope.payU[0].APIKEY+"~"+$scope.payU[0].MERCHANTID+"~"+$scope.AtencionServicio.ID+"~"+$scope.AtencionServicio.MONTO+"~"+$scope.payU[0].CURRENCY));
            //alert("el md5 de 555 es: "+md5("6u39nqhq8ftd0hlvnjfs66eh8c~500238~TestPayU~3~USD"));
                
            f.appendChild(a);
            f.appendChild(b);
            f.appendChild(c);
            f.appendChild(d);
            f.appendChild(e);
            f.appendChild(g);
            f.appendChild(h);
            f.appendChild(i);
            f.appendChild(j);
            f.appendChild(k);
            f.appendChild(l);
            f.appendChild(m);
            
            f.submit();
            
            document.getElementById("myImg_srvcio").style.visibility = "hidden";
        }else{
            myNavigator.pushPage('form_comentario.html', { animation : 'slide' } );
        }        
    }
    
    $scope.form_comentario_eliminar = function (myNavigator,sComentario){
        $scope.comentario=sComentario;
        
        if(sComentario.ID_EMPRESA == $scope.empresa.IDENTIFICACION)
            myNavigator.pushPage('form_comentario_eliminar.html', { animation : 'slide' } );
    }
    
    $scope.listar_comentarios = function (){
        $http.get($scope.url.defecto+"kcrs_servidor/listarComentarios.php")
            .success(
            function(response){
                if(response[0].ERROR == 0){
                    $scope.comentarios = response;                    
                }else{
                    $scope.comentarios = null;
                }                
            })
            .error(
            function(){
                $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                $scope.alert();
            });
    }
	
    $scope.eliminar_comentario = function (comentario,myNavigator){
        
        $http.get($scope.url.defecto+"kcrs_servidor/eliminarComentario.php?sIdComentario="+comentario.ID+"&idEmpresa="+$scope.empresa.IDENTIFICACION)
            .success(
            function(response){
                var respuesta = response.trim();
                if(respuesta == "0"){
                    $scope.listar_comentarios();
                    $scope.mensaje.DESCRIPCION = 'Se ha eliminado su comentario';
                    $scope.alert();
                    myNavigator.popPage();
                }else{
                    $scope.mensaje.DESCRIPCION = 'Problemas con el servidor';
                    $scope.alert();
                }                
            })
            .error(
            function(){
                $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                $scope.alert();
            });
    }
    
    $scope.enviar_comentario = function (){

        var sComentario = document.getElementById("comentario_C").value;
	if(sComentario.trim()==""){
            $scope.mensaje.DESCRIPCION = 'Ingrese su comentario';
            $scope.alert();
            document.getElementById("comentario_C").value="";
            document.getElementById("comentario_C").focus();
            return null;
	}
        
        $http.get($scope.url.defecto+"kcrs_servidor/enviarComentario.php?sComentario="+sComentario+"&idEmpresa="+$scope.empresa.IDENTIFICACION)
            .success(
            function(response){
                var respuesta = response.trim();
                if(respuesta == "0"){
                    $scope.mensaje.DESCRIPCION = 'Se ha enviado su comentario';
                    $scope.alert();
                    document.getElementById("comentario_C").value="";
                    document.getElementById("comentario_C").focus();
                }else{
                    $scope.mensaje.DESCRIPCION = 'Problemas con el servidor';
                    $scope.alert();
                }                
            })
            .error(
            function(){
                $scope.mensaje.DESCRIPCION = 'Revise su conexión a internet';
                $scope.alert();
            });
    }
	
    $scope.salir = function () {
	localStorage.setItem("sIdentificacion", "");
	localStorage.setItem("sPassword", "");
        location.reload();
    }
    
});
