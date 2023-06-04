/**
 * 不使用享元模式
 */
class Model {
    constructor(sex,underwear){
        this.sex = sex;
        this.underwear = underwear;
    }

    takePhoto = () => {
        console.log(this.sex + this.underwear);
    }
}

for(let i = 1; i < 50; i++){
    const maleModel = new Model('male','underwear'+i);
    maleModel.takePhoto();
}

for(let i = 1; i < 50; i++){
    const femaleModel = new Model('female','underwear'+i);
    femaleModel.takePhoto();
}

/**
 * 改进之后
 */
 class Model {
    constructor(sex){
        this.sex = sex;
    }

    takePhoto = () => {
        console.log(this.sex + this.underwear);
    }
}

const maleModel = new Model('male');
const femaleModel = new Model('female');

for(let i = 1; i < 50; i++){
    maleModel.underwear = 'underwear'+i;
    maleModel.takePhoto();
}

for(let i = 1; i < 50; i++){
    femaleModel.underwear = 'underwear'+i;
    femaleModel.takePhoto();
}

/**
 * 初版文件上传
 */
class Upload {
    constructor(uploadType, fileName, fileSize){
        this.uploadType = uploadType;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.dom = null;
    }

    init = (id) => {
        let that = this;
        this.id = id;
        this.dom = document.createElement('div');
        this.dom.innerHTML = `<span>文件名称${this.fileName}，文件大小${this.fileSize}</span><button class="delFile">删除</button>`
        this.dom.querySelector('delFile').onclikc = () => {
            this.delFile();
        }
        document.body.appendChild(this.dom);
    }

    delFile = () => {
        if(window.confirm('确定要删除该文件吗？')){
            return this.dom.parentNode.removeChild(this.dom)
        }
    }
}

let id = 0;
window.startUpload = (uploadType, files){
    for(let i = 0,file;file = files[i++];){
        const uploadObj = new Upload(uploadType, file.fileName, file.fileSize);
        uploadObj.init(id++);
    }
}