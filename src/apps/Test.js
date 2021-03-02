import React,{Component} from 'react';


class Test extends Component {

    render() {
        var style = {
            width : "50px",
            height : "50px",
            backgroundColor : "#ddd"
        }
        return(
            <div style={style}  className="test">Test</div>
        )
    }
}


export default Test;