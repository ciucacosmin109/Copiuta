import React from 'react';

import { Button } from 'react-bootstrap';
import { Trash, PersonPlus } from 'react-bootstrap-icons';

import './StudentElement.css';

class StudentElement extends React.Component {
    render() {
        return (
            <div className="NoteElement">
                <Button disabled variant="link" size="sm" >{this.props.student.firstName + this.props.student.lastName}</Button>

                {this.props.onDelete && !this.props.readOnly ?
                    <Button className="button-right" variant="link" size="sm" onClick={this.props.onDelete}><Trash color="#F54242" /></Button> : <></>
                }
                {this.props.onAdd && !this.props.readOnly ?
                    <Button className="button-right" variant="link" size="sm" onClick={this.props.onAdd}><PersonPlus color="green" /></Button> : <></>
                }
            </div >
        );
    }
}

export default StudentElement; 