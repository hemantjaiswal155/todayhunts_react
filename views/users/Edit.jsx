import React from 'react';
let DefaultLayout = require('../layouts/default');

const EditUser = React.createClass({
  	getInitialState() {
    	return { error: false }
  	},

  	render() {
	    return (
	    	<DefaultLayout title={this.props.title}>
		      	<section className="column is-offset-6 is-4">
		        	<center>
		          		<h1>Edit User</h1>
		          		<p>Enter details</p>
		          		<table>
		            		<form action="/user/edit/{id}" method="post">
		              			<tr>
					                <td>Username</td>
					                <td><input type="text" name="username" id="username" value="{username}"/></td>
								</tr>
								<tr>
									<td>Password</td>
									<td><input type="password" name="pwd" id="pwd" value="{pwd}"/></td>
								</tr>
								<tr>
									<td>Name</td>
									<td><input type="text" name="fullname" id="fullname" value="{fullname}"/></td>
								</tr>
								<tr>
									<td>Email</td>
									<td><input type="email" name="email" id="email" value="{email}"/></td>
								</tr>
								<tr>
									<td>Date of birth:</td>
									<td> <input type="date" name="dob" id="dob" value="{dob}"/></td>
								</tr>
								<tr>
									<td align="center" colspan="2"><input type="submit" value="Edit" class="class1"/><a href="/user">Users List</a></td>
									<td></td>
								</tr>
		            		</form>
		          		</table>
		        	</center>
		      	</section>
      		</DefaultLayout>
	    )
  	},
});

export default EditUser