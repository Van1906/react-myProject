import React, {Component} from 'react';
import ShowCount from './ShowCount';
import ChangeCount from './ChangeCount';
import { connect } from 'react-redux';

class Counter extends Component {

    render(){
        return(
            <div>
                <ShowCount />
                <ChangeCount />
                <button
                onClick = {()=>this.props.onResetValue()}
                >
                Reset 
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        onResetValue: ()=>{
            dispatch({type: 'RESET_VALUE'})
        }
    };
};

export default connect(null, mapDispatchToProps)(Counter);