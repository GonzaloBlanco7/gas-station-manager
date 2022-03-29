class Stations {
    constructor() {
        this.data = [];
        this.stations_by_province = undefined;

        //Singleton
        if (typeof Stations.instance === 'Object') {
            return Stations.instance;
        }
        Stations.instance = this;

        return this;
    }

    async init() {
        const URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';
        try {
            let response = await fetch(URL, {
                Accept: 'application/json'
            });

            this.data = await response.json();
        } catch (error) {
            //pass
        }
    }

    getByProvince() {
        if (this.stations_by_province !== undefined) {
            return this.stations_by_province; //cache
        }

        this.stations_by_province = {};

        try {
            //Divide by province
            this.data.ListaEESSPrecio.forEach(station => {
                if (!this.stations_by_province.hasOwnProperty(station.Provincia)) {
                    this.stations_by_province[station.Provincia] = Array();
                }
                this.stations_by_province[station.Provincia].push(station);
            });

            //Sort by CP
            /*
            Object.keys(stations_by_province).forEach(province => {
                stations_by_province[province] = stations_by_province[province].sort((a, b) => {
                    return a['C.P.'] - b['C.P.'];
                })
            });
            */
        } catch (error) {
            //pass
        }

        return this.stations_by_province;
    }
     
}