//UTILS
import utils from '../../services/utils';
//CONTROLLERS
//admin home
import adminHome from './components/adminHome/adminHome';
//admin users
import adminUsers from './components/adminUsers/adminUsers';
//admin user
import adminUser from './components/adminUser/adminUser';
//admin new
import adminNew from './components/adminNew/adminNew';
//admin edit
import adminEdit from './components/adminEdit/adminEdit';
//admin edit password
import adminEditPassword from './components/adminEditPassword/adminEditPassword';
//admin books
import adminBooks from './components/adminBooks/adminBooks';
//admin book
import adminBook from './components/adminBook/adminBook';
//admin booksNew
import adminBooksNew from './components/adminBooksNew/adminBooksNew';
//admin booksEdit
import adminBookEdit from './components/adminBookEdit/adminBookEdit';
//admin authors
import adminAuthors from './components/adminAuthors/adminAuthors';
//admin author
import adminAuthor from './components/adminAuthor/adminAuthor';
//admin authorsNew
import adminAuthorsNew from './components/adminAuthorsNew/adminAuthorsNew';
//admin authorEdit
import adminAuthorEdit from './components/adminAuthorEdit/adminAuthorEdit';

const adminRouter = (oldhash, newhash, data) => {
	
	let user = data;
	let adminContainer = document.querySelector('#admin-container');
	
	let routes = container => {
			
		if(newhash === '#/admin/') {
			//ADMIN HOME
			adminHome(container, user)
			
		} else if(newhash === '#/admin/new') {
			//ADMIN NEW
			adminNew(container)
			
		} else if(newhash === '#/admin/edit/') {
			//ADMIN EDIT
			adminEdit(container, user);
			
		} else if(newhash === '#/admin/edit/password') {
			//ADMIN EDIT PASSWORD
			adminEditPassword(container, user)

		} else if(newhash === '#/admin/users/') {
			//ADMIN USERS
			adminUsers(container);
			
		} else if(newhash.match(/#\/admin\/users\/[^\/]+$/)) {
			//ADMIN USER
			adminUser(container);
			
		} else if(newhash === '#/admin/books/') {
			//ADMIN BOOKS
			adminBooks(container);
			
		} else if(newhash === '#/admin/books/new') {
			//ADMIN BOOKS NEW
			adminBooksNew(container);
			
		} else if(newhash.match(/#\/admin\/books\/[^\/]+\/edit$/)) {
			//ADMIN BOOK EDIT
			adminBookEdit(container);
			
		} else if(newhash.match(/#\/admin\/books\/[^\/]+$/)) {
			//ADMIN BOOK
			adminBook(container);
			
		} else if(newhash === '#/admin/authors/') {
			//ADMIN AUTHORS
			adminAuthors(container);
			
		} else if(newhash === '#/admin/authors/new') {
			//ADMIN AUTHORS NEW
			adminAuthorsNew(container);
			
		} else if(newhash.match(/#\/admin\/authors\/[^\/]+\/edit$/)) {
			//ADMIN AUTHORS EDIT
			adminAuthorEdit(container);
			
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
