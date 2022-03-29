class MyMap {
    constructor(container_id) {
        this.container_id = container_id;
        this.map = undefined;
        this.control = undefined;
        this.layers = [];
        this.data = [];

        //Singleton
        if (typeof MyMap.instance === 'Object') {
            return MyMap.instance;
        }
        MyMap.instance = this;

        
        this.init()
        return this;
    }


    init() {
        const OSM_layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        });
        const google_streets_layer = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 18,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        const google_hybrid_layer = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 18,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        console.log(this.container_id);
        this.map = L.map(this.container_id, {
            center: [40.1, -4],
            zoom: 6.5, //almost all spain
            layers: [google_hybrid_layer]
        });

        this.control = L.control.layers().addTo(this.map);
    }


    setData(data) {
        if (Array.isArray(data)) {
            this.data = data
        }
    }

    addLayer(layer_name, data=false) {
        //get default data if not passed
        if (!data) {
            data = this.data;
        }
        let layer = this.createLayer(data);
        this.layers = this.layers.concat(layer);
        this.map.addLayer(layer);
        this.control.addOverlay(layer, layer_name);
    }

    clearLayers() {
        this.layers.forEach(function (layer) {
            this.map.removeLayer(layer);
            this.control.removeLayer(layer);
        });
        this.layers = []; //clean it
    }

    createLayer(data) {
        let marker_list = [];

        //create all markers
        data.forEach(function (marker) {
            let new_marker = MyMap.newMarker(marker);
            if (new_marker === null) {
                return;
            }

            marker_list.push(new_marker);
        });

        //add markers to layer
        let layer = L.layerGroup(marker_list);
        return layer;
    }

    static newMarker(marker_info) {        
        marker_info.coords = [
            Number(marker_info['Latitud'].replace(',', '.')),
            Number(marker_info['Longitud (WGS84)'].replace(',', '.'))
        ];
        
        if ((Number(marker_info.coords[0]) == 0) || (Number(marker_info.coords[1]) == 0)) {
            return null; //no coords
        }
        
        var marker = L.marker(marker_info.coords, {
            icon: L.icon({
                iconUrl: 'images/icon.png',
            }),
        });

        return marker;
    }



}


function applyFilter() {
    clearLayers();
    const input = $("#mapFilter").val();
    if (input == "") {
        //Empty filter
        addDefaultLayers();
        return;
    }

    //FILTER
    const text = input.toLowerCase();
    var filtered_supplypoints = supplypoints.filter(function (sp) {
        const all_data = sp.all_data.toLowerCase();
        return all_data.includes(text);
    })

    var filter_layer = createLayer(filtered_supplypoints);

    // Update map layers
    var layer_name = (input) ? input : filter_label;
    addLayer(layer_name, filter_layer)
}
