
window.addEventListener('DOMContentLoaded', (event) => {
    let map = new MyMap('map_container');
    let stations = new Stations();
    displayLoader(true)

    stations.init()
    .then(() => {
        console.log(stations.data)
        let stations_by_province = stations.getByProvince();
        displayLoader(false)
        
        console.log('loaded')
        let selected_provinces = ['PALENCIA'];

        //Draw provinces
        selected_provinces.forEach((province) => {
            console.log(province, stations_by_province[province]);
            map.addLayer(province, stations_by_province[province])
        });
    });


    //On modal provinces open
    document.getElementById('provincesModal').addEventListener('show.bs.modal', () => {
        let modal_body = document.querySelector('#provincesModal .modal-body');
        modal_body.innerHTML = '';


        let provinces = Object.keys(stations.getByProvince());
        provinces.forEach(province => {
            let cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.text = province;
            cb.value = province;
            modal_body.appendChild(cb);
        });
        
    })

    //On modal provinces accept
    document.getElementById('confirm_provinces_btn').addEventListener('click', () => {
        let modal_body = document.querySelector('#provincesModal .modal-body');
        console.log(modal_body)


    })
});

function displayLoader(display) {
    if (display) {
        document.getElementById('loader').classList.remove('d-none')
        document.getElementById('content').classList.add('d-none')
    } else {
        document.getElementById('loader').classList.add('d-none')
        document.getElementById('content').classList.remove('d-none')
    }
}