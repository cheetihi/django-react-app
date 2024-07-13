// frontend/src/components/Modal.js

import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Alert
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      error: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  handleSave = () => {
    const { title, description } = this.state.activeItem;
    if (title && description) {
      this.props.onSave(this.state.activeItem);
    } else {
      this.setState({ error: "Title and Description are required." });
    }
  };

  render() {
    const { toggle } = this.props;
    const { title, description, completed } = this.state.activeItem;
    const { error } = this.state;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Task Details </ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
                placeholder="Enter Task Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                value={description}
                onChange={this.handleChange}
                placeholder="Enter Task Description"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="completed"
                  checked={completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.handleSave}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
