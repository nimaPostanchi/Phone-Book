import React, {Component} from 'react';
import './App.css';
import { Container, Button, Form, Label, Input } from 'reactstrap';


export default class AddPhone extends Component {

    emptyItem = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        fetch('/api/updateEntity', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/');
    }

    render() {
        return (
            <Container>
                <h1 style={{marginBottom: 30}}>Add Phone item</h1>
                <form onSubmit={this.handleSubmit}>
                    <Label>First name</Label>
                    <Input type="text" name="firstName" id="firstName"
                           onChange={this.handleChange} required/>
                    <Label>Last name</Label>
                    <Input type="text" name="lastName" id="lastName"
                           onChange={this.handleChange} required/>
                    <Label>Phone number</Label>
                    <Input type="tel" name="phoneNumber" id="phoneNumber"
                           onChange={this.handleChange}
                           pattern="^\+?([0-9]{2})\)?[\x20]+([0-9]{2})+[\x20]([0-9]{6})$" required/>
                    <br/>
                    <Button color="success" type="submit">Save</Button>
                </form>
            </Container>
        )
    }
}
