//localStore.js
const localStore = {
	
	setBkmrk: (bkId, bkPath, bkmrk) => {
		let bkmrks = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for bkmrks array
			if(localStorage.getItem('bkmrks')) {
				bkmrks = JSON.parse(localStorage.getItem('bkmrks'));
				//check for bk.id
				let item, index;
				for(let i=0; i<bkmrks.length; i++) {
					if(bkmrks[i].bkId===bkId && bkmrks[i].bkPath===bkPath) {
						item=bkmrks[i];
						index=i;
						break;
					}
				}
				if(item) {
					if(bkmrk.sectionId==='cover') {
						bkmrks.splice(index,1);
					} else {
						item.bkmrk = bkmrk;
					}
				} else {
					bkmrks.push({ bkId: bkId, bkPath: bkPath, bkmrk: bkmrk });
				}
			} else {
				if(bkmrk.sectionId!=='cover') {
					bkmrks.push({ bkId: bkId, bkPath, bkPath, bkmrk: bkmrk });
				}
			}
			localStorage.setItem('bkmrks', JSON.stringify(bkmrks));
		}
	},
	
	removeBkmrk: (bkId, bkPath) => {
		let bkmrks = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for bkmrks array
			if(localStorage.getItem('bkmrks')) {
				bkmrks = JSON.parse(localStorage.getItem('bkmrks'));
				//check for bk.id
				let index;
				for(let i=0; i<bkmrks.length; i++) {
					if(bkmrks[i].bkId===bkId && bkmrks[i].bkPath===bkPath) {
						index=i;
						break;
					}
				}
				//remove item
				if(index!==undefined) {
					bkmrks.splice(index,1);
					localStorage.setItem('bkmrks', JSON.stringify(bkmrks));
				}
			}
		}
	},
	
	getBkmrk : (bkId, bkPath)  => {
		let bkmrks = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for bkmrks array
			if(localStorage.getItem('bkmrks')) {
				bkmrks = JSON.parse(localStorage.getItem('bkmrks'));
				//check for bk.id
				let item = bkmrks.filter(function(o) { return o.bkId===bkId && o.bkPath===bkPath})[0];
				if(item) {
					return item.bkmrk;
				}
			}
		}
	},
	
	setFontSize: (device, size) => {
		let fSizes = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for fSizes array
			if(localStorage.getItem('fSizes')) {
				fSizes = JSON.parse(localStorage.getItem('fSizes'));
				//check for bk.id
				let item;
				for(let i=0; i<fSizes.length; i++) {
					if(fSizes[i].device===device) {
						item=fSizes[i];
						break;
					}
				}
				if(item) {
					item.size = size;
				} else {
					fSizes.push({ device: device, size: size });
				}
			} else {
				fSizes.push({ device: device, size: size });
			}
			localStorage.setItem('fSizes', JSON.stringify(fSizes));
		}
	},
	
	getFontSize: device => {
		let fSizes = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for bkmrks array
			if(localStorage.getItem('fSizes')) {
				fSizes = JSON.parse(localStorage.getItem('fSizes'));
				//check for bk.id
				let item = fSizes.filter(function(o) { return o.device===device})[0];
				if(item) {
					return item.size;
				}
			}
		}
	},
	
	setUserAgent: u => {
		let userAgent = '';
		if (typeof(Storage) !== "undefined") {
			//check localStorage for userAgent
			if(localStorage.getItem('userAgent')) {
				userAgent = JSON.parse(localStorage.getItem('userAgent'));
				userAgent = u;
			} else {
				userAgent = u;
			}
			localStorage.setItem('userAgent', JSON.stringify(userAgent));
		}
		
	},
	
	getUserAgent: () => {
		let userAgent = '';
		if (typeof(Storage) !== "undefined") {
			//check localStorage for userAgent
			if(localStorage.getItem('userAgent')) {
				userAgent = JSON.parse(localStorage.getItem('userAgent'));
				return userAgent;
			}
		}
	},
	
	setTableInfos: i => {
		if(isNaN(i.tableInfos.totalPages) || i.tableInfos.totalPages===0) {
			return; 
		}
		let tableInfos = [];
		if (typeof(Storage) !== "undefined") {
			//clean out old storage
			if(localStorage.getItem('tables')) {
				localStorage.removeItem('tables')
			}
			//check localStorage for tableInfos
			if(localStorage.getItem('tableInfos')) {
				tableInfos = JSON.parse(localStorage.getItem('tableInfos'));		
				let item = tableInfos.filter(function(o) { return o.id===i.id &&
																  o.path===i.path &&
																  o.dim===i.dim &&
														          o.font===i.font &&
														          o.fontSize===i.fontSize})[0];

			   if(!item) {
				   //max items
				   if(tableInfos.length===41) {
					   tableInfos.shift();
				   }
				   tableInfos.push(i);
			   }
			} else {
				tableInfos.push(i);
			}
			localStorage.setItem('tableInfos', JSON.stringify(tableInfos));
		}
	},
	
	getTableInfos: i => {
		let tableInfos = [];
		if(typeof(Storage) !== "undefined") {
			//clean out old storage
			if(localStorage.getItem('tables')) {
				localStorage.removeItem('tables');
			}
			if(localStorage.getItem('tableInfos')) {
				tableInfos = JSON.parse(localStorage.getItem('tableInfos'));
				let item = tableInfos.filter(function(o) { return o.id===i.id &&
																  o.path===i.path &&
																  o.dim===i.dim &&
																  o.font===i.font &&
																  o.fontSize===i.fontSize})[0];
			   if(item) {
				   return item.tableInfos;
			   } 
		   }
		}
	},
	
	removeTableInfos: () => {
		if(typeof(Storage) !== "undefined") {
			if(localStorage.getItem('tableInfos')) {
				localStorage.removeItem('tableInfos');
			}
		}
	}
}

export default localStore;
