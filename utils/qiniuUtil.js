const qiniu = require('qiniu')

const ACCESS_KEY = 'Mnlo7G1Xa5PiY-Oxw_D9vzVIEqjRXKmB4n1uxPg-'
const SECRET_KEY = 'aG9p_jQru8bQy7e_XY91WXYv1t2ObDms9VvT6zzf'

const bucketName = 'sljrn'
const bucketPath = 'owu5dbb9y.bkt.clouddn.com'

const getUploadToken = () => {
    let putPolicy = new qiniu.rs.PutPolicy({
        scope: bucketName
    })
    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
    return putPolicy.uploadToken(mac)
}

const getDownloadUrl = (domain, key) => {
    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
    let config = new qiniu.conf.Config()
    let bucketManager = new qiniu.rs.BucketManager(mac, config)
    let expireTime = parseInt(Date.now() / 1000) + 3600 * 24 * 7
    let downloadUrl = bucketManager.privateDownloadUrl(domain, key, expireTime)
    return downloadUrl
}

module.exports = {
    up: getUploadToken,
    down: getDownloadUrl
}