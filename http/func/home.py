def home():
    return "<h1>Hello Flask!</h1>"

__exports__ = {
    "name" : "home",
    "path" : "/",
    "methods": ['GET'],
    "execute": home
}
