
import { IconContext } from './IconFlyweight';

let iconContextInstance: IconContext | null = null;

export const getIconContext = (): IconContext => {
  if (!iconContextInstance) {
    iconContextInstance = new IconContext();
  }
  return iconContextInstance;
};
