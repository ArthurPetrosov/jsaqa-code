const { clickElement, getText} = require("./lib/commands.js");
let page;
beforeEach(async () => {
  let day = 2;
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php"); 
  await clickElement(page, "[data-time-stamp='1695157200']");
  await clickElement(page, "[data-seance-id='173']");
}, 30000);

afterEach(() => {
  page.close();
});

describe("Booking",() => {
test("Two tickets", async () => {
        let row = 1;
        let place1 = 3;
        await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place1})`);
        await clickElement(page,".acceptin-button");
        const actual = await getText(page,"h2");
        const expected = "Вы выбрали билеты:";
        expect(actual).toContain(expected);
  }, 30000);

    test("Two tickets", async () => {
        let row = 1;
        let place1 = 3;
        let place2 = 4;
        await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place1})`);
        await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place2})`);
        await clickElement(page,".acceptin-button");
        const actual = await getText(page,"h2");
        const expected = "Вы выбрали билеты:";
        expect(actual).toContain(expected);
      }, 30000);

      test("Zero tickets", async () => {
        let row = 5;
        let place1 = 5;
        await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place1})`);
        await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place1})`);
        await clickElement(page,".acceptin-button");
        const actual = await page.$eval(".acceptin-button", (button) =>
      button.hasAttribute("disabled")
    );
    expect(actual).toBe(true);
      }, 30000);
    });