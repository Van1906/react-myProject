import React from 'react';

function form(props) {
    return (
        <form>
            <input type="text" placeholder={props.name}/><br/>
            <input type="password" placeholder='Password'/><br/>
            <button type='submit'>Submit</button>
        </form>
    );
}

export default form;