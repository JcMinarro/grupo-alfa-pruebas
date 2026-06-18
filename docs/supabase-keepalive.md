# Supabase keepalive

Este proyecto tiene un workflow de GitHub Actions para evitar que Supabase pause el proyecto gratuito por inactividad.

El workflow está en `.github/workflows/supabase-keepalive.yml` y ejecuta una consulta `SELECT` sencilla contra Supabase cada viernes y domingo a las `09:00 UTC`. También puede ejecutarse manualmente desde la pestaña Actions de GitHub.

## Por qué existe

Supabase puede pausar proyectos del plan gratuito cuando detecta inactividad. Para mantener el proyecto activo, el workflow hace una petición a la API REST de Supabase contra una tabla pública de bajo impacto.

## Configuración en GitHub

Configurar estos valores en GitHub, dentro de `Settings > Secrets and variables > Actions`.

Secrets:

- `SUPABASE_URL`: URL del proyecto de Supabase, por ejemplo `https://xxxxx.supabase.co`.
- `SUPABASE_PUBLISHABLE_KEY`: publishable key del proyecto de Supabase, con formato `sb_publishable_...`.

Repository variables:

- `SUPABASE_KEEPALIVE_TABLE`: nombre de la tabla que se consulta, por ejemplo `keepalive`.

## Tabla recomendada

La tabla usada por el workflow debe permitir `SELECT` con rol `anon`, que es el rol usado por la publishable key. Una opción mínima es crear una tabla dedicada para este fin:

```sql
create table public.keepalive (
  id bigint generated always as identity primary key,
  message text not null,
  created_at timestamptz not null default now()
);

insert into public.keepalive (message)
values ('Supabase keepalive ping');

alter table public.keepalive enable row level security;

create policy "Allow public read access for keepalive"
on public.keepalive
for select
to anon
using (true);
```

No guardar datos sensibles en esta tabla. Al permitir `SELECT` para `anon`, cualquier cliente con la clave pública puede leer su contenido.

## Por qué usar publishable key

Supabase mantiene keys legacy como `anon` y `service_role` que son JWTs y pueden incluir una fecha de expiración. Para este workflow se usa una publishable key nueva (`sb_publishable_...`) porque está pensada para clientes públicos, tiene los mismos permisos bajos que la `anon key` y evita depender de una legacy key JWT.

No usar una secret key (`sb_secret_...`) ni una `service_role key` para este keepalive salvo que sea estrictamente necesario. Esas keys son para backend, pueden saltarse Row Level Security y tendrían más privilegios de los necesarios para una simple consulta pública.

## Cómo cambiarlo a otra base de datos

Cuando se migre a una base de datos de producción o a otro proyecto de Supabase:

1. Crear una tabla equivalente en el nuevo proyecto, o elegir una tabla existente que pueda exponerse públicamente para lectura.
2. Confirmar que la tabla permite `SELECT` con rol `anon` mediante RLS y una policy adecuada.
3. Actualizar el secret `SUPABASE_URL` con la URL del nuevo proyecto.
4. Crear una publishable key en el nuevo proyecto de Supabase y actualizar el secret `SUPABASE_PUBLISHABLE_KEY`.
5. Actualizar la variable `SUPABASE_KEEPALIVE_TABLE` si cambia el nombre de la tabla.
6. Ejecutar manualmente el workflow `Supabase keepalive` desde GitHub Actions y comprobar que termina correctamente.

## Cómo desactivarlo

Si deja de ser necesario, borrar `.github/workflows/supabase-keepalive.yml` o eliminar el bloque `schedule` para conservar solo la ejecución manual.

También se puede borrar la tabla `keepalive` si no se usa para nada más.
