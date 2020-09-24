import React from 'react';

function formFooter(props) {
    const info = {
        text : 'Click submit button to confirm form',
        getInfo:function() {
            const getText = () => {
                return this.text;
            }
            return getText();
        }
    }
    return <p>{info.getInfo()}</p>
}

export default formFooter;