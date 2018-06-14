import React from 'react';
let DefaultLayout = require('../layouts/default');

const UsersList = React.createClass({
  getInitialState() {
    return { error: false }
  },

  render() {
    return (
      <DefaultLayout title={this.props.title}>
      	<section className="column is-offset-6 is-4">
        	<div>Click <a href="/">here</a> to logout.</div>
        	<div><a href="/user/add">Add User</a></div>
        	<p>Welcome</p>
        	<table border="1">
          		<tr><th>Name</th><th>Username</th><th>Email</th><th>Action</th></tr>
          		{this.props.data.map(function(dataValue){
            		return <tr><td>{dataValue.fullname}</td><td>{dataValue.username}</td><td>{dataValue.email}</td>
            			<td>
      							<div>
      								<a href='/user/edit/{dataValue.id}'>Edit</a> &nbsp;
      								<a href='/user/delete/{dataValue.id}'>Delete</a>
                      <form method="post" action="/user/delete/5">
                          <input type="hidden" name="id" value="{dataValue.id}" />
                          <input type="submit" name="delete" value='Delete' onClick="return confirm('Are you sure you want to delete?')" />
                          <input type="hidden" name="_method" value="DELETE" />
                      </form>
      							</div>
      						</td>
            		</tr>;
          		})}
        	</table>
      	</section>
      </DefaultLayout>
    )
  },
})

export default UsersList