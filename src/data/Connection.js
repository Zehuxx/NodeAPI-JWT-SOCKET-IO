const fs = require('fs')

const readData = ()=>{
    try {
      const data = JSON.parse(fs.readFileSync(require('path').resolve(__dirname,'./medicaments.json'), 'utf8'));
      return {status:200, data};

      } catch (err) {
        console.log(err);
        return {status:500};
      }
}

const writeData = (data)=>{
    try {

        fs.writeFileSync(require('path').resolve(__dirname,'./medicaments.json'), JSON.stringify(data), 'utf8');
        return {status:200};
      } catch (err) {
        return  {status:500};
      }
}

module.exports= {readData, writeData};