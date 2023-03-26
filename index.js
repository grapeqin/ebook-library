const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const template = fs.readFileSync('readme.ejs', 'utf8');  

// 指定目录路径
const dirPath = process.cwd();
// 遍历目录并筛选出以.epub结尾的文件
const items = fs.readdirSync(dirPath)
  .filter(file => path.extname(file) === '.epub' || path.extname(file) === '.pdf')
  .map(f => {
    var myData = {
      title: f.split(".")[0],
      url: "[" + f.split(".")[0]+"]("+f+")"
    }
    return myData;
  });

const readme = ejs.render(template,{ items });
console.log(readme)

const destFileName = "README.md";
fs.writeFile(destFileName,readme,(err) =>{
  if(err) throw err;
});