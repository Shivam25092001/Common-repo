import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-alpha' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Alpha = NativeModules.Alpha  ? NativeModules.Alpha  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  console.log('multiply called with:', a, b);
  return Alpha.multiply(a, b);
}
