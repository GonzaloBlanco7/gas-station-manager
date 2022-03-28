const URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';

fetch(URL, {
    Accept: 'application/json'
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        console.log(sortByProvince(data))
    });


function sortByProvince(data) {
    let stations_by_province = {};

    //Divide by province
    data.ListaEESSPrecio.forEach(station => {
        if (!stations_by_province.hasOwnProperty(station.Provincia)) {
            stations_by_province[station.Provincia] = Array();
        }
        stations_by_province[station.Provincia].push(station);
    });

    //Sort by CP
    Object.keys(stations_by_province).forEach(province => {
        stations_by_province[province] = stations_by_province[province].sort((a, b) => {
            return a['C.P.'] - b['C.P.'];
        })
    });

    return stations_by_province;
}