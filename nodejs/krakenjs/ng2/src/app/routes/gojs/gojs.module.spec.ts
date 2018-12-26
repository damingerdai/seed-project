import { GojsModule } from './gojs.module';

describe('GojsModule', () => {
  let gojsModule: GojsModule;

  beforeEach(() => {
    gojsModule = new GojsModule();
  });

  it('should create an instance', () => {
    expect(gojsModule).toBeTruthy();
  });
});
