//dataStore.js
const dataStore = {
	
	store: {},
	
	setData: (collection, data) => {
		dataStore.store[collection] = data;
	},
	
	pushData: (collection, data) => {
		if(!dataStore[collection]) {
			dataStore.store[collection] = data;
		} else {
			dataStore[collection].push(data);
		}
	},
	
	getData : (collection, id) => {
		if(collection && id) {
			let array = dataStore.store[collection];
			let itemId = id;
			let item;
			for(let i=0; i<array.length; i++) {
			  if(array[i].id===itemId) {
				 item = array[i];
				 break;
			  }
			}
			return item;
		} else if(collection && !id) {
			return dataStore.store[collection];
		} else if(!collection && !id) {
			return dataStore.store;
		}
	}
	
	
}

export default dataStore;
