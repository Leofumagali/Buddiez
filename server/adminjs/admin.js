const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')

AdminJS.registerAdapter(require("@adminjs/mongoose"));
const Users = require ("../models/User")
const Posts = require ("../models/Post")
const adminOptions = {
    resources: [Users, Posts],
    rootPath: "/admin"
  }

const admin = new AdminJS(adminOptions)
const router = AdminJSExpress.buildRouter(admin);

exports.admin = admin
exports.router = router