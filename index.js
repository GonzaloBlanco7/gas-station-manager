
window.addEventListener('DOMContentLoaded', (event) => {
    let map = new MyMap('map_container');
    console.log(map)
    
    fetchData()
        .then(data => {
            console.log(data)
            let stations_by_province = sortByProvince(data);
            let provinces = Object.keys(stations_by_province).map(text => text.toLocaleLowerCase());


            //Draw map
            //map.setData(data.ListaEESSPrecio)
            //map.addLayer('Gasolineras')
        });
});


    
