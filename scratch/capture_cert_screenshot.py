import asyncio
import os

async def capture_cert():
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        # Navigate to dev server
        await page.goto('http://localhost:3000', wait_until='networkidle')
        
        # Click Start Course or fill name if on Welcome Screen
        try:
            name_input = page.locator('#cert-name-input, input[placeholder*="Toshpulatov"]')
            if await name_input.is_visible():
                await name_input.fill('TOSHPULATOV BEHRUZ ALISHEROVICH')
                start_btn = page.locator('button:has-text("KURSNI BOSHLASH")')
                if await start_btn.is_visible():
                    await start_btn.click()
                    await page.wait_for_timeout(1000)
        except Exception as e:
            print("Welcome flow note:", e)

        # Click Sertifikat button in header
        cert_btn = page.locator('button:has-text("Sertifikat")')
        if await cert_btn.is_visible():
            # If disabled, enable or unlock for screenshot
            await cert_btn.click(force=True)
            await page.wait_for_timeout(1000)

        # Take screenshot of official-iib-certificate element
        cert_elem = page.locator('#official-iib-certificate')
        artifact_path = r"C:\Users\user\.gemini\antigravity\brain\7ec0675e-f57b-48f3-8499-4527d93ee055\certificate_preview_v2.png"
        if await cert_elem.is_visible():
            await cert_elem.screenshot(path=artifact_path)
            print(f"SUCCESS: Certificate screenshot saved to {artifact_path}")
        else:
            await page.screenshot(path=artifact_path)
            print(f"Fallback full page screenshot saved to {artifact_path}")
            
        await browser.close()

if __name__ == '__main__':
    asyncio.run(capture_cert())
