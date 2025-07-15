import { BridgeFactory } from './BridgeFactory';
import { BrowserBridge } from '../types';

let instance: BrowserBridge | null = null;

export function getBridge(): BrowserBridge {
  if (!instance) {
    instance = BridgeFactory.createBridge();
  }
  return instance;
}
