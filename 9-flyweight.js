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

/**
 * 享元模式重构
 */
 class Upload {
    constructor(uploadType){
        // 只保留内部状态
        this.uploadType = uploadType;
    }

    //原先init不再需要，初始化转移到uploadManager的add函数中

    delFile = (id) => {
        // 把id对应对象的外部状态组装到共享对象中，因为下面需要获取fileSize了
        uploadManager.setExternalState(id, this);

        if(this.fileSize < 3000){
            return this.dom.parentNode.removeChild(this.dom)
        }

        if(window.confirm('确定要删除该文件吗？')){
            return this.dom.parentNode.removeChild(this.dom)
        }
    }
}

// 工厂负责创建Upload对象，判断是否需要返回共享对象
const UploadFactory = {
    createdFlyWeightObjs: {},
    create: function(uploadType){
        if(this.createdFlyWeightObjs[uploadType]){
            return this.createdFlyWeightObjs[uploadType]
        }
        return this.createdFlyWeightObjs[uploadType] = new Upload(uploadType)
    }
}

const uploadManager = {
    uplodaDatabase: {},
    add: function(id, uploadType, fileName, fileSize){
        const flyweightObj = UploadFactory.create(uploadType);
        const dom = document.createElement('div');
        dom.innerHTML = `<span>文件名称${this.fileName}，文件大小${this.fileSize}</span><button class="delFile">删除</button>`
        dom.querySelector('.delFile').onclikc = () => {
            flyweightObj.delFile(id);
        }
        document.body.appendChild(this.dom);
        this.uplodaDatabase[id] = {
            fileName,
            fileSize,
            dom
        };
        return flyweightObj;
    },
    setExternalState: function(id, flyweightObj){
        const uploadData = this.uplodaDatabase[id];
        for(let i in uploadData){
            flyweightObj[i] = uploadData[i];
        }
    }
}

let id2 = 0;
window.startUpload = function(upploadType, files){
    for(let i=0,file;file = files[i++];){
        uploadManager.add(++id2, upploadType, file.fileName, file.fileSize);
    }
}
