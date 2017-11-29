//localStore.js
const localStore = {
	
	pushBkmrk: (bkId, bkmrk) => {
		let bkmrks = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for bkmrks array
			if(localStorage.getItem('bkmrks')) {
				bkmrks = JSON.parse(localStorage.getItem('bkmrks'));
				//check for bk.id
				let b;
				for(let i=0; i<bkmrks.length; i++) {
					if(bkmrks[i].bkId===bkId) {
						b=bkmrks[i];
						break;
					}
				}
				if(b) {
					b.bkmrk = bkmrk;
				} else {
					bkmrks.push({ bkId: bkId, bkmrk: bkmrk });
				}
			} else {
				bkmrks.push({ bkId: bkId, bkmrk: bkmrk });
			}
			localStorage.setItem('bkmrks', JSON.stringify(bkmrks));
		}
	},
	
	getBkmrk : (bkId) => {
		let bkmrks = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for bkmrks array
			if(localStorage.getItem('bkmrks')) {
				bkmrks = JSON.parse(localStorage.getItem('bkmrks'));
				//check for bk.id
				let item = bkmrks.filter(function(o) { return o.bkId===bkId})[0];
				if(item) {
					return item.bkmrk;
				}
			}
		}
	}
}

export default localStore;
