import React from 'react';
import Notes from '../data/Notes';
import Tags from '../data/Tags';

import { Editor as TinyMce } from '@tinymce/tinymce-react';
import { Form, Button, Spinner, Col, Alert } from 'react-bootstrap';

import './NoteEditor.css';

// Props:
// - editable (true -> for update and create, false -> for readonly)
// - onSaveClicked(note) -> REQUIRED !
//
// - noteId (required for update and readonly)
// - onNoteFetched({ok, result, message}) -> REQUIRED ! -> will set the loading to false
//
// - error
// - loading
class NoteEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',

            tags: '',
        };
    }
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleEditorChange = (content, editor) => {
        this.setState({ content });
    }

    handleSubmit = e => {
        e.preventDefault();

        // Go back if it is just a readonly form
        if (!this.props.editable) {
            if (this.props.onSaveClicked) {
                this.props.onSaveClicked(null);
            }
            return;
        }

        // Stop here if the form is empty or invalid
        const { title, content } = this.state;
        if (!title || title.length === 0) {
            return;
        }
        if (this.state.tags.length > 0 && !/^[a-zA-Z0-9\s]+$/.test(this.state.tags)) {
            return;
        }

        // Create the note object
        const note = {
            title: title,
            content: content,
        };
        if (this.props.noteId) {
            note.id = this.props.noteId;
        }

        // Create the tag list
        let tags = this.state.tags.split(" ").filter(x => x.length > 0);

        // Call the callback
        if (this.props.onSaveClicked) {
            this.props.onSaveClicked(note, tags);
        }
    }

    async componentDidMount() {
        if (!this.props.noteId) return; // This is an add

        // Fetch the note from the API
        const res = await Notes.getNote(this.props.noteId);
        if (!res.ok || !res.result) {
            return
        }

        // Tags
        const res2 = await Tags.getAllTags(this.props.noteId);
        if (!res2.ok) {
            return;
        }

        const note = res.result;
        this.setState({ title: note.title, content: note.content, tags: res2.result.map(x => x.name).join(" ") });

        if (this.props.onNoteFetched) {
            this.props.onNoteFetched(res);
        }
    }

    render() {
        return (
            <div id="Marius2">

                <Form className="note-form" onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control
                                name="title"
                                value={this.state.title}
                                readOnly={!this.props.editable}
                                onChange={this.handleChange}

                                type="text"
                                placeholder="Enter a title for your note"
                                disabled={!this.props.editable || this.props.loading}

                                isInvalid={this.state.title == null || !(this.state.title.length > 0)}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={3}>
                            <Form.Control
                                name="tags"
                                value={this.state.tags}
                                readOnly={!this.props.editable}
                                onChange={this.handleChange}

                                type="text"
                                placeholder="Enter tags separated by space"
                                disabled={!this.props.editable || this.props.loading}

                                isInvalid={this.state.tags.length > 0 && !/^[a-zA-Z0-9\s]+$/.test(this.state.tags)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs="auto">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={this.props.loading ? true : false} >

                                {this.props.loading ?
                                    <>
                                        <Spinner
                                            animation="border"
                                            size="sm"
                                        />
                                        {' Loading ...'}
                                    </>
                                    : (this.props.editable ? 'Save' : 'Back')
                                }
                            </Button>
                        </Form.Group>
                    </Form.Row>

                    {this.props.error ?
                        <Alert style={{ margin: 0 }} variant='danger'>{this.props.error}</Alert>
                        : <></>
                    }

                    <TinyMce
                        className="text-editor"
                        disabled={!this.props.editable}
                        apiKey="7atcogyb8kct4rdja6x79f3i8cks6o2uxuggklo3pynla4la"
                        init={{
                            height: "100%",
                            menubar: this.props.editable ? true : false,
                            statusbar: true,
                            resize: false,
                            branding: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                                'codesample emoticons export'
                            ],
                            toolbar: this.props.editable ?
                                'undo redo | fontselect fontsizeselect forecolor backcolor | ' +
                                'bold italic underline | removeformat | ' +
                                'bullist numlist | table codesample emoticons | ' +
                                'alignleft aligncenter alignright alignjustify | outdent indent | ' +
                                'help' : false,
                        }}
                        name="content"
                        value={this.state.content}
                        onEditorChange={this.handleEditorChange}
                    />
                </Form>
            </div>
        );
    }
}

export default NoteEditor; 