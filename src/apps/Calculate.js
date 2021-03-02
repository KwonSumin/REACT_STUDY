import React, {Component} from 'react'

import Button from '../components/button';

class Calculate extends Component {
    constructor(props) {
        super(props);
        this.initState();
        this.buttonClick = this.buttonClick.bind(this);
        this.input = this.input.bind(this);
        this.operate = this.operate.bind(this);
        this.initState = this.initState.bind(this);

    }
    initState(){
        this.state= {
            text : "",
            formula : "",
            init : true,
            operate : "",
            sign : "+"
        };
    }

    buttonClick(e, comp){
        if( comp.props.name === "") return false;
        this.input(comp.props.name);
    }
    //입력 호출 함수
    input(input) {
        if( input === "X") input = "*";
        input = input + "";
        var allow = ["1","2","3","4","5","6","7","8","9","0",".","+/-"];
        var text;
        if( this.state.init ) {
            text = input + "";
        } else {
            text = this.state.text + input + "";
        }
        var cancelKeys = "Escape";
        var calcChar = [
            "+","-","X","*","=","/","Enter", "+/-"
        ];
        if(cancelKeys.indexOf(input) > -1 ) {
            this.setState({
                text : "",
                operate : "",
                formula : "",
                init : true
            })
        } else if( calcChar.indexOf(input) > -1 ) {
            this.operate(input);
        } else if(allow.indexOf(input) > -1) {
            if( this.state.operate === "") {
                this.setState({...this.state, text : text, init : false});
            } else {
                this.setState({...this.state, formula : this.state.formula + this.state.operate , operate : "" ,text : text, init : false});
            }
            
        }
        
    }
    componentDidMount(){
        var self = this;
        window.addEventListener("keydown", function(e){
            
            self.input(e.key);
        });
    }
    operate(input){
        var formula;
        var num = this.state.text;
        var sign = this.state.sign;
        var calc;
        if( input == "=" || input == "Enter" ) {
            if( this.state.text === "" || isNaN(this.state.text) || parseInt(this.state.text) == 0 ) num = 0;
            if( this.state.sign == "-") {
                num = "(" + this.state.sign + num + ")";
            }
            calc = this.state.formula + num;
            try{
                //alert(calc)
                this.setState({...this.state, formula : "", text : eval(calc), sign : "+"});
            } catch(e){
                alert(calc);
                throw e;
            }
            
        } else if( input == "+/-" ) {
            this.setState({...this.state, sign : this.state.sign == "+" ? "-" : "+"});
        }else {
            this.setState({...this.state, sign : "+",formula : this.state.formula + (this.state.sign == "-" ? "-" : "") + this.state.text,operate : input, text : ""});
        }
    }

    render (){

        var sort = [
            ["","","","Escape"],
            [7,8,9, "X"],
            [4,5,6, "-"],
            [1,2,3, "+"],
            ["+/-",0,".", "="]
        ];
        var buttons = sort.map( (line, lIdx)=>{
            return (
                <>
                <div className="ex-calculate-line" key={lIdx}>
                    {
                    line.map( (name, idx)=>{
                        return React.createElement(Button,{key : lIdx + "_" + idx ,name : name, className : "ex-calculate-button", onClick : this.buttonClick});
                    })
                    }
                </div>
                </>
            )
        });

        return (
            <div className="ex-calculate-box">
                <div className="ex-calculate-display">
                    <div className="ex-calculate-formula">{this.state.formula}{this.state.operate}</div>
                    <div className="ex-calculate-result">{this.state.sign === "-" ? "-" : ""}{this.state.text}</div>
                </div>
              {buttons}
            </div>
        );
    }
}

export default Calculate;