# https://medium.com/datainpoint/flask-web-api-quickstart-3b13d96cccc2
# https://www.youtube.com/watch?v=91GT8Jx8uWA&t=16s&ab_channel=%E8%98%87%E9%9F%8B%E6%96%87
# https://www.youtube.com/watch?v=3HVNRgvi5BY&ab_channel=JulianNash

import flask
import loader
import os
from dotenv import load_dotenv
from tools import tools

load_dotenv()

methodDict = loader.importFile(os.getenv('IMPORT_PATH'))
# print(methodDict)

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config["JSON_AS_ASCII"] = False
app.config["SERVER_NAME"] = os.getenv('SERVER_NAME')
# app.config["SERVER_NAME"] = '0.0.0.0:8000' # public

f = open("./templates/weblist.html","w")
s = [tools.webListHtml(None,None,None,"head")]
for n, o in methodDict.items():
    try:
        app.add_url_rule(o["path"], n, view_func=o["execute"], methods=o["methods"])
        url = f'http://{app.config["SERVER_NAME"]}{o["path"]}'
        s.append(tools.webListHtml(url, n, o['methods'], None))
    except Exception as e:
        print(e)
else:
    s.append(tools.webListHtml(None,None,None,"end"))
    print('\n'.join(s), file=f)
    f.close()





print(app.url_map)
app.run()


