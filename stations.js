async function fetchData() {
    const URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';
    let data = [];

    try {
        let response = await fetch(URL, {
            Accept: 'application/json'
        });
        
        data = await response.json();
    } catch (error) {
        //pass
    }

    return data;
}


function sortByProvince(data) {
    let stations_by_province = {};

    try {
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
    } catch (error) {
        //pass
    }

    return stations_by_province;
}