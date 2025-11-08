import { HttpErrorResponse } from '@angular/common/http';

export function parseHttpError(err: unknown): string {
    if (err instanceof HttpErrorResponse && err.status === 0) {
        return 'No se pudo conectar con el servidor.';
    }

    if (err instanceof HttpErrorResponse) {
        if (typeof err.error === 'string' && err.error.trim()) {
            return err.error.trim();
        }

        if (err.error && typeof err.error === 'object') {
            const anyErr = err.error as any;

            if (anyErr.errors && typeof anyErr.errors === 'object') {
                const errors = anyErr.errors as Record<string, string[]>;

                // DNI inválido (int32)
                const dniMsgs = errors['$.DNI'];
                if (Array.isArray(dniMsgs)) {
                    const hit = dniMsgs.find(m =>
                        typeof m === 'string' &&
                        m.toLowerCase().includes('could not be converted to system.int32')
                    );
                    if (hit) return 'DNI inválido';
                }

                // Fecha de nacimiento inválida (DateTime)
                const fechaMsgs = errors['$.FechaDeNacimiento'];
                if (Array.isArray(fechaMsgs)) {
                    const hit = fechaMsgs.find(m =>
                        typeof m === 'string' &&
                        m.toLowerCase().includes('could not be converted to system.datetime')
                    );
                    if (hit) return 'Fecha de nacimiento inválida';
                }

                // Encontrar otro mensaje
                for (const rawKey of Object.keys(errors)) {
                    const msgs = errors[rawKey] ?? [];
                    const first = (msgs.find(m => m && m.trim()) || '').trim();
                    if (!first) continue;
                    return first;
                }
            }

            // Otros campos
            if (typeof anyErr.detail === 'string' && anyErr.detail.trim()) return anyErr.detail.trim();
            if (typeof anyErr.message === 'string' && anyErr.message.trim()) return anyErr.message.trim();
            if (typeof anyErr.title === 'string' && anyErr.title.trim()) return anyErr.title.trim();
        }

        // error HTTP
        if (typeof err.message === 'string' && err.message.trim()) return err.message.trim();
        return `Error HTTP ${err.status || ''}`.trim();
    }

    // ultimo recurso
    return 'Error inesperado. Verifique los datos e intente nuevamente.';
}
