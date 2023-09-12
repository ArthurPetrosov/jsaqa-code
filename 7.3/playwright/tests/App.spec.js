const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password, negativPassword } = require("../user");

test("Successful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage("https://netology.ru/");
  await page.goto("https://netology.ru/");

  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");

  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();

  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page.locator("h2")).toHaveText("Моё обучение");
  browser.close();
}, 60000);

test("Failed authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage("https://netology.ru/");
  await page.goto("https://netology.ru/");

  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");

  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(negativPassword);
  await page.getByTestId("login-submit-btn").click();

  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");

  browser.close();
}, 60000);