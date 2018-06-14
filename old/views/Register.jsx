import React from 'react';
let DefaultLayout = require('./layouts/default');

const Register = React.createClass({
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <section className="column is-offset-6 is-4">
          <center>
            <h1>Register</h1>
            <p>Enter your details</p>
            <table>
              <form action="/register" method="post">
                <tr>
                  <td>Username</td>
                  <td><input type="text" name="username"/></td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td><input type="password" name="pwd"/></td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td><input type="text" name="fullname"/></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><input type="email" name="email"/></td>
                </tr>
                <tr>
                  <td>Date of birth:</td>
                  <td> <input type="date" name="dob"/></td>
                </tr>
                <tr>
                  <td align="center" colspan="2"><input type="submit" value="Register" name="regOrLogin" class="class1"/></td>
                  <td></td>
                </tr>
              </form>
            </table>
            <td align="center" colspan="2"><a href='/' ><button>Login</button></a></td>
          </center>
        </section>
      </DefaultLayout>
    )
  },
});

export default Register
