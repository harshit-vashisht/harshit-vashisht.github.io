const {defineConfig}=require('@playwright/test');
const development=process.env.TEST_DEV==='1';
const port=development?3002:3001;
module.exports=defineConfig({
  testDir:'./tests',testMatch:'**/*.spec.cjs',timeout:45000,workers:1,
  reporter:[['list'],['json',{outputFile:'test-results/results.json'}]],
  use:{baseURL:`http://127.0.0.1:${port}`,headless:true,launchOptions:{executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}},
  webServer:{command:development?'npx vite --host 127.0.0.1 --port 3002 --strictPort':'python3 server.py --port 3001',url:`http://127.0.0.1:${port}`,reuseExistingServer:!process.env.CI}
});
