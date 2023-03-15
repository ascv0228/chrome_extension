from flask import make_response, request
import json
import os
from dotenv import load_dotenv

load_dotenv()

def setcookie():
    token = os.getenv('TEST_TOKEN')
    res = make_response(json.dumps({'token':"developer" }), 200)
    res.set_cookie(key='token', value=token, expires=None)
    
    return res

__exports__ = {
    "name" : "cookies_set",
    "path" : "/cookies/set",
    "methods": ['POST'],
    "execute": setcookie
}