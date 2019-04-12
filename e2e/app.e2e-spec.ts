import { TaskmgrPage } from './app.po';
import { Statement } from '@angular/compiler';
import { createWriteStream } from 'fs';

function writeScreenShot(data, filename) {
  const stream = createWriteStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
}

describe('taskmgr App', () => {
  let page: TaskmgrPage;

  beforeEach(() => {
    page = new TaskmgrPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.fillInfo().then(result => writeScreenShot(result,'scoo1.jpg'));
    expect (page.getParagraphText()).toContain('企业协作平台');
  });
});
