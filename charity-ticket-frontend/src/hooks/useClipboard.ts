import { useCallback } from 'react';
import { toast } from 'sonner';

export function useClipboard() {
  const copy = useCallback(async (text: string, label: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard`);
        return true;
      }
    } catch {
      // Fall through to execCommand fallback
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      toast.success(`${label} copied to clipboard`);
      return true;
    } catch {
      toast.info(`Copied: ${text}`);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }, []);

  return { copy };
}
