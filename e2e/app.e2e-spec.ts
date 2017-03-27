import { WebresumemaintPage } from './app.po';

describe('webresumemaint App', function() {
  let page: WebresumemaintPage;

  beforeEach(() => {
    page = new WebresumemaintPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
