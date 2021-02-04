import {features} from '../data/countries.json'

class LoadCountriesTask{



    laod=(setState)=>{
        setState(features)
    }
}


export default LoadCountriesTask;