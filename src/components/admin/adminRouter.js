import utils from '../../services/utils';
//admin home
import adminHome from './components/adminHome/adminHome';
//admin users
import adminUsers from './components/adminUsers/adminUsers';
//admin user
import adminUser from './components/adminUser/adminUser';
//admin new
import adminNew from './components/adminNew/adminNew';
var adminNewTemplate = require('./components/adminNew/adminNew.html');
//admin edit
import adminEdit from './components/adminEdit/adminEdit';
var adminEditTemplate = require('./components/adminEdit/adminEdit.html');
//admin edit password
import adminEditPassword from './components/adminEditPassword/adminEditPassword';
var adminEditPasswordTemplate = require('./components/adminEditPassword/adminEditPassword.html');
//admin books
import adminBooks from './components/adminBooks/adminBooks';
var adminBooksTemplate = require('./components/adminBooks/adminBooks.html');
//admin book
import adminBook from './components/adminBook/adminBook';
var adminBookTemplate = require('./components/adminBook/adminBook.html');
//admin authors
import adminAuthors from './components/adminAuthors/adminAuthors';
//admin author
import adminAuthor from './components/adminAuthor/adminAuthor';
//admin authorNew
import adminAuthorsNew from './components/adminAuthorsNew/adminAuthorsNew';
var adminAuthorsNewTemplate = require('./components/adminAuthorsNew/adminAuthorsNew.html');
//admin authorEdit
import adminAuthorEdit from './components/adminAuthorEdit/adminAuthorEdit';
var adminAuthorEditTemplate = require('./components/adminAuthorEdit/adminAuthorEdit.html');

const adminRouter = (oldhash,newhash,data) => {
	
	let user = data;
	let adminContainer = document.querySelector('#admin-container');
	
	let routes = container => {
			
		if(newhash === '#/admin/') {
			//ADMIN HOME
			adminHome(adminContainer, user)
			
		} else if(newhash === '#/admin/new') {
			//ADMIN EDIT
			utils.getTemplate(adminContainer, adminNewTemplate, adminNew)
			.then( controller => { controller(); });
			
		} else if(newhash === '#/admin/edit/') {
			//ADMIN EDIT
			utils.getTemplate(adminContainer, adminEditTemplate, adminEdit)
			.then( controller => { controller(user); });
			
		} else if(newhash === '#/admin/edit/password') {
			//ADMIN EDIT PASSWORD
			utils.getTemplate(adminContainer, adminEditPasswordTemplate, adminEditPassword)
			.then( controller => { controller(user); });

		} else if(newhash === '#/admin/users/') {
			//ADMIN USERS
			adminUsers(adminContainer);
			
		} else if(newhash.match(/#\/admin\/users\/[^\/]+$/)) {
			//ADMIN USER
			adminUser(adminContainer);
			
		} else if(newhash === '#/admin/books/') {
			//ADMIN BOOKS
			utils.getTemplate(adminContainer, adminBooksTemplate, adminBooks)
			.then( controller => { controller(); });
			
		} else if(newhash.match(/#\/admin\/books\/[^\/]+$/)) {
			//ADMIN BOOK
			utils.getTemplate(adminContainer, adminBookTemplate, adminBook)
			.then( controller => { controller(); });
			
		} else if(newhash === '#/admin/authors/') {
			//ADMIN AUTHORS
			adminAuthors(adminContainer);
			
		} else if(newhash === '#/admin/authors/new') {
			//ADMIN AUTHORS NEW
			utils.getTemplate(adminContainer, adminAuthorsNewTemplate, adminAuthorsNew)
			.then( controller => { controller(); });
			
		} else if(newhash.match(/#\/admin\/authors\/[^\/]+\/edit$/)) {
			//ADMIN AUTHORS EDIT
			utils.getTemplate(adminContainer, adminAuthorEditTemplate, adminAuthorEdit)
			.then( controller => { controller(); });
			
		} else if(newhash.match(/#\/admin\/authors\/[^\/]+$/)) {
			//ADMIN AUTHOR
			adminAuthor(adminContainer);
				
		} else {
			//FALLBACK
			location.hash = '#/admin/';
		}
	}
	
	return routes(adminContainer);
	
}

export default adminRouter;
