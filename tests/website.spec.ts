import { test, expect } from '@playwright/test';
test('collections filter and selected jacket quotation retain all order details',async({page})=>{
 await page.goto('/');await expect(page.locator('.product-card')).toHaveCount(8);
 await page.getByRole('button',{name:'Industry',exact:true}).click();await expect(page.locator('.product-card')).toHaveCount(3);
 await page.getByRole('button',{name:'Order Logistics Pro',exact:true}).click();await expect(page.locator('dialog')).toBeVisible();await expect(page.locator('select').first()).toHaveValue('logistics');
 await page.getByLabel('Full name *',{exact:true}).fill('Test Customer');await page.getByLabel('Company / organisation *',{exact:true}).fill('Example Team');await page.getByLabel('Phone number *',{exact:true}).fill('+26771000000');await page.getByLabel('Jacket colour *',{exact:true}).fill('Navy and orange');
 await page.locator('button[type="submit"]').click();await expect(page.getByRole('alert')).toContainText('at least one');
 await page.getByLabel('M quantity',{exact:true}).fill('4');await page.getByLabel('XL quantity',{exact:true}).fill('6');await page.getByLabel('Add custom measurements or fitting requirements').check();await page.getByLabel('Chest',{exact:true}).fill('110');
 await page.locator('button[type="submit"]').click();await expect(page.locator('.request-preview pre')).toContainText('Collection: Logistics Pro');await expect(page.locator('.request-preview pre')).toContainText('Total quantity: 10');await expect(page.locator('.request-preview pre')).toContainText('M: 4, XL: 6');await expect(page.locator('.request-preview pre')).toContainText('chest: 110');
 const link=await page.getByRole('link',{name:'Open WhatsApp'}).getAttribute('href');expect(link).toContain('https://wa.me/');expect(decodeURIComponent(link!)).toContain('Example Team');await page.getByRole('button',{name:'Close order form'}).click();await expect(page.locator('dialog')).toHaveCount(0);
});
test('responsive layout, hero controls, FAQ and image loading',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await page.getByRole('button',{name:'Preview Campus Pro'}).click();await expect(page.getByRole('button',{name:'Preview Campus Pro'})).toHaveAttribute('aria-pressed','true');await page.getByRole('button',{name:'Back',exact:true}).click();
 await page.locator('#faq').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'Can one order include different sizes?'}).click();await expect(page.locator('#faq-1')).toBeVisible();
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);expect(overflow).toBe(false);
 for(const image of await page.locator('.product-visual img').all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(i=>(i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth>0)).toBe(true)}
 await page.getByRole('button',{name:'Front',exact:true}).click();await page.getByRole('button',{name:'Preview Corporate Pro'}).click();for(const id of ['collections','customisation','how-it-works','about','faq','final-cta']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(750);if(id==='customisation')await page.screenshot({path:`test-results/${test.info().project.name}-material.png`})}await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(1000);await page.screenshot({path:`test-results/${test.info().project.name}-full.png`,fullPage:true});expect(errors).toEqual([]);
});
