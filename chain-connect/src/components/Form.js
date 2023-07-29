import React from 'react';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            age: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // Change the corresponding state variable to the value of the input field
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Chain Connect</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Firstname:
                        <input type="text" id="firstname" value={this.state.firstname} onChange={this.handleChange} />
                        <br/>
                    </label>
                    <label>
                        Lastname:
                        <input type="text" id="lastname" value={this.state.lastname} onChange={this.handleChange} />
                        <br/>
                    </label>
                    <label>
                        Email:
                        <input type="text" id="email" value={this.state.email} onChange={this.handleChange} />
                        <br/>
                    </label>
                    <label>
                        Age:
                        <input type="number" id="age" value={this.state.age} onChange={this.handleChange} />
                        <br/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export { Form };