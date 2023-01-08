const btnBuscar = document.querySelector('#btnBuscar')
const formBusqueda = document.querySelector('#formGroupExampleInput')
const boxModal = document.querySelector('#boxModal')
const primaryBox = document.querySelector('#primaryBox')
const infoPrimUP = document.querySelector('#infoPrimUP')
const infoPrimDown = document.querySelector('#infoPrimDown')
const iconClima = document.querySelector('#iconClima')
const infoRigth = document.querySelector('#infoRigth')
let icon;


btnBuscar.addEventListener('click', infoCiudad)

document.addEventListener('DOMContentLoaded', ()=>{ 
	let city = 'Cordoba'
	consultaAPI(city)
})

function infoCiudad(city){	
	city = formBusqueda.value
	consultaAPI(city);	
	formBusqueda.value = ''
}

function consultaAPI(city){
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=1d40fabe0c0153f5ecad01436ad22e14`;	
	fetch(url)
	.then((response) => response.json())
	.then((data) => pasa((data)))
	.catch(noPasa)
}

function pasa(data){
	let main = data.weather[0].main;
	let temp = Math.round(data.main.temp);
	let tempMax = Math.round(data.main.temp_max);
	let tempMin = Math.round(data.main.temp_min);
	let sensTerm = Math.round(data.main.feels_like);
	let humedad = Math.round(data.main.humidity);
	let velViento = Math.round(data.wind.speed);
	let ciel = data.weather[0].description;
	let cielo = ciel[0].toUpperCase() + ciel.substring(1);
	let ciudad = data.name;
	let pais = data.sys.country;
	let diaSemana = moment().format('dddd');
	let dia = diaSemana[0].toUpperCase() + diaSemana.substring(1);
	let diaClendario = moment().format('D');
	let nomMes = moment().format('MMMM');
	let mes = nomMes[0].toUpperCase() + nomMes.substring(1);
	let year = moment().format('YYYY');

	infoPrimaryUP(dia, diaClendario, mes, year, ciudad, pais);
	infoPrimaryDown(temp, cielo);
	casos(main);
	infoDerecha(tempMax, tempMin, sensTerm, humedad, velViento);	
}

function noPasa(){
	const boxError = document.createElement('div');
	boxError.className = ('col-12 d-flex justify-content-center');
	boxError.innerHTML = `<p class="text error">Ingresa una ciudad válida</p>`;
	boxModal.appendChild(boxError);

	setTimeout(function(){
		boxError.remove()
	},2500)
}

function infoPrimaryUP(dia, diaClendario, mes, year, ciudad, pais){
	borrarList(infoPrimUP);

	const boxUp = document.createElement('div');
	boxUp.className = ('col-12 infoPrimaryUP');
	boxUp.innerHTML = `
	<h2 class="text textPrim">${dia}</h2>
	<p class="text textPrim">${diaClendario} ${mes} ${year}</p>
	<i><img src="https://res.cloudinary.com/dthpuldpm/image/upload/v1672579498/Weather%20App/locationPoint_g1hrxq.png" style="width: 5%; margin-right: 5px;" alt=""></i>
	<span class="text textPrim">${ciudad}, ${pais}</span>`

	infoPrimUP.appendChild(boxUp);
}

function infoPrimaryDown(temp, cielo){
	borrarList(infoPrimDown);

	const boxDown = document.createElement('div');
	boxDown.className = ('infoPrimaryDown');
	boxDown.innerHTML = 
	`<h1 class="text">${temp}°C</h1>
	<h3 class="text"> ${cielo}</h3>`

	infoPrimDown.appendChild(boxDown);
}

function casos(main){
	switch (main){
		case 'Thunderstorm':
			primaryBox.style.backgroundImage = "url('https://res.cloudinary.com/dthpuldpm/image/upload/v1672581678/Weather%20App/thunderstorm_ybusup.jpg')";	
			icon = 'https://res.cloudinary.com/dthpuldpm/image/upload/v1673213279/Weather%20App/Thunderstorm_czzw8d.png'
			insertIcon(icon);
			break;
		case 'Drizzle':
			primaryBox.style.backgroundImage = "url('https://res.cloudinary.com/dthpuldpm/image/upload/v1672581678/Weather%20App/showerRain_djuizk.jpg')";
			icon = 'https://res.cloudinary.com/dthpuldpm/image/upload/v1673213279/Weather%20App/dizzle-rain_gmraqu.png'
			insertIcon(icon);
			break;
		case 'Rain':
			primaryBox.style.backgroundImage = "url('https://res.cloudinary.com/dthpuldpm/image/upload/v1672581679/Weather%20App/rain_byawu1.jpg')";
			icon = 'https://res.cloudinary.com/dthpuldpm/image/upload/v1673213279/Weather%20App/dizzle-rain_gmraqu.png'
			insertIcon(icon);
			break;
		case 'Snow':
			primaryBox.style.backgroundImage = "url('https://res.cloudinary.com/dthpuldpm/image/upload/v1672581676/Weather%20App/snow_v4mq5c.jpg')";
			icon = 'https://res.cloudinary.com/dthpuldpm/image/upload/v1673213279/Weather%20App/Snow_wyiool.png'
			insertIcon(icon);
		 	 break;                        
		case 'Clear':
			primaryBox.style.backgroundImage = "url('https://res.cloudinary.com/dthpuldpm/image/upload/v1672581671/Weather%20App/clearSky_hgy6ev.jpg')";
			icon = 'https://res.cloudinary.com/dthpuldpm/image/upload/v1672580039/Weather%20App/sun_dbpoek.png'
			insertIcon(icon);
		  	break;
		case 'Atmosphere':
			primaryBox.style.backgroundImage = "url('https://res.cloudinary.com/dthpuldpm/image/upload/v1672581675/Weather%20App/mist_qssikr.jpg')";
			icon = 'https://res.cloudinary.com/dthpuldpm/image/upload/v1673213279/Weather%20App/Atmosphere_nab5aj.png'
			insertIcon(icon);
			break;  
		case 'Clouds':
			primaryBox.style.backgroundImage = "url('https://res.cloudinary.com/dthpuldpm/image/upload/v1672581675/Weather%20App/scatteredClouds_zmsxy1.jpg')";
			icon = 'https://res.cloudinary.com/dthpuldpm/image/upload/v1673213279/Weather%20App/Clouds_tjnl9z.png'
			insertIcon(icon);
			break; 
		case 'Mist':
			primaryBox.style.backgroundImage = "url('https://res.cloudinary.com/dthpuldpm/image/upload/v1672581675/Weather%20App/mist_qssikr.jpg')";
			icon = 'https://res.cloudinary.com/dthpuldpm/image/upload/v1673213279/Weather%20App/Mist_zulpxl.png'
			insertIcon(icon);
			break; 		
		default:
			primaryBox.style.backgroundImage = "url('https://res.cloudinary.com/dthpuldpm/image/upload/v1672581679/Weather%20App/fewClouds_le4b4o.jpg')";
			icon = 'https://res.cloudinary.com/dthpuldpm/image/upload/v1673213279/Weather%20App/Clouds_tjnl9z.png'
			insertIcon(icon);
			break;
	  }
}

function insertIcon(icon){	
	borrarList(iconClima);

	const boxIcon = document.createElement('div');
	boxIcon.innerHTML = `<i><img class="weatherIcon" src='${icon}'></i>`

	iconClima.appendChild(boxIcon);
}

function infoDerecha(tempMax, tempMin, sensTerm, humedad, velViento){
	infoRigth.innerHTML = 
	`<div class="col-12 infoSec infoPrimaryUP">
	<table class="table p-0 m-0">
			<tbody class="p-0">
				<tr class="p-0">
					<td class="text textSec infoTable p-1">HUMEDAD</td>
					<td class="text textSec p-1">${humedad}%</td>
				</tr>
				<tr>
					<td class="text textSec infoTable p-1">SENS. TERMINCA</td>
					<td class="text textSec p-1">${sensTerm}°C</td>
				</tr>
				<tr>
					<td class="text textSec infoTable p-1">VEL. DEL VIENTO</td>
					<td class="text textSec p-1">${velViento} KM/H</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="col-12 infoSec infoPrimaryUP">
		<table class="table p-0 m-0">
			<tbody class="p-0">
				<tr class="p-0">
					<td class="text textSec infoTable p-1">Temp. Min.</td>
					<td class="text textSec infoTable p-1">Temp. Max.</td>
				</tr>
				<tr>
					<td class="text textSec p-1 fs-1">${tempMin}°C</td>
					<td class="text textSec p-1 fs-1">${tempMax}°C</td>
				</tr>
			</tbody>
		</table>
	</div>`
}

function borrarList(param){
    while(param.firstChild){
        param.removeChild(param.firstChild)        
    }
}


/*************************************************************************************************************************************/
