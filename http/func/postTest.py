from flask import request
import json

def postTest():
    res = {}
    if(not request.is_json):
        res['is_json'] = False
    else:
        res = json.loads(request.get_json())
        res['is_json'] = True
    return res

__exports__ = {
    "name" : "postTest",
    "path" : "/postTest",
    "methods": ['POST'],
    "execute": postTest
}
