import SimpleHTTPServer
import SocketServer
import webbrowser

PORT = 8000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

url = 'localhost:{port}'.format(port=PORT)
webbrowser.open(url)

print "serving at port", PORT
httpd.serve_forever()
