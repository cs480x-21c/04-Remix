import {Component} from "preact";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVirus} from "@fortawesome/free-solid-svg-icons";
import BarChart from "./BarChart";

class App extends Component {
    render() {
        return (
            <div class="flex flex-col p-4 bg-wpi-gray absolute inset-0 space-y-4">
                <div class="flex flex-col items-center">
                    <div class="bg-white shadow-lg rounded-md text-6xl p-4 flex flex-row space-x-4">
                        <div class="text-wpi-red">
                            <FontAwesomeIcon icon={faVirus}/>
                        </div>
                        <div>
                            Improved WPI Covid Dashboard
                        </div>
                    </div>
                </div>
                <div class="flex flex-row flex-grow space-x-4">
                    <div class="bg-white shadow-lg rounded-md flex-1 p-4">
                        <BarChart />
                    </div>
                    <div class="bg-white shadow-lg rounded-md flex-1 p-4"></div>
                </div>
            </div>
        )
    }
}

export default App;