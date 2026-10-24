const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const {execFileSync}=require('node:child_process');
function pixelDelta(a,b){
  const decode=png=>execFileSync('ffmpeg',['-v','error','-f','image2pipe','-i','-','-f','rawvideo','-pix_fmt','rgb24','-'],{input:png,maxBuffer:40*1024*1024});
  const x=decode(a),y=decode(b);expect(x.length).toBe(y.length);let sum=0;for(let i=0;i<x.length;i++)sum+=Math.abs(x[i]-y[i]);return sum/x.length;
}
async function ready(page, path='/?external=1') {
  await page.goto(path);
  await page.waitForFunction(()=>document.documentElement.dataset.ready==='1');
}
test('desktop layout, deterministic motion, and exact loop seam', async ({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await page.setViewportSize({width:1440,height:1000});await ready(page);
  expect(await page.evaluate(()=>!!window.anim.tl)).toBe(true);
  await page.evaluate(()=>anim.seek(0));const opening=await page.screenshot();const openingDOM=await page.content();
  await page.evaluate(()=>anim.seek(12));const closing=await page.screenshot();
  expect(await page.content()).toBe(openingDOM);expect(pixelDelta(closing,opening)).toBeLessThan(.02);
  await page.evaluate(()=>anim.seek(4.5));const mid=await page.screenshot();
  await page.evaluate(()=>{anim.seek(9);anim.seek(.2);anim.seek(4.5);});
  expect(pixelDelta(await page.screenshot(),mid)).toBeLessThan(.02);
  expect(mid.equals(opening)).toBe(false);
  await page.evaluate(()=>anim.seek(0));await page.screenshot({path:'test-results/desktop-hero.png'});
  await page.screenshot({path:'test-results/desktop-full.png',fullPage:true});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
test('workbench unfolds, subtracts, runs, and resets',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await ready(page,'/');const before=await page.evaluate(()=>anim.tl.time());
  await page.waitForTimeout(250);expect(await page.evaluate(()=>anim.tl.time())).not.toBe(before);
  await page.getByRole('button',{name:'Pause motion',exact:true}).click();expect(await page.evaluate(()=>anim.tl.paused())).toBe(true);
  await page.getByRole('button',{name:'Pull the thread to open the mechanism'}).click();
  await expect(page.locator('#step-counter')).toHaveText('02 / 03');
  await expect(page.locator('#bench-title')).toHaveText('Beautiful. Also unnecessary.');
  await page.getByRole('button',{name:'Remove the extra part'}).click();
  await expect(page.locator('#bench-title')).toHaveText('Less, but working.');
  await expect(page.locator('#step-counter')).toHaveText('03 / 03');
  await page.evaluate(()=>anim.seek(3));
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'test-results/workbench-unfolded.png'});
  await page.evaluate(()=>anim.seek(0));const start=await page.screenshot();
  await page.evaluate(()=>anim.seek(12));expect(pixelDelta(await page.screenshot(),start)).toBeLessThan(.02);
  await page.getByRole('button',{name:'Start again'}).click();
  await expect(page.locator('#step-counter')).toHaveText('01 / 03');
  await expect(page.locator('[data-trail="bench"]')).toHaveClass(/visited/);
});
test('thread supports dragging and keyboard controls',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await ready(page);
  const grip=await page.locator('#thread-grip').boundingBox();
  await page.mouse.move(grip.x+grip.width/2,grip.y+grip.height/2);await page.mouse.down();
  await page.mouse.move(grip.x+grip.width/2+180,grip.y+grip.height/2,{steps:12});await page.mouse.up();
  await expect(page.locator('#step-counter')).toHaveText('02 / 03');
  await page.locator('#reset-bench').click();
  await page.locator('#thread-grip').focus();await page.keyboard.press('Enter');
  await expect(page.locator('#step-counter')).toHaveText('02 / 03');
  await page.locator('#pull-range').fill('45');await expect(page.locator('#step-counter')).toHaveText('01 / 03');
  await page.locator('#pull-range').focus();await page.keyboard.press('End');
  await expect(page.locator('#step-counter')).toHaveText('02 / 03');
});
test('engineering depth changes diagrams and explanations without navigation',async({page})=>{
  await ready(page);await page.locator('#depth').fill('100');
  await expect(page.locator('[data-copy="syntax"]')).toContainText('recursive-descent');
  await expect(page.locator('[data-art-state="forma"]')).toHaveText('Blueprint / 001');
  await expect(page.locator('.engineering-layer').first()).toHaveCSS('opacity','1');
  await page.locator('#depth').fill('0');await expect(page.locator('[data-art-state="forma"]')).toHaveText('Interface / 001');
  await page.locator('#depth').fill('100');await page.locator('#work').scrollIntoViewIfNeeded();
  await page.screenshot({path:'test-results/engineering-view.png'});
});
test('the visit trail and discard drawer expose real state',async({page})=>{
  await ready(page);await page.getByRole('button',{name:'Explore Forma, a design system concept'}).click();
  await page.keyboard.press('Escape');await expect(page.locator('[data-visited="forma"]')).toHaveText('Unfolded · open again');
  await expect(page.locator('#visit-note')).toContainText('Forma');
  await page.locator('#discard-drawer summary').click();await expect(page.locator('#discard-drawer')).toHaveAttribute('open','');
  await page.locator('#discard-drawer summary').focus();await page.keyboard.press('Enter');
  await expect(page.locator('#discard-drawer')).not.toHaveAttribute('open','');
  await page.reload();await expect(page.locator('[data-visited="forma"]')).toHaveText('Not yet unfolded');
});
test('geometry modes and scrubbing still work',async({page})=>{
  await ready(page);await page.getByRole('button',{name:'03 · Orbit'}).click();
  await expect(page.getByRole('button',{name:'03 · Orbit'})).toHaveAttribute('aria-pressed','true');
  await page.locator('#timeline').fill('5.25');await expect(page.locator('#time-output')).toHaveText('05.25s');
  await page.locator('#lab-play').click();expect(await page.evaluate(()=>anim.tl.paused())).toBe(false);
});
test('all project prototypes and Escape dismissal',async({page})=>{
  await ready(page);
  await page.getByRole('button',{name:'Explore Forma, a design system concept'}).click();
  await expect(page.locator('#project-dialog')).toBeVisible();
  await page.getByRole('button',{name:'Lilac theme'}).click();await expect(page.locator('#forma-demo')).toHaveCSS('background-color','rgb(220, 213, 233)');
  await page.screenshot({path:'test-results/forma-dialog.png'});await page.keyboard.press('Escape');await expect(page.locator('#project-dialog')).not.toBeVisible();
  await page.getByRole('button',{name:'Explore Orbit, a focus workspace concept'}).click();
  await page.getByRole('textbox',{name:'New task'}).fill('Ship something thoughtful');await page.getByRole('button',{name:'Add +',exact:true}).click();
  await expect(page.locator('#task-list li')).toHaveCount(3);await page.getByRole('checkbox',{name:'Complete Ship something thoughtful'}).check();
  await expect(page.locator('#task-count')).toHaveText('1 / 3 complete');
  await page.getByRole('button',{name:'Close project'}).click();
  await page.getByRole('button',{name:'Explore Syntax, an expression parser concept'}).click();
  await expect(page.locator('#expression-result')).toContainText('60');
  await page.locator('#expression').fill('-2 * (3 + .5)');await expect(page.locator('#expression-result')).toContainText('-7');
  await page.locator('#expression').fill('1 / 0');await expect(page.locator('#expression-result')).toContainText('Division by zero');
  await page.locator('#expression').fill('<script>alert(1)</script>');await expect(page.locator('#expression-result')).toContainText('Expected a number');
});
test('prototype state survives reopening but not a fresh page',async({page})=>{
  await ready(page);await page.getByRole('button',{name:'Explore Orbit, a focus workspace concept'}).click();
  await page.getByRole('textbox',{name:'New task'}).fill('Keep this thought');await page.getByRole('button',{name:'Add +',exact:true}).click();
  await page.keyboard.press('Escape');await page.getByRole('button',{name:'Explore Forma, a design system concept'}).click();await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Explore Orbit, a focus workspace concept'}).click();await expect(page.locator('#task-list')).toContainText('Keep this thought');
  await page.reload();await page.getByRole('button',{name:'Explore Orbit, a focus workspace concept'}).click();await expect(page.locator('#task-list li')).toHaveCount(2);
});
test('contact validates, copies and downloads an actual brief',async({page,context})=>{
  await context.grantPermissions(['clipboard-read','clipboard-write']);await ready(page);
  await page.getByRole('button',{name:'Start a project conversation'}).click();
  await page.getByRole('button',{name:'Copy project brief'}).click();expect(await page.locator('#inquiry-name').evaluate(el=>el.validity.valueMissing)).toBe(true);
  await page.getByRole('textbox',{name:'Your name'}).fill('A curious developer');await page.getByRole('textbox',{name:'The idea'}).fill('What if we made a living portfolio?');
  await page.getByRole('button',{name:'Copy project brief'}).click();await expect(page.locator('#form-status')).toHaveText('Copied. Your brief is ready to share.');
  expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('A curious developer');
  const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Download .txt'}).click();const download=await pending;
  expect(download.suggestedFilename()).toBe('a-what-if-for-harshit.txt');const file=await download.path();expect(fs.readFileSync(file,'utf8')).toContain('What if we made a living portfolio?');
});
for (const width of [375,390,768,1920]) test(`responsive layout at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:width<500?812:1080});await ready(page);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('h1')).toBeVisible();
  await page.locator('#thread-grip').click();await page.locator('#remove-part').click();
  await expect(page.locator('#follow-thread')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('#reset-bench').click();
  if(width===375){await page.screenshot({path:'test-results/mobile-hero.png'});await page.screenshot({path:'test-results/mobile-full.png',fullPage:true});}
  await page.locator('#playground').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'02 · Bloom'}).click();
  await expect(page.getByRole('button',{name:'02 · Bloom'})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Start a project conversation'}).click();await expect(page.locator('#contact-dialog')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('reduced motion and explicit time parameters',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await ready(page,'/');expect(await page.evaluate(()=>anim.tl.paused())).toBe(true);
  await page.getByRole('button',{name:'Play motion',exact:true}).click();expect(await page.evaluate(()=>anim.tl.paused())).toBe(false);
  await ready(page,'/?t=6.5');expect(await page.evaluate(()=>anim.tl.paused())).toBe(true);await expect(page.locator('#time-output')).toHaveText('06.50s');
});
test('motion inspector pins and checks seam',async({page})=>{
  await page.goto('/compare.html');await expect(page.locator('#pin')).toBeEnabled();
  await page.locator('#scrub').fill('3');await page.locator('#pin').click();await expect(page.locator('#reference-time')).toHaveText('3.00 s');
  await page.locator('#seam').click();await expect(page.locator('#reference-time')).toHaveText('0.00 s');await expect(page.locator('#current-time')).toHaveText('12.00 s');
  await page.screenshot({path:'test-results/motion-inspector.png'});
});
test('bundled motion has no CDN script dependency',async({page})=>{
  const requests=[];page.on('request',request=>{if(request.resourceType()==='script')requests.push(request.url());});
  await page.route('https://cdnjs.cloudflare.com/**',route=>route.abort());await ready(page);
  expect(await page.evaluate(()=>!!window.anim.tl)).toBe(true);
  expect(requests.every(url=>new URL(url).origin==='http://127.0.0.1:3001'||new URL(url).origin==='http://127.0.0.1:3002')).toBe(true);
  await page.getByRole('button',{name:'Explore Forma, a design system concept'}).click();await expect(page.locator('#project-dialog')).toBeVisible();
});
test('React rerenders preserve playback time and one timeline',async({page})=>{
  await ready(page);await page.evaluate(()=>anim.seek(4.25));
  await page.locator('#depth').fill('100');await page.locator('#pull-range').fill('100');
  await page.getByRole('button',{name:'Remove the extra part'}).click();
  await page.getByRole('button',{name:'02 · Bloom'}).click();
  expect(await page.evaluate(()=>anim.tl.time())).toBeCloseTo(4.25,4);
  expect(await page.evaluate(()=>anim.tl.parent.getChildren(false,false,true).filter(child=>child.vars.repeat===-1&&child.duration()===12).length)).toBe(1);
  await expect(page.locator('#time-output')).toHaveText('04.25s');
});
test('modal restores keyboard focus and paused playback state',async({page})=>{
  await ready(page);const trigger=page.getByRole('button',{name:'Explore Forma, a design system concept'});
  await trigger.click();await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
  expect(await page.evaluate(()=>anim.tl.paused())).toBe(true);
});
