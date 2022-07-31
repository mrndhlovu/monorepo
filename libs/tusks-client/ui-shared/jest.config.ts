/* eslint-disable */
export default {
  displayName: 'tusks-client-ui-shared',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/tusks-client/ui-shared',
};
