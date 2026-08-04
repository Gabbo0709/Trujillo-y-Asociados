export interface NavItem {
  href: string;
  label: string;
}

/**
 * Rutas globales puras del sistema para redirecciones y botones de acción.
 */
export const ROUTES = {
  HOME: '/',
  FIRM: '/nuestra-firma',
  WORKERS_ADVISORY: '/asesoria-trabajadores',
  CORPORATE_ADVISORY: '/asesoria-empresas',
  CONTACT: '/contacto',
  CONTACT_FORM: '/contacto#formulario-contacto',
} as const;

/**
 * Matriz centralizada de navegación principal compartida entre Header, Footer y cajones móviles.
 */
export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  { href: ROUTES.FIRM, label: 'Nuestra Firma' },
  { href: ROUTES.WORKERS_ADVISORY, label: 'Asesoría a Trabajadores' },
  { href: ROUTES.CORPORATE_ADVISORY, label: 'Asesoría a Empresas' },
  { href: ROUTES.CONTACT, label: 'Contacto' },
] as const;
