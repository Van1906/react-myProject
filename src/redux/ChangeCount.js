import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChangeCount extends Component {

    render(){
        return(
            <div>
                <button
                onClick = {()=>this.props.onChangeValue(1)}
                >
                + 1  
                </button>

                <button
                onClick = {()=>this.props.onChangeValue(-10)}
                >
                - 10 
                </button>

                <button
                onClick = {()=>this.props.onChangeValue(5)}
                >
                + 5 
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        onChangeValue: (val)=>{
            dispatch({type: 'CHANGE_VALUE', value: val})
        }
    };
};

export default connect(null, mapDispatchToProps)(ChangeCount);