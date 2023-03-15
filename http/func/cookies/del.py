from flask import Response


def del_cookie():
    res = Response('delete cookies')
    res.set_cookie(key='token', value='', expires=0)
    return res

__exports__ = {
    "name" : "cookies_del",
    "path" : "/cookies/del",
    "methods": ['GET'],
    "execute": del_cookie
}