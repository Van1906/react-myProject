import React,{Component} from 'react';


class Price extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productPrice: props.price,
            currency: '$'
        }
    }



    handleClick = () => {
        if(this.state.currency === '$') {
            this.setState({
                productPrice: this.state.productPrice*487,
                currency: '֏'
            })
        } else {
            this.setState({
                productPrice: this.state.productPrice/487,
                currency: '$'
            })
        }
    };


    render() {
        return <div>
                    <span>{this.state.productPrice} {this.state.currency}</span>
                    <button onClick={this.handleClick}>Change the currency</button>
                </div>

    }
}

export default Price;