import React, { Component } from 'react';
import './button.css'

export class Button extends Component {
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

export default Button;