import React,{Component} from 'react';
import Name from './Name';
import Price from './Price';
import Description from './Description';

class Product extends Component{

    render() {
        return (   
                <tr>
                <td><Name name={this.props.name}/></td>
                <td>
                    <Price price={this.props.price}/>
                </td>
                <td><Description description={this.props.description}/></td>
                </tr>
        )
    }
}


export default Product;