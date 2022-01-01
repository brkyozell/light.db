const aes = require('aes256')
const fs = require('fs');

let time;

var connection = {
    dbfile: undefined,
    dbfilename: undefined,
    dbkey: undefined
}

function log(logtext) {
    if (require('./config.json').logging === true) {
        console.log(logtext)
    }
}

function version() {
    var text = "light.db v1.0.0"
    return text
}

exports.version = function () {
    return version()
}

exports.createLightbase = function (file, key, type) {
    if (file === file.toString()) { } else return new Error("File must a string!")
    if (key === key.toString()) { } else return new Error("Key must a string!")
    if (type === type.toString()) { } else return new Error("Type must a string!")

    time = Date.now()

    switch (type) {
        case "{}":
            var newFile = "{}"
            var encrypted = aes.encrypt(key, newFile)
            fs.writeFileSync(file, encrypted)
            log(`${file} created in ${Date.now() - time} ms`)
            break;
        case "[]":
            var newFile = "[]"
            var encrypted = aes.encrypt(key, newFile)
            fs.writeFileSync(file, encrypted)
            log(`${file} created in ${Date.now() - time} ms`)
            break;
        default:
            return new Error("Type must {} or []")
    }

}

exports.connect = function (file, key) {
    if (file === file.toString()) { } else return new Error("File must a string!")
    if (key === key.toString()) { } else return new Error("Key must a string!")

    time = Date.now()
    var decrypted = aes.decrypt(key, fs.readFileSync(file).toString())
    try {
        JSON.parse(decrypted)

        connection.dbfile = JSON.parse(decrypted);
        connection.dbfilename = file;
        connection.dbkey = key;
        log(`connected ${file} in ${Date.now() - time}ms`)
    } catch (err) {
        if (err.message.includes("Unexpected token")) {
            return new Error("Auth failed!")
        } else {
            return new Error(err)
        }
    }
}

exports.readDatabase = function () {
    if (connection.dbfile === undefined || connection.dbkey === undefined || connection.dbfilename === undefined) {
        return new Error("Not connected any database!")
    }

    return connection.dbfile
}

exports.destroyConnection = function () {
    time = Date.now()

    connection.dbfile = undefined
    connection.dbfilename = undefined
    connection.dbkey = undefined

    log(`destroyed connection in ${Date.now() - time}ms`)
}

exports.fetch = function (value) {
    if (connection.dbfile === undefined || connection.dbkey === undefined || connection.dbfilename === undefined) {
        return new Error("Not connected any database!")
    }
    time = Date.now()
    var result = connection.dbfile[value]

    log(`fetched source in ${Date.now() - time}ms`)
    return result;
}

exports.set = function (value1, value2) {
    if (connection.dbfile === undefined || connection.dbkey === undefined || connection.dbfilename === undefined) {
        return new Error("Not connected any database!")
    }

    connection.dbfile[value1] = value2

    var enddb = aes.encrypt(connection.dbkey, JSON.stringify(connection.dbfile))
    fs.writeFileSync(connection.dbfilename, enddb)
}

exports.delete = function (value) {
    if (connection.dbfile === undefined || connection.dbkey === undefined || connection.dbfilename === undefined) {
        return new Error("Not connected any database!")
    }

    delete connection.dbfile[value]

    var enddb = aes.encrypt(connection.dbkey, JSON.stringify(connection.dbfile))
    fs.writeFileSync(connection.dbfilename, enddb)
}

exports.subtract = function (value1, value2) {
    if (connection.dbfile === undefined || connection.dbkey === undefined || connection.dbfilename === undefined) {
        return new Error("Not connected any database!")
    }

    if (connection.dbfile[value1] === connection.dbfile[value1].toString()) {
        return new Error("Strings not allowed for this function.")
    }
    if (value2 === value2.toString()) {
        return new Error("Strings not allowed for this function.")
    }

    connection.dbfile[value1] = connection.dbfile[value1] - value2

    var enddb = aes.encrypt(connection.dbkey, JSON.stringify(connection.dbfile))
    fs.writeFileSync(connection.dbfilename, enddb)
}

exports.add = function (value1, value2) {
    if (connection.dbfile === undefined || connection.dbkey === undefined || connection.dbfilename === undefined) {
        return new Error("Not connected any database!")
    }

    if (connection.dbfile[value1] === connection.dbfile[value1].toString()) {
        return new Error("Strings not allowed for this function.")
    }
    if (value2 === value2.toString()) {
        return new Error("Strings not allowed for this function.")
    }

    connection.dbfile[value1] = connection.dbfile[value1] + value2

    var enddb = aes.encrypt(connection.dbkey, JSON.stringify(connection.dbfile))
    fs.writeFileSync(connection.dbfilename, enddb)
}

exports.push = function (value1, value2) {
    if (connection.dbfile === undefined || connection.dbkey === undefined || connection.dbfilename === undefined) {
        return new Error("Not connected any database!")
    }

    if (value2 === undefined) {
        if (Array.isArray(connection.dbfile)) {
            connection.dbfile.push(value1)
        } else {
            return new Error("Your object isn't array!")
        }
    } else {
        if (Array.isArray(connection.dbfile[value1])) {
            connection.dbfile[value1].push(value2)
        } else {
            return new Error("Your object isn't array!")
        }
    }

    var enddb = aes.encrypt(connection.dbkey, JSON.stringify(connection.dbfile))
    fs.writeFileSync(connection.dbfilename, enddb)
    
}