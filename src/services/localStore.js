//localStore.js
const localStore = {
	
	setBkmrk: (bkId, bkmrk) => {
		let bkmrks = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for bkmrks array
			if(localStorage.getItem('bkmrks')) {
				bkmrks = JSON.parse(localStorage.getItem('bkmrks'));
				//check for bk.id
				let item;
				for(let i=0; i<bkmrks.length; i++) {
					if(bkmrks[i].bkId===bkId) {
						item=bkmrks[i];
						break;
					}
				}
				if(item) {
					item.bkmrk = bkmrk;
				} else {
					bkmrks.push({ bkId: bkId, bkmrk: bkmrk });
				}
			} else {
				bkmrks.push({ bkId: bkId, bkmrk: bkmrk });
			}
			localStorage.setItem('bkmrks', JSON.stringify(bkmrks));
		}
	},
	
	getBkmrk : bkId => {
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
	
	setFont: (bkId, font) => {
		let fonts = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for fSizes array
			if(localStorage.getItem('fonts')) {
				fonts = JSON.parse(localStorage.getItem('fonts'));
				//check for bk.id
				let item;
				for(let i=0; i<fonts.length; i++) {
					if(fonts[i].bkId===bkId) {
						item=fonts[i];
						break;
					}
				}
				if(item) {
					item.font = font;
				} else {
					fonts.push({ bkId: bkId, font: font });
				}
			} else {
				fonts.push({ bkId: bkId, font: font });
			}
			localStorage.setItem('fonts', JSON.stringify(fonts));
		}
	},
	
	getFont : bkId => {
		let fonts = [];
		if (typeof(Storage) !== "undefined") {
			//check localStorage for bkmrks array
			if(localStorage.getItem('fonts')) {
				fonts = JSON.parse(localStorage.getItem('fonts'));
				//check for bk.id
				let item = fonts.filter(function(o) { return o.bkId===bkId})[0];
				if(item) {
					return item.font;
				}
			}
		}
	},
}

export default localStore;
