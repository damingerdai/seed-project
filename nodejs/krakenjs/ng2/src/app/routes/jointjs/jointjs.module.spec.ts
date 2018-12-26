import { JointjsModule } from './jointjs.module';

describe('JointjsModule', () => {
  let jointjsModule: JointjsModule;

  beforeEach(() => {
    jointjsModule = new JointjsModule();
  });

  it('should create an instance', () => {
    expect(jointjsModule).toBeTruthy();
  });
});
