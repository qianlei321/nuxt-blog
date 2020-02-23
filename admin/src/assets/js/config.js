const BASEURL = ""
const LOCALURL = "http://localhost:3000/"
const URL ={ 
    LOCALURL:LOCALURL,
    admin_user : LOCALURL+'api/admin/user/',  //管理员接口
    file : LOCALURL+'api/admin/file/',  //管理员接口
    article : LOCALURL+'api/admin/article/',  //管理员接口
    menu : LOCALURL+'api/admin/menu/',
}

module.exports = URL
