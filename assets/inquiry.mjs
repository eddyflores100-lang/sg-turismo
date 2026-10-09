export function todayInEcuador(now=new Date()) {
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Guayaquil',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const part=type=>parts.find(p=>p.type===type).value;
 return `${part('year')}-${part('month')}-${part('day')}`;
}
export function prepareInquiry({origin,destination,date,passengers,service},today=todayInEcuador()) {
 if(typeof origin!=='string'||typeof destination!=='string'||!origin.trim()||!destination.trim()||origin.length>100||destination.length>100)throw Error('Indica origen y destino (máximo 100 caracteres cada uno).');
 if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date||date<today)throw Error('Elige una fecha válida, desde hoy en adelante.');
 if(!/^\d{1,3}$/.test(String(passengers))||Number(passengers)<1||Number(passengers)>200)throw Error('Indica entre 1 y 200 pasajeros. Para grupos grandes se debe confirmar la combinación de vehículos.');
 if(!['Solo ida','Ida y vuelta','Recorrido por definir'].includes(service))throw Error('Selecciona el tipo de viaje.');
 const text=`Hola SG-Turismo, quiero solicitar una cotización.\nOrigen: ${origin.trim()}\nDestino: ${destination.trim()}\nFecha de salida: ${date}\nPasajeros: ${Number(passengers)}\nServicio: ${service}\nPor favor confirmar disponibilidad, vehículo, itinerario, precio total, condiciones y forma de reserva. Entiendo que esta consulta no confirma una reserva.`;
 return {text,url:`https://wa.me/593999094233?text=${encodeURIComponent(text)}`};
}
