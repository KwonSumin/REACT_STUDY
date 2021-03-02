import React, {Component} from 'react'
import './roulette.css';
import $ from "jquery";

class Dice extends Component {
    constructor(props) {
        super(props);
        this.box = React.createRef();
    }

    componentDidMount(){
        var opacity = 1;
        var self = this;
        var inter = setInterval(setOpct,300);

        var cur = 0;
        var stop = 10;
        
        function setOpct(){
            $(self.box.current).find(".ex-dice-cur").css({color : "rgba(0, 0, 0, " + opacity + ")"});
            opacity -= 0.1;

            if( opacity <= 0 ) {
                
                var dice = $(self.box.current).find(".ex-dice-cur");
                var curDice = $(self.box.current).find(".ex-dice");
                dice.attr("class", "ex-dice");
                curDice.attr("class", "ex-dice-cur");
                curDice.css({color : "rgba(0, 0, 0, 1.0)"});
                
                cur++;
                opacity = 1;
            }
            if( cur >= stop ) clearInterval(inter);
        }
    }

    render(){

        return(
            <div ref={this.box} className="ex-dice-box">
                <div id="dice_1" className="ex-dice-cur">1</div>
                <div id="dice_2" className="ex-dice">2</div>
                {/*  
                <div id="dice_3" className="ex-dice">3</div>
                <div id="dice_4" className="ex-dice">4</div>
                <div id="dice_5" className="ex-dice">5</div>
                <div id="dice_6" className="ex-dice">6</div>
                */}
            </div>
        )
    }
}

export default Dice;