
window.addEventListener('DOMContentLoaded', (event) => {
    let map = new MyMap('map_container');
    let stations = new Stations();
    
    stations.init()
    .then(() => {
        console.log(stations.data)
        let stations_by_province = stations.getByProvince();
        let provinces = Object.keys(stations_by_province);
        
        let selected_provinces = ['PALENCIA'];

        //Draw provinces
        selected_provinces.forEach((province) => {
            console.log(province, stations_by_province[province]);
            map.addLayer(province, stations_by_province[province])
        });
    });


    //TODO: provinces modal actions
});