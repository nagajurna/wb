//dataStore.js
const dataStore = {
	//data
	store: {},
	
	setData: (prop, data) => {
		dataStore.store[prop] = data;
		console.log(dataStore.store);
	},
	
	getData : () => {
		return dataStore.store;
	}
	
}

export default dataStore;
