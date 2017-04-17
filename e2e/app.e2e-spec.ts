import { KiiStorePage } from './app.po';

describe('kii-store App', () => {
  let page: KiiStorePage;

  beforeEach(() => {
    page = new KiiStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
