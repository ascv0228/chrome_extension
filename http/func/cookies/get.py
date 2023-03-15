
from flask import request

def getcookie():
    token = request.cookies.get('token')
    return {"token":token}

__exports__ = {
    "name" : "cookies_get",
    "path" : "/cookies/get",
    "methods": ['GET'],
    "execute": getcookie
}