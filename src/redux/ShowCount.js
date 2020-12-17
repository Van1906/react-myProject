import React, {Component} from 'react';
import {connect} from 'react-redux';

class ShowCount extends Component {
    render(){
        const {value} = this.props;
        return(
            <p>{value}</p>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        value: state.count
    };
};

export default connect(mapStateToProps, null)(ShowCount);