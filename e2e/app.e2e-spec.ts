import { ImageSearchPage } from './app.po';

describe('image-search App', () => {
  let page: ImageSearchPage;

  beforeEach(() => {
    page = new ImageSearchPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
