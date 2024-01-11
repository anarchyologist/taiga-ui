import {TuiDocumentationPagePO, tuiGoto} from '@demo-playwright/utils';
import {expect, Locator, test} from '@playwright/test';

test.describe('InputYear', () => {
    let input: Locator;
    let documentationPO: TuiDocumentationPagePO;

    test.describe('Does not allow incorrect year entry', () => {
        test.beforeEach(async ({page}) => {
            await tuiGoto(page, '/components/input-year/API?max=2020');

            documentationPO = new TuiDocumentationPagePO(page);
            input = documentationPO.apiPageExample.locator('input');
            await documentationPO.prepareApiPageBeforeScreenshot();
            await input.click();
        });

        test('12345 => 1234', async ({page}) => {
            await input.fill('123456789');
            await expect(page).toHaveScreenshot('01-input-year.png');
        });

        test('2040 => 2020', async ({page}) => {
            await input.fill('2040');
            await expect(page).toHaveScreenshot('02-input-year.png');
        });

        test('0000 => blur => 0', async ({page}) => {
            await input.fill('0000');
            await expect(page).toHaveScreenshot('03-input-year.png');
            await input.blur();
            await expect(page).toHaveScreenshot('04-input-year.png');
        });

        test('0040 => blur => 40', async ({page}) => {
            await input.fill('0040');
            await expect(page).toHaveScreenshot('05-input-year.png');
            await input.blur();
            await expect(page).toHaveScreenshot('06-input-year.png');
        });
    });

    test.describe('Value validation on blur', () => {
        test.beforeEach(async ({page}) => {
            await tuiGoto(page, '/components/input-year/API?max=2024&min=2020');

            documentationPO = new TuiDocumentationPagePO(page);
            input = documentationPO.apiPageExample.locator('input');
            await documentationPO.prepareApiPageBeforeScreenshot();
            await input.click();
        });

        test('can not be less than min', async ({page}) => {
            await input.fill('2005');
            await expect(page).toHaveScreenshot('07-input-year.png');
            await input.blur();
            await expect(page).toHaveScreenshot('08-input-year.png');
        });
    });

    test.describe('need select date from dropdown', () => {
        test.beforeEach(async ({page}) => {
            await tuiGoto(page, '/components/input-year/API');

            documentationPO = new TuiDocumentationPagePO(page);
            input = documentationPO.apiPageExample.locator('input');
            await documentationPO.prepareApiPageBeforeScreenshot();
            await input.click();
        });

        test('empty input => select date via calendar => new date inside text field', async ({
            page,
        }) => {
            const cell = page.locator(
                '[automation-id="tui-primitive-year-picker__cell"]:has-text("2020")',
            );

            await cell.scrollIntoViewIfNeeded();
            await expect(page).toHaveScreenshot('09-input-year.png');

            await cell.click();
            await expect(page).toHaveScreenshot('10-input-year.png');
        });

        test('type 2020 => select new date via calendar => new date inside text field', async ({
            page,
        }) => {
            await input.fill('2020');

            const cell = page.locator(
                '[automation-id="tui-primitive-year-picker__cell"]:has-text("2030")',
            );

            await cell.scrollIntoViewIfNeeded();
            await expect(page).toHaveScreenshot('11-input-year.png');

            await cell.click();
            await expect(page).toHaveScreenshot('12-input-year.png');
        });
    });
});
