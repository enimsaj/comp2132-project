//const maxCharsPerLine   = 12;
const apiSource         = "https://xivapi.com"

class Word{
    
    constructor(key, hint, image){
        this.key = key;
        this.hint = hint;    
        this.img = image;
        this.keyArray = []; //boolean
    }

    reveal(selectedLetter, parentID){
        let html = '';
        let lines = 1;

        this.keyArray.forEach((element, index) => {
            if(element.char === selectedLetter){
                element.isRevealed = true;
            }
            html+=`<span class="${element.cssClass}"> `;
            if(element.char === ' '){
                html += `&nbsp; </span>`
                //line break if more than max in the line
/*                 if((index/lines/maxCharsPerLine) > 1) {
                    html += `<br />`;
                    lines++;
                } */
            }else{
                html += `${element.isRevealed ? element.char: " &nbsp; "} </span>`
            }
        });
        $(parentID).html(html);
    }

    isCompleted(){
        let temp = true;
        this.keyArray.forEach((element, index) => {
            if(element.isRevealed==false){
                temp = false;
            }
        });
        return temp
    }

    printBlanks(parentID){
        let html = ""; 
        let lines = 1;
        for(let i = 0; i < this.key.length; i++){
            let myChar = this.key[i];
            let regex = /^[a-z]+$/i; 
            if(myChar.match(regex)){
                //html += `<span class="alpha"> ${this.key[i]} </span>`
                html += `<span class="alpha"> &nbsp; </span>`
                this.keyArray.push({char:  this.key[i], isRevealed: false, cssClass: "alpha" })
            }else{
                if(myChar===' ') { 
                    html += `<span class="non-alpha"> &nbsp; </span>`
                }else{
                    html += `<span class="non-alpha"> ${ this.key[i]} </span>`
                }
                //line break if more than max in the line
/*                 if((i/lines/maxCharsPerLine) > 1) {
                    html += `<br />`;
                    lines++;
                } */
                this.keyArray.push({char: myChar, isRevealed: true, cssClass: "non-alpha" })
            }
        }
        $(parentID).html(html);
    }

    printHint(parentID){
        $(parentID).html( ` <img src=${apiSource+this.img} alt="minion" /> <div> Hint: ${this.hint}</div>`);
    }

}