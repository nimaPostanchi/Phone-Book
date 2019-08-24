import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { Table, Container, Button } from 'reactstrap';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            items: [],
            error: null,
            searchTerm: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            searchTerm: event.target.value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const item = this.state.searchTerm;

        await fetch(`/api/entityLastName/${item}`)
            .then(response => response.json())
            .then(data => {
                    this.setState({
                        items: data,
                        isLoading: false,
                    });
                    console.log(this.state.searchTerm)
                }
            )
        this.props.history.push('/');
    }

    handleEdit() {
        window.localStorage.setItem("userId", this.items.id);
        this.props.history.push('/edit/');
    }

    render() {
        const {items} = this.state;
        return (
            <Container>
                <h1 style={{marginBottom: 30}}>PHONE BOOK</h1>
                <div>
                    <Button color="success" tag={Link} to="/add">Add Phone item</Button>
                </div>
                <form onSubmit={this.handleSubmit} style={{marginBottom: 20, marginTop:20}}>
                    <input type="text" name="searchTerm" id="searchTerm" placeholder="Search by last name"
                           onChange={this.handleChange} style={{width: 400, marginRight: 15}}/>
                    <Button color="primary" type="submit">Search</Button>
                </form>
                <Table bordered hover>
                    <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Phone Number</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map(item =>
                            <tr>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.phoneNumber}</td>
                                <td><Link to={"/edit/" + item.id}>Edit</Link></td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </Container>
        )
    }
}

const styles = {
    container: {

        flex: 0.6,
        flexDirection:'column',
        justifyContent:'center',
    },

};