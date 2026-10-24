#!/usr/bin/env python3
"""Serve a built portfolio without exposing source, tools, or test artifacts."""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

class PortfolioHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = unquote(urlsplit(self.path).path)
        root = Path(self.directory).resolve()
        candidate = (root / path.lstrip('/')).resolve()
        allowed_page = path in ('/', '/index.html', '/compare.html', '/404.html', '/robots.txt', '/sitemap.xml', '/favicon.svg', '/og-image.png', '/a2cc9fb0787066ddeba1e9c7dc014444.txt')
        allowed_asset = path.startswith('/assets/') and candidate.is_relative_to(root / 'assets') and candidate.is_file()
        if not allowed_page and not allowed_asset:
            self.send_error(404, 'Page not found')
            return None
        self.path = '/index.html' if path == '/' else path
        return super().send_head()

    def end_headers(self):
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

if __name__ == '__main__':
    from functools import partial
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=3000)
    parser.add_argument('--bind', default='127.0.0.1')
    parser.add_argument('--directory', default=str(Path(__file__).resolve().parent / 'dist'))
    args = parser.parse_args()
    root = Path(args.directory).resolve()
    if not (root / 'index.html').is_file():
        parser.error('Build not found. Run npm run build first.')
    server = ThreadingHTTPServer((args.bind, args.port), partial(PortfolioHandler, directory=str(root)))
    print(f'Portfolio: http://{args.bind}:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
