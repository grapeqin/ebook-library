const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const template = fs.readFileSync('readme.ejs', 'utf8');  
//判断字符串是否为中文字符串
function isChinese(str){
  return /^[\u4e00-\u9fa5]+$/.test(str);
}
// 指定目录路径
const dirPath = process.cwd();
var datas = [];
// 获取当前目录下的所有文件和子目录
const files = fs.readdirSync(dirPath);
for(const file of files){
  const filePath = path.join(dirPath, file);
  // 判断当前文件或子目录是否为目录
  if(fs.statSync(filePath).isDirectory() && isChinese(file)){
    // 遍历目录并筛选出以.epub或pdf结尾的文件
    const items = fs.readdirSync(filePath)
    .filter(file => path.extname(file) === '.epub' || path.extname(file) === '.pdf')
    .map(f => {
      var myData = {
        title: f.split(".")[0],
        url: "[" + f.split(".")[0]+"]("+f+")"
      }
      return myData;
    });
    var data = {
      dir: file,
      items: items
    }
    datas.push(data);
  }
}

const readme = ejs.render(template,{ datas });
console.log(readme)

const destFileName = "README.md";
fs.writeFile(destFileName,readme,(err) =>{
  if(err) throw err;
});