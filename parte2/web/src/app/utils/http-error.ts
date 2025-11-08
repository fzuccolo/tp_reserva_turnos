import { HttpErrorResponse } from '@angular/common/http';

export function parseHttpError(err: unknown): string {
  if (err instanceof HttpErrorResponse) {

    if (typeof err.error === 'string' && err.error.trim()) {
      return err.error;
    }

    if (err.error && typeof err.error === 'object') {
      const anyErr = err.error as any;
      if (typeof anyErr.detail === 'string' && anyErr.detail.trim()) return anyErr.detail;
      if (typeof anyErr.message === 'string' && anyErr.message.trim()) return anyErr.message;
      if (typeof anyErr.title === 'string' && anyErr.title.trim()) return anyErr.title;
    }

    if (typeof err.message === 'string' && err.message.trim()) return err.message;
    return `Error HTTP ${err.status || ''}`.trim();
  }

  return 'Error inesperado. Verifique los datos e intente nuevamente.';
}
