import React, {Component} from 'react';
import './App.css';
import { Container, Button, Form, Label, Input } from 'reactstrap';


export default class EditEntity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`/api/entity/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    item: data,
                })
            )
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/editEntity/' + this.props.match.params.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/');
    }

    render() {
        const {item} = this.state;
        return (
            <Container>
                <h1 style={{marginBottom: 30}}>Edit {item.firstName} {item.lastName}</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Label>First name</Label>
                    <Input type="text" name="firstName" id="firstName" value={item.firstName}
                           onChange={this.handleChange} required/>
                    <Label>Last name</Label>
                    <Input type="text" name="lastName" id="lastName" value={item.lastName}
                           onChange={this.handleChange} required/>
                    <Label>Phone number</Label>
                    <Input type="tel" name="phoneNumber" id="phoneNumber" value={item.phoneNumber}
                           onChange={this.handleChange} pattern="^\+?([0-9]{2})\)?[\x20]+([0-9]{2})+[\x20]([0-9]{6})$"
                           required/>
                    <br/>
                    <Button color="primary" type="submit">Update</Button>
                </Form>
            </Container>
        )
    }
}
