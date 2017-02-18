import { TestBuildPage } from './app.po';

describe('test-build App', () => {
  let page: TestBuildPage;

  beforeEach(() => {
    page = new TestBuildPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
