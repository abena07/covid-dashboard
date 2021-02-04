import {features} from '../data/countries.json'
import papa from "papaparse";


class LoadCountriesTask{
    covidUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv";
    setState=null;
    mapCountries= features;

    load=(setState)=>{
        this.setState=setState;
        papa.parse(this.covidUrl, {
            download:true,
            header: true,
            complete:(result)=> this.#processCovidData(result.data)
        });
       
    }

    #processCovidData = (covidCountries) => {
        for (let i = 0; i < features.length; i++) {
          const country = features[i];
          //console.log(country);
          const covidCountry = covidCountries.find(
            (covidCountry) => country.properties.ISO_A3 === covidCountry.ISO3
          );
    
          country.properties.confirmed = 0;
          country.properties.confirmedText = 0;
    
          if (covidCountry != null) {
            let confirmed = Number(covidCountry.Confirmed);
            country.properties.confirmed = confirmed;
            country.properties.confirmedText = 
              confirmed
            
          }
          
        }
    
        this.setState(features);
      };
      
      
}


export default LoadCountriesTask;