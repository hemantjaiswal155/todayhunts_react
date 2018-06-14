import React from 'react';
let DefaultLayout = require('./layouts/default');

const Login = React.createClass({
  getInitialState() {
    return { error: false }
  },

  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <section className="column is-offset-6 is-4">
          <center>
            <h1> Todayhunts Login </h1>
            <p>Enter your username and password</p>
            <table>
              <form action="/login" method="post">
                <tr>
                  <td>Username</td>
                  <td><input type="text" name="username"/></td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td><input type="password" name="pwd"/></td>
                </tr>
                <tr>
                  <td colspan="2" align="center"><input type="submit" value="Login" name="regOrLogin" class="class1"/></td>
                </tr>
              </form>
            </table>
            <td align="center" colspan="2"><a href='/register' ><button>Register</button></a></td>
          </center>
        </section>
      </DefaultLayout>
    )
  },
})

export default Login
