import React from "react";

import "./TagViewer.css";

import { Form, Button, Card, Collapse } from "react-bootstrap";
import { CaretDown, CaretUp } from 'react-bootstrap-icons';
import NoteList from "./NoteList";

class TagViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        };
    }
    toggleCollapse = () => this.setState({ open: !this.state.open });

    render() {
        return (
            <div className="TagViewer">
                <Form.Label className="label-curs">{this.props.tagName}</Form.Label>

                <Card size="sm">
                    <Card.Header onClick={this.toggleCollapse}>
                        <Button variant="link" size="sm" onClick={this.toggleCollapse}>
                            {this.state.open ? <CaretUp color="gray" /> : <CaretDown color="gray" />}
                        </Button>
                    </Card.Header>
                    <Collapse in={this.state.open}>
                        <Card.Body>
                            <NoteList tagName={this.props.tagName} />
                        </Card.Body>
                    </Collapse>
                </Card>

            </div>
        );
    }
}
export default TagViewer;
