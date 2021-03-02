import React, {Component} from 'react'
import axios from 'axios';
import './puzzle.css';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleClick = this.handleClick.bind(this);
        this.ref = React.createRef();
    }

    componentDidMount(){
        if( this.props.style != null && this.props.style.backgroundPosition != null ) {
            this.ref.current.style.backgroundPosition = this.props.style.backgroundPosition;
            this.ref.current.style.backgroundImage = this.props.style.backgroundImage;
        }
    }

    handleClick(e){
        this.props.onClick(e, this);
    }

    componentDidUpdate(props, state){
        this.ref.current.style.backgroundPosition = null;
        if( this.props.style != null && this.props.style.backgroundPosition != null ) {
            this.ref.current.style.backgroundPosition = this.props.style.backgroundPosition;
        }
        this.ref.current.style.backgroundImage = null;
        if( this.props.style != null && this.props.style.backgroundPosition != null ) {
            this.ref.current.style.backgroundImage = this.props.style.backgroundImage;
        }
    }
    render(){

        return(
        
                <div ref={this.ref} onClick={this.handleClick} className={this.props.className}>{this.state.name || this.props.name}</div>
            
        )
    }
}

Button.defaultProps = {
    name : "Button",
    className : "ex-button"
}


class Puzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empty : [this.props.limit.line-1, this.props.limit.cell-1],
            init : false
        };
        this.loadMap = this.loadMap.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.getRandom = this.getRandom.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.getMapIdx   = this.getMapIdx.bind(this);
    }


    componentDidMount(){
        axios.get("/images.jpg", {
            responseType: 'arraybuffer'
        })
            .then(response => new Buffer(response.data, 'binary').toString('base64'))
            .then(img=>{
                this.img = "data:image/plain;base64,"+ img.toString("base64");
                console.log(this.img);
                this.loadMap();
            })
            .catch( (res)=>{
                console.log(res);
            });
        
    }


    suffle(map){
        var random1 = this.getRandom();
        var random2 = this.getRandom();
        try{
        var tmp = map[random1[0]][random1[1]];
            map[random1[0]][random1[1]] = map[random2[0]][random2[1]];
        } catch(e) {
            alert(random1);
            alert(random2);
            throw e;
        }
        map[random2[0]][random2[1]] = tmp;

        
    }

    getRandom(){
        var line = Math.round(Math.random() * (this.props.limit.line-1) );
        var cell = Math.round(Math.random() * (this.props.limit.cell-1) );

        var info = [];
        info[0] = line;
        info[1] = cell;
        if ( info[0] == this.state.empty[0] && info[1] == this.state.empty[1] ) {
            return this.getRandom();
        }
        return info;
    }

    getMapIdx(name) {
        name = name + "";
        var cell;
        for(var i=0; i<this.props.limit.line; i++) {
            for(var j=0; j<this.props.limit.cell; j++) {
                if( ( this.state.map[i][j] + "" )=== name ) {
                    return [i,j];
                }
            }
        }
        return null;
    }

    buttonClick(e, comp) {
        var line = comp.props.line;
        var cell = comp.props.cell;
        
        var emptName = ( this.state.empty[0] * this.props.limit.line ) + this.state.empty[1] + 1;
        
        var emptyLine = this.state.empty[0];
        var emptyCell = this.state.empty[1];
        var pos = this.getMapIdx(comp.props.name);
        var posNum = ( pos[0] * this.props.limit.line ) + pos[1] + 1;
        var v = parseInt(emptName) - parseInt(posNum);
        
        var move = getMove(v);
        if( move == null ) {
            return false;
        }
        
        switch(move) {
            case "UP" :
                if( ( posNum - this.props.limit.cell ) < 1 ) return false;
                break;
            case "DOWN" :
                if( ( posNum + this.props.limit.cell ) > this.props.limit.line * this.props.limit.cell  ) return false;
                break;
            case "LEFT" :
                if( pos[1] == 0 ) return false;
                break;
            case "RIGHT" :
                if( pos[1] == this.props.limit.cell-1 ) return false;
                break;
        }

        var map = this.state.map;

        map[emptyLine][emptyCell] = parseInt(comp.props.name);
        map[line][cell] = "";
        this.setState({...this.state, empty : [line, cell], map : map});
        

        function getMove(v) {
            var up = -4;
            var down = 4;
            var left = -1
            var right = 1;
            if( v == up ) return "UP";
            if( v == down ) return "DOWN";
            if( v == left ) return "LEFT";
            if( v == right ) return "RIGHT";
            return null;
        }
    }

    

    loadMap(param){
        var cnt = 1;
        var cells = this.props.limit.cell;
        var lines = this.props.limit.line;
        var map = [];
        if( param == null ) {//Default
            for(var l=0; l<lines; l++) { //마지막 값 공백
                
                map.push([]);
                for(var c=0; c<cells; c++) {
                    if( l == lines-1 && c == cells-1) {
                        map[l].push("");
                    } else {
                        map[l].push(cnt++)
                    }
                    
                    
                }

            }
        }
        
        for(var i=0; i<50; i++) {
            this.suffle(map);
        }
        
        this.setState({...this.state, map : map, init : true});
    }

    getPosition(num) {
        num = parseInt(num);
        if(isNaN(num)) return null;
        
        var rs = [0, 0];
        var cnt = 0;

        var addX = 100 / (parseInt(this.props.limit.cell)) ;
        var addY = 100 / (parseInt(this.props.limit.line)) ;

        var std = this.props.limit.cell;
        while(true) {
            if( ( num - std ) > 0 ) {
                num -= std;
                cnt++;
            } else {
                break;
            }
        }
        
        rs = [cnt * addY, num * addX];
        return rs;
    }

    render(){
        var style = {};
        var x = 0;
        var y = 0;
        var position;

        var isComplete = true;
        var cur = 1;

        var img = this.img
        var buttons = this.state.map == null ? [] : this.state.map.map( (line, lIdx)=>{
            
            return (
                <>
                <div className="ex-puzzle-line" key={lIdx}>
                    {
                        line.map( (name, idx)=>{
                            if( name !== "" ) {
                                
                                position = this.getPosition(name);
                            }
                            if( position != null ) {
                                y = position[0];
                                x = position[1];
                            }
                            
                            style = {backgroundPosition : x + "% " + y + "%", backgroundImage : 'url(' + img + ')'};
                            //alert(name + " : " + x + ", " + y)
                            //style = {};
                            if( name !== "" && cur !== parseInt(name) ) isComplete = false;
                            cur++;
                            if( name === "" ) {
                                return React.createElement(Button,{style : {}, line : lIdx, cell : idx,key : lIdx + "_" + idx ,name : name, className : "ex-puzzle-button-empty", onClick : this.buttonClick});
                            } else {
                                return React.createElement(Button,{style : style, line : lIdx, cell : idx, key : lIdx + "_" + idx ,name : name, className : "ex-puzzle-button", onClick : this.buttonClick});
                            }
                            
                        })
                    }
                </div>
                </>
            )
            
        });
        if( this.state.init && isComplete ) alert("Completed!");

        return (
            
            <div className="ex-puzzle-box">
                {buttons}
            </div>
            
        );
    }
}

Puzzle.defaultProps = {
    limit : {
        cell : 4,
        line : 4
    }
}

export default Puzzle;