#!/usr/bin/env python3
"""Run the supplied motion2code runtime checker against bundled React output."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tests' / 'motion2code'))
from _m2c import launch, playwright, serve
from check_anim import runtime_check

if __name__ == '__main__':
    output = ROOT / 'dist'
    if not (output / 'index.html').is_file():
        sys.exit('Missing production build. Run npm run build first.')
    with playwright()() as pw:
        browser = launch(pw)
        server, base = serve(output)
        try:
            errors, warnings, stats = runtime_check(browser, output / 'index.html', base, output,
                (1440, 1000), 24, 1.0, 8.0, [])
            print('[ok]' if not errors else '[FAIL]', 'React production motion:', stats)
            for warning in warnings:
                print('warning:', warning)
            for error in errors:
                print('error:', error)
            if errors:
                sys.exit(1)
        finally:
            server.shutdown()
            browser.close()
