
window.addEventListener('DOMContentLoaded', (event) => {
    var map = new MyMap('map_container');
    var stations = new Stations();
    displayLoader(true)


    stations.init()
    .then(() => {
        console.log(stations.data)
        let stations_by_province = stations.getByProvince();
        displayLoader(false)
        
        console.log('loaded')
        let selected_provinces = ['PALENCIA'];

        //Draw provinces
        selected_provinces.forEach(province => {
            console.log(province, stations_by_province[province]);
            map.addLayer(province, stations_by_province[province])
        });
    });


    //On provinces modal open
    document.getElementById('provincesModal').addEventListener('show.bs.modal', () => {
        let modal_body = document.querySelector('#provincesModal .modal-body');
        modal_body.innerHTML = '';

        let provinces = Object.keys(stations.getByProvince());
        provinces.forEach(province => {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `province_${province}`;
            checkbox.value = province;
            
            let label = document.createElement('label')
            label.htmlFor = `province_${province}`;
            label.appendChild(document.createTextNode(` ${province}`));

            modal_body.appendChild(checkbox);
            modal_body.appendChild(label);
            modal_body.appendChild(document.createElement('br'));
        });
        
    })

    //On modal provinces accept
    document.getElementById('confirm_provinces_btn').addEventListener('click', () => {
        let selected_checkboxs = document.querySelectorAll('#provincesModal .modal-body input[type=checkbox]:checked');

        //Clear province layers
        map.clearLayers()
        
        //Add selected provinces
        let stations_by_province = stations.getByProvince();
        for (checkbox of selected_checkboxs) {
            const province = checkbox.value
            map.addLayer(province, stations_by_province[province])
        }
        
        //Close modal
        var myModalEl = document.getElementById('provincesModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
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