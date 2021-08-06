let ultimo=7;
let conjuntos=[];
let existeConj=["A","B","C","D","E","F","G"];
let btnUnion;
let btnCardinal;
let btnPertenece;
let btnDiferencia;
let btnIntersec;
let btnComplem;
const contenedor = document.querySelector(".container");
const crear= document.getElementById("crear");
const listar= document.getElementById("listar");
const eliminar= document.getElementById("eliminar");
const consultar= document.getElementById("consultar");
const operar= document.getElementById("operar");
const cont_btn = document.querySelector(".container-btn");
const btn = document.querySelector(".grupo-btn");
const menu = document.querySelector(".menu");
const fin = document.querySelector(".fin");
const text=document.getElementById("text-final");
const menu_opc= document.createElement("DIV");
let opcion=false;
let volverMenu;
let div;
let boton;
let res=[];
class conjunto {
	constructor(nombre,elementos){
		this.nombre = nombre;
		this.elementos = elementos 
	}
	mostrarDatos(lugar){
		crearText(`Nombre: ${this.nombre}`,lugar);
		crearText(`Elementos: ${this.elementos}`,lugar);
	}
}
const naturales= new conjunto("N","abcdefghijklmnopqrstuvwxyz");

crear.addEventListener("click",()=>{
	cont_btn.removeChild(btn);
	menu.innerHTML="Crear Conjunto";
	crearConjunto();	
})

listar.addEventListener("click",()=>{
	cont_btn.removeChild(btn);
	menu.innerHTML="Listar Conjuntos";
	listarConjunto();
	volver(0);
})

eliminar.addEventListener("click",()=>{
	cont_btn.removeChild(btn);
	menu.innerHTML="Eliminar Conjunto";
	mostrar("eliminar","Eliminar",0);
	volver(0);
})

consultar.addEventListener("click",()=>{
	cont_btn.removeChild(btn);
	menu.innerHTML="Consultar Conjunto";
	mostrar("consultar","Consultar",1);
	volver(0);
})

operar.addEventListener("click",()=>{
	menu.innerHTML="Menú de Operaciones";
	main();
	contenedor.replaceChild(menu_opc,cont_btn);
	volver(1);
})


const regresar=()=>{
	let hijos;
	volverMenu.addEventListener("click",()=>{
		do{
			hijos=cont_btn.firstChild;
			cont_btn.removeChild(hijos);
		}while(cont_btn.hasChildNodes());
			menu.innerHTML="Menú";
			cont_btn.appendChild(btn);
	
		if(fin.hasChildNodes()){
			do{
				hijos=fin.firstChild;
				fin.removeChild(hijos);
			}while(fin.hasChildNodes());
		}
	})
}
const eliminarConjunto=(a)=>{
	let preguntrar;
	boton.addEventListener("click",()=>{
		preguntrar=confirm(`Desea Eliminar El Conjunto ${conjuntos[a].nombre}`);
		if(preguntrar){
			crearTextColor(`Conjunto ${conjuntos[a].nombre} Eliminado`,false);
			conjuntos.splice(a,1);
			existeConj.splice(a,1);
		   ultimo--;
		   limpiar(0);
		   mostrar("eliminar","Eliminar",0); 
		   }
	})
} 
const consultarConjunto=(a)=>{
	boton.addEventListener("click",()=>{
		limpiar(0);	
		crearText("_______________________________________________",cont_btn);
		conjuntos[a].mostrarDatos(cont_btn);
		crearText("_______________________________________________",cont_btn);	
	})
} 
const mostrar=(clase,text,num)=>{
	crearText("_______________________________________________",cont_btn);
	for(let i=0; i<ultimo ; i++){
		crearText(`Conjunto N°${i+1}`,cont_btn);
		if(num!=1){
			conjuntos[i].mostrarDatos(cont_btn);
		}
		boton=crearBtn(clase,text,cont_btn);
		if(num==0){
			eliminarConjunto(i);
		}
		if(num==1){
			consultarConjunto(i);
		}
		crearText("_______________________________________________",cont_btn);
	}
}

const realizar=(operacion,conj1,conj2)=>{
		let a;
		let resultado="";
		boton.addEventListener("click",()=>{
			switch(operacion){
				case 0:{
					limpiar(1);
					volver(2);
					resultado=resultado.concat(conjuntos[conj1].elementos);
					for(let i=0;i<conjuntos[conj2].elementos.length;i++){
						if(!resultado.includes(conjuntos[conj2].elementos[i])){
						resultado=resultado.concat(conjuntos[conj2].elementos[i]);
						}
					}
					a=crearText(`${conjuntos[conj1].nombre} ∪ 
					${conjuntos[conj2].nombre}={${resultado}}`,menu_opc);
					return;
				}
				case 1:{
					limpiar(1);
					volver(2);
					resultado=conjuntos[conj1].elementos.length;
					a=crearText(`Conjunto ${conjuntos[conj1].nombre}=
					 Cardinal: {${resultado}}`,menu_opc);
					return;
				}
				case 2:{
					limpiar(1);
					volver(2);
					for(let i=0;i<conjuntos[conj1].elementos.length;i++){
						if(!conjuntos[conj2].elementos.includes(conjuntos[conj1].elementos[i])){
						resultado=resultado.concat(conjuntos[conj1].elementos[i]);
						}
					}
					a=crearText(`${conjuntos[conj1].nombre} 
					${conjuntos[conj2].nombre}={${resultado}}`,menu_opc);
					return
				}
				case 3:{
					limpiar(1);
					volver(2);
					let buscar;
					crearText("Ingrese Elemento",menu_opc);
					resultado=crearInput("text","input",menu_opc);
					buscar=crearInput("submit","crear",menu_opc);
					buscar.value="Buscar";
					buscar.addEventListener("click",()=>{
						if(verificar(resultado.value)){
							limpiar(1);
							volver(2);
							if(conjuntos[conj1].elementos.includes(resultado.value)){
								a=crearText(`El elemento "${resultado.value}" 
								pertenece al conjunto ${conjuntos[conj1].nombre}`,menu_opc)
								text.innerHTML="";
								a.style.color="#00ff00";
								return;
							}else{
								a=crearText(`El elemento "${resultado.value}" 
								no pertenece al conjunto ${conjuntos[conj1].nombre}`,menu_opc)
								text.innerHTML="";
								a.style.color="#ff1a1a";
								return;
							}
						}
					})
				}
				case 4:{
					limpiar(1);
					volver(2);
					for(let i=0;i<conjuntos[conj2].elementos.length;i++){
						if(conjuntos[conj1].elementos.includes(conjuntos[conj2].elementos[i])){
						resultado=resultado.concat(conjuntos[conj2].elementos[i]);
						}
					}
					crearText(`${conjuntos[conj1].nombre} ∩ 
					${conjuntos[conj2].nombre}={${resultado}}`,menu_opc);
					return;
				}
				case 5:{
					limpiar(1);
					volver(2);
					for(let i=0;i<naturales.elementos.length;i++){
						if(!conjuntos[conj1].elementos.includes(naturales.elementos[i])){
						resultado=resultado.concat(naturales.elementos[i]);
						}
					}
					a=crearText(`${conjuntos[conj1].nombre}∁={${resultado}}`,menu_opc);
					return;
				}	
			}
		})
}

const verificar=(a)=>{
	if( a != a.toLowerCase()){
		crearTextColor("Ingrese el elemento en minuscula",false);
		return false;
	}
	if(a.length != 1 || a ==""){
		crearTextColor("Ingrese 1 caracter",false)
		return false;
	}
	  return true;	
}
const seleccionarConj1=(clase,text,num,operacion)=>{
	crearText(`Seleccionar 1° Conjunto`,menu_opc);
	crearText("_______________________________________________",menu_opc);
	for(let i=0; i<ultimo ; i++){
		crearText(`Conjunto N°${i+1}`,menu_opc);
		conjuntos[i].mostrarDatos(menu_opc);
		boton=crearBtn(clase,text,menu_opc);
		if(num==2){
			boton.addEventListener("click",()=>{
				seleccionarConj2("seleccionar","Seleccionar",i,operacion);
			})
			
		}else{
			realizar(operacion,i,null);
		}
		crearText("_______________________________________________",menu_opc);
	}
}
const seleccionarConj2=(clase,text,num,operacion)=>{
	limpiar(1);
	volver(2);
	crearText(`Seleccionar 2° Conjunto`,menu_opc);
	crearText("_______________________________________________",menu_opc);
	for(let i=0; i<ultimo ; i++){
		crearText(`Conjunto N°${i+1}`,menu_opc);
		if(i==num){
			conjuntos[i].mostrarDatos(menu_opc);
			crearText("_______________________________________________",menu_opc);
		}else{
			conjuntos[i].mostrarDatos(menu_opc);
			boton=crearBtn(clase,text,menu_opc);
			realizar(operacion,num,i);
			crearText("_______________________________________________",menu_opc);
		}
		
	}
}

const operaciones=()=>{
	btnUnion.addEventListener("click",()=>{
		menu.innerHTML="Union De Conjuntos";
		limpiar(1);
		volver(2); 
		seleccionarConj1("seleccionar","Seleccionar",2,0);
	})

	btnCardinal.addEventListener("click",()=>{
		menu.innerHTML="Cardinal De Conjuntos";
		limpiar(1);
		volver(2);
		seleccionarConj1("seleccionar","Seleccionar",1,1);
	})

	btnDiferencia.addEventListener("click",()=>{
		menu.innerHTML="Diferencia De Conjuntos";
		limpiar(1);			
		volver(2);
		seleccionarConj1("seleccionar","Seleccionar",2,2);
	})

	btnPertenece.addEventListener("click",()=>{
		menu.innerHTML="Pertenencia De Conjuntos";
		limpiar(1);
		volver(2);
		seleccionarConj1("seleccionar","Seleccionar",1,3);
	})

	btnIntersec.addEventListener("click",()=>{
		menu.innerHTML="Interseccion De Conjuntos";
		limpiar(1);
		volver(2);
		seleccionarConj1("seleccionar","Seleccionar",2,4);
	})

	btnComplem.addEventListener("click",()=>{
		menu.innerHTML="Complemento De Conjuntos";
		limpiar(1);
		volver(2);
		seleccionarConj1("seleccionar","Seleccionar",1,5);
	})
}

const main =()=>{
	if(!opcion){
		btnUnion=crearBtn("grupo-btn","Union",menu_opc);
		btnCardinal=crearBtn("grupo-btn","Cardinal",menu_opc);
		btnDiferencia=crearBtn("grupo-btn","Diferencia",menu_opc);
		btnPertenece=crearBtn("grupo-btn","Pertenencia",menu_opc);
		btnIntersec=crearBtn("grupo-btn","Intersección",menu_opc);
		btnComplem=crearBtn("grupo-btn","Complemento",menu_opc);
		opcion=true;
		operaciones();
	}
}
const crearBtn=(clase,text,lugar)=>{
	let input = document.createElement("BUTTON");
	input.innerText=text;
	input.className=clase;
	lugar.appendChild(input);
	return input;
}

const regresar2=()=>{
	let hijos;
	volverMenu.addEventListener("click",()=>{
			opcion=false;
			limpiar(1);
			main();
			menu.innerHTML="Menú De Operaciones";
			volver(1);
	})
}

const volver=(x)=>{
	volverMenu= crearBtn("volver","Volver",fin);
	if(x==0)regresar();
	if(x==1){
			volverMenu.addEventListener("click",()=>{
			contenedor.replaceChild(cont_btn,menu_opc);
			menu.innerHTML="Menú";
			fin.removeChild(volverMenu);
		})
	}
	if(x==2)regresar2();
}
const crearText=(texto,lugar)=>{
	let text = document.createElement("P");
	text.innerHTML=texto;
	text.className="text";
	lugar.appendChild(text);
	return text;
}

const listarConjunto=()=>{
	crearText("_______________________________________________",cont_btn);
	for(let i=0; i<ultimo ; i++){
		crearText(`Conjunto N°${i+1}`,cont_btn);
		conjuntos[i].mostrarDatos(cont_btn);
		crearText("_______________________________________________",cont_btn);
	}
}


const crearTextColor=(texto,condicion)=>{
	text.innerHTML=texto;
	text.className="text";
	if(condicion){
		text.style.color="#00ff00";
	}else{
		text.style.color="#ff1a1a";
	}
	fin.appendChild(text);
}

const crearInput=(tipo,clase,lugar)=>{
	let input = document.createElement("INPUT");
	input.type=tipo;
	input.className=clase;
	lugar.appendChild(input);
	return input;
}

const limpiar=(x)=>{
	let hijos;
	if(x==0){
		do{
			hijos=cont_btn.firstChild;
			cont_btn.removeChild(hijos);
		}while(cont_btn.hasChildNodes());

	}

	if(x==1){
		do{
			hijos=menu_opc.firstChild;
			menu_opc.removeChild(hijos);
		}while(menu_opc.hasChildNodes());
		if(fin.hasChildNodes()){
			fin.removeChild(volverMenu);
		}
		}
}

const verificarElemento = (elemento) =>{
	let aux="";
	if(elemento != elemento.toLowerCase()){
			res[0]=false;
			res[1]="Los elementos deben estar en minuscula";
			return
	}
	if(elemento.length < 0 || elemento ==""){
		res[0]=false;
		res[1]="Elemento debe contener al menos 1 caracter";
		return;
	}

	for(let i=0; i < elemento.length; i++){
		if(aux.includes(elemento[i])){
			res[0]=false;
			res[1]="Los elementos no se deben repetir";
			return
		}
		aux=aux.concat(elemento[i]);
	}
		res[0]=true;
		res[1]="";
		return
}

const verificarNombre = (nombre) =>{
	    if(nombre != nombre.toUpperCase()){
			res[0]=false;
			res[1]="Nombre debe ser mayúscula";
			return
		}
		if(nombre.length!=1){
			res[0]=false;
			res[1]="Nombre debe contener 1 caracter";
			return;
		}
		if(existeConj.includes(nombre)){
			res[0]=false;
			res[1]=`El conjunto ${nombre} ya existe`;
			return
		}
		res[0]=true;
		res[1]="";
		return
} 

	const crearConjunto = () =>{
		let nombre;
		let elementos;
		let input;
		let guardar;
		crearText("Nombre",cont_btn);
		nombre=crearInput("text","input",cont_btn);
		crearText("Elementos",cont_btn);
		elementos=crearInput("text","input",cont_btn);
		input=crearInput("submit","crear",cont_btn);
		input.value="Crear";
		input.addEventListener("click",()=>{
			guardar=confirm("¿Guardar Conjunto?");
			if(guardar){
					verificarNombre(nombre.value);
					if(!res[0]){
						crearTextColor(res[1],false);
						return;
					}

					verificarElemento(elementos.value);
					if (!res[0]) {
						crearTextColor(res[1],false);
						return;
					}else{
						existeConj=existeConj.concat(nombre.value); 
						limpiar(0);
						conjuntos[ultimo]=new conjunto(nombre.value,elementos.value);
						conjuntos[ultimo].mostrarDatos(cont_btn);
						crearTextColor("Conjunto Guardado",true);
						ultimo++;
						volver(0);
					}
			}else{
				limpiar(0);
				crearText(`Nombre: ${nombre.value}`,cont_btn);
				crearText(`Elementos: ${elementos.value}`,cont_btn);
				crearTextColor("Conjunto No Guardado",false);
				volver(0);
			}
		})
	}
	
conjuntos[0]=new conjunto("A","asd");
conjuntos[1]=new conjunto("B","jkasd");
conjuntos[2]=new conjunto("C","jasd");
conjuntos[3]=new conjunto("D","wqo");
conjuntos[4]=new conjunto("E","jwqsd");
conjuntos[5]=new conjunto("F","erasd");
conjuntos[6]=new conjunto("G","sd");