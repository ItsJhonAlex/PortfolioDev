import { test, expect } from '@playwright/test';

const forbidden = [
  'Nombre del proyecto',
  'Sustituye este texto',
  'Project name',
  'Replace this text',
  'Descripción del proyecto',
];

test('ES and EN projects are the five real cases without dead links', async ({ page }) => {
  const cases = [
    {
      path: '/',
      sub: '/ 05 proyectos',
      titles: [
        'DigitalMenu',
        'GERP',
        'Tatiana',
        'tasks-api',
        'Staking y farming en Ethereum',
      ],
    },
    {
      path: '/en/',
      sub: '/ 05 projects',
      titles: [
        'DigitalMenu',
        'GERP',
        'Tatiana',
        'tasks-api',
        'Ethereum staking and farming',
      ],
    },
  ] as const;

  for (const item of cases) {
    await page.goto(item.path);
    const cards = page.locator('[data-project-index]');
    await expect(cards).toHaveCount(5);
    await expect(page.locator('.projects-sub')).toHaveText(item.sub);
    await expect(cards.locator('.project-title')).toHaveText([...item.titles]);

    const html = await page.content();
    for (const phrase of forbidden) {
      expect(html, phrase).not.toContain(phrase);
    }
    expect(html).not.toContain('href="#"');

    const expectations = [
      { live: null, repo: null, stack: true },
      { live: null, repo: null, stack: true },
      { live: null, repo: 'https://github.com/ItsJhonAlex/TatianaBot', stack: false },
      { live: null, repo: 'https://github.com/ItsJhonAlex/tasks-api', stack: true },
      { live: null, repo: null, stack: true },
    ];

    for (let i = 0; i < expectations.length; i++) {
      await cards.nth(i).click();
      const modal = page.locator('[data-modal]');
      await expect(modal).toBeVisible();
      await expect(modal.locator('[data-m-title]')).toHaveText(item.titles[i]);

      const live = modal.locator('[data-m-live]');
      const repo = modal.locator('[data-m-repo]');
      const expected = expectations[i];

      if (expected.live) {
        await expect(live).toBeVisible();
        await expect(live).toHaveAttribute('href', expected.live);
      } else {
        await expect(live).toBeHidden();
        await expect(live).not.toHaveAttribute('href', /.+/);
      }

      if (expected.repo) {
        await expect(repo).toBeVisible();
        await expect(repo).toHaveAttribute('href', expected.repo);
      } else {
        await expect(repo).toBeHidden();
        await expect(repo).not.toHaveAttribute('href', /.+/);
      }

      if (expected.stack) {
        await expect(modal.locator('[data-m-stack]')).toBeVisible();
      } else {
        await expect(modal.locator('[data-m-stack]')).toBeHidden();
      }

      await page.keyboard.press('Escape');
      await expect(modal).toBeHidden();
    }
  }
});
