import type {ExtensionRendererApi} from '@lynx/plugins/extensions/types/api';

type ToastType = ExtensionRendererApi['toast'];
export let toastHolder: ToastType | undefined;

export const setToast = (t: ToastType) => (toastHolder = t);
