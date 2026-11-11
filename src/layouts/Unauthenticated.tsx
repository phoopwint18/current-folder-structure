export function Unauthenticated() {
  return (
    <section className="p-6">
      <h1 className="mb-2 text-2xl font-medium">Not signed in</h1>
      <p className="text-muted-foreground">
        A valid session cookie is required to use this portal.
      </p>
    </section>
  )
}
