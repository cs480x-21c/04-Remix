import {Component} from "preact";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVirus} from "@fortawesome/free-solid-svg-icons";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import { Switch, FormLabel } from "@chakra-ui/react";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {date: null, caseAvg: true, resultAvg: true};
    }

    setSelectedDate(date) {
        this.setState({date: date, caseAvg: this.state.caseAvg, resultAvg: this.state.resultAvg});
    }

    setCaseAvgMode(event) {
        this.setState({date: this.state.date, caseAvg: !this.state.caseAvg, resultAvg: this.state.resultAvg});
    }

    setResultAvgMode(event) {
        this.setState({date: this.state.date, caseAvg: this.state.caseAvg, resultAvg: !this.state.resultAvg});
    }

    render() {
        return (
            <div class="flex flex-col p-4 bg-wpi-gray h-screen w-screen space-y-4" onclick={() => this.setSelectedDate(null)}>
                <div class="flex flex-col items-center">
                    <div class="bg-white shadow-lg rounded-md text-6xl p-4 flex flex-row space-x-4">
                        <div class="text-wpi-red">
                            <FontAwesomeIcon icon={faVirus}/>
                        </div>
                        <div>
                            Alternative WPI Covid Dashboard
                        </div>
                    </div>
                </div>
                <div class="flex flex-row flex-grow space-x-4">
                    <div class="bg-white shadow-lg rounded-md flex-1 p-4 flex flex-col items-center space-y-16">
                        <BarChart callback={(date) => this.setSelectedDate(date)} selectedDate={this.state.date} caseAvg={this.state.caseAvg} resultAvg={this.state.resultAvg}/>
                        <div class="flex flex-col space-y-4 shadow-inner border-wpi-gray border-2 rounded-md p-4">
                            <div class="font-sans text-4xl text-center">Options</div>
                            <div class="flex flex-row space-x-4">
                                <Switch size="lg" id="caseSwitch" colorScheme="red" isChecked={this.state.caseAvg} onChange={this.setCaseAvgMode.bind(this)}/>
                                <FormLabel for="caseSwitch">
                                    7-Day Rolling Average Cases
                                </FormLabel>
                            </div>
                            <div class="flex flex-row space-x-4">
                                <Switch size="lg" id="resultSwitch" colorScheme="red" isChecked={this.state.resultAvg} onChange={this.setResultAvgMode.bind(this)}/>
                                <FormLabel for="resultSwitch">
                                    7-Day Rolling Average Results
                                </FormLabel>
                            </div>

                        </div>
                    </div>
                    <div class="bg-white shadow-lg rounded-md flex-1 p-4 flex justify-center items-center content-center">
                        <BubbleChart callback={(date) => this.setSelectedDate(date)} selectedDate={this.state.date}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;